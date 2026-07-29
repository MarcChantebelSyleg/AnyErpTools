function formatLineToDetectBaswareCode(allLinesParam) {
    let newLine = [];
    let tempLine = "";
    let pause = false;

    for (const el of allLinesParam) {
        const el1 = el.toString();

        if (el1.startsWith('"\\{')) {
            tempLine = `\\${fEl1P(el1.substring(1))};`;
            pause = true;
        }
        else if (el1.endsWith('\\}"')) {
            tempLine += `${fEl1P(el1.substring(0, el1.length - 3))}\\\\}`;
            newLine.push(tempLine);
            tempLine = "";
            pause = false;
        }
        else if (pause) tempLine += `${fEl1P(el1)};`
        else newLine.push(fEl1P(el1));
    }

    return newLine;
}

function generateColumns(csvContent) {
    let allLines = csvContent.split("\n");

    const firstLine = [...allLines[0].split(";")];
    const headerDatasExist = headerDataAlreadyExist.checked;
    const eraseIdColumnChecked = eraseIdColumn.checked;

    headerLines.innerHTML = "";

    for (let i = 0; i < firstLine.length; i++) {
        const div = document.createElement("div");
        const input = document.createElement("input");
        input.classList.add("headerData");
        input.setAttribute("data-index", i);
        input.setAttribute("placeholder", "Entrez ici le nom de la colonne");
        input.value = headerDatasExist ? firstLine[i].replace(/["]/g, "") : "";

        const input1 = document.createElement("input");
        input1.classList.add("headerDataDefaultValue");
        input1.setAttribute("data-index", i);
        input1.placeholder = "Valeur forcée (optionnel)";

        const deleteHeader = document.createElement("span");
        deleteHeader.textContent = "x";
        deleteHeader.classList.add("deleteHeader");
        deleteHeader.setAttribute("data-index", i);
        deleteHeader.title = "Cliquez ici pour desactiver l'insertion de ce champ dans chaque inert";

        deleteHeader.addEventListener("click", (evt) => {
            document.querySelector(`.headerData[data-index="${i}"]`).setAttribute("disabled", "");
        }, false);

        const leaveBlank = document.createElement("span");
        leaveBlank.textContent = "B";
        leaveBlank.classList.add("leaveBlankHeader");
        leaveBlank.setAttribute("data-index", i);
        leaveBlank.title = "Cliquez ici pour forcer une valeur vide";

        leaveBlank.addEventListener("click", (evt) => {
            document.querySelector(`.headerData[data-index="${i}"]`).setAttribute("blank", "");
        }, false);

        const buttonReplaceValues = document.createElement("button");
        buttonReplaceValues.classList.add("buttonReplaceValues");
        buttonReplaceValues.innerText = "Remplacer des valeurs";
        buttonReplaceValues.style = "margin-top: 10px";

        buttonReplaceValues.addEventListener("click", (e) => {
            displayReplaceValues(e.currentTarget.parentNode);
            e.preventDefault();
        }, false);

        const divReplaceValues = document.createElement("div");
        divReplaceValues.classList.add("ContainerReplaceSpecificValues");

        div.appendChild(input);
        div.appendChild(input1);
        div.appendChild(deleteHeader);
        div.appendChild(leaveBlank);
        div.appendChild(buttonReplaceValues);
        div.appendChild(divReplaceValues);
        headerLines.append(div);
    }
}

function displayReplaceValues(dom) {
    const divToAppend = dom.getElementsByClassName("ContainerReplaceSpecificValues")[0];

    const div = document.createElement("div");
    div.classList.add("replaceSpecificValues");

    const span = document.createElement("span");
    span.innerText = "x";
    span.classList.add("deleteValuesReplace");
    span.addEventListener("click", (evt) => {
        evt.currentTarget.parentNode.remove();
    }, false);

    const replaceValueLeft = document.createElement("input");
    replaceValueLeft.type = "text";
    replaceValueLeft.placeholder = "Chercher ...";
    replaceValueLeft.classList.add("replaceValuesLeft");

    const replaceValueRight = document.createElement("input");
    replaceValueRight.type = "text";
    replaceValueRight.placeholder = "Remplacer par ...";
    replaceValueRight.classList.add("replaceValuesLeft");

    div.appendChild(span);
    div.appendChild(replaceValueLeft);
    div.appendChild(replaceValueRight);
    divToAppend.appendChild(div);
}

function getLineValueValueReplaced(i, lineValue) {
    const allInputsLeft = document.querySelectorAll(`#headerLines + div:nth-child(0n + ${i}) .replaceValuesLeft`);
    const allInputsRight = document.querySelectorAll(`#headerLines + div:nth-child(0n + ${i}) .replaceValuesRight`);
    let lineValueModified = "";

    for (let a = 0; a < allInputsLeft.length; a++) {
        if (allInputsLeft[a].value == lineValue) lineValueModified = allInputsRight[a].value;
    }

    return lineValueModified;
}

function getColumnSubDetails(i, lineValue) {
    const subDetails = {
        disabled:
            document.querySelector(`.headerData[data-index="${i}"]`).
            getAttribute("disabled") != null,
        defaultValue:
            document.querySelector(`.headerDataDefaultValue[data-index="${i}"]`).
            value,
        leaveBlank: document.querySelector(`.headerData[data-index="${i}"]`).
            getAttribute("blank") != null
    };

    const lineValueValueReplaced = getLineValueValueReplaced(i, lineValue);
    if (lineValueValueReplaced != '') subDetails.defaultValue = lineValueValueReplaced;

    return subDetails;
}

function getLastPart(headerColumn, valueColumn, subDetails) {
    if (headerColumn == "ID" && eraseIdColumn.checked) return "to_char(DBMS_RANDOM.value(0, power(2, 128)-1), 'FM0xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'), ";

    const finalColumnValue = valueColumn.replace(/[']/g, "''").replace(/["]/g, "'");
    if (finalColumnValue.length > 0 && !subDetails.leaveBlank) {
        if (subDetails.defaultValue.length == 0) return `${finalColumnValue}, `;
        return `'${subDetails.defaultValue}', `;
    };

    return "'', ";
}

function generateCode(fullLine) {
    const deleteBeforeInsertIsChecked = document.getElementById("addDeleteBeforeInsert").checked;
    let codeGenerated = `<section name="${methodName.value}">`;

    if (deleteBeforeInsertIsChecked) {
        codeGenerated += `<method name="${methodName.value}DeleteBefore">
            <builtInMethodParameterList name="bw_db_functions" driver="provider">	
                <parameter name="connectionstring" log="False">{v,connstr}</parameter>
                <parameter name="dataProvider">{v,dataprovider}</parameter>
                <parameter name="assemblyName">{v,assemblyname}</parameter>
                <parameter name="prefix">{v,BoundVariableChar}</parameter>       
                <parameter name="command">	
                    <![CDATA[
                        DELETE FROM ${tableName.value}
                    ]]>
                </parameter>
            </builtInMethodParameterList>
        </method>`
    }

    codeGenerated += `<method name="${methodName.value}Method">
            <builtInMethodParameterList name="bw_db_functions" driver="provider">	
                <parameter name="connectionstring" log="False">{v,connstr}</parameter>
                <parameter name="dataProvider">{v,dataprovider}</parameter>
                <parameter name="assemblyName">{v,assemblyname}</parameter>
                <parameter name="prefix">{v,BoundVariableChar}</parameter>       
                <parameter name="command">	
                    <![CDATA[
                        INSERT ALL
                        ${fullLine}
                        SELECT 1 FROM DUAL	
                    ]]>
                </parameter>
            </builtInMethodParameterList>
        </method>
    </section>`;

    return codeGenerated;
}

function formatInputCsv(csvContent) {
    let allLines = csvContent.split("\n");
    const headerColumns = document.getElementsByClassName("headerData");
    const eraseIdColumnChecked = eraseIdColumn.checked;

    if (headerDataAlreadyExist) allLines = allLines.slice(1);

    for (let i = 0; i < allLines.length; i++)
        allLines[i] = formatLineToDetectBaswareCode(r1fl(allLines[i]).split(";"));    

    let fullLine = "";
    for (const lineData of allLines.splice(0, allLines.length - 1)) {
        let firstPart = lastPart = "";

        for (let i = 0; i < lineData.length; i++) {
            const subDetails = getColumnSubDetails(i, lineData[i]);

            if (!subDetails.disabled) {
                firstPart += `${headerColumns[i].value}, `;
                lastPart += getLastPart(headerColumns[i].value, lineData[i], subDetails);
            }
        }

        firstPart = firstPart.substring(0, firstPart.length - 2);
        lastPart = lastPart.substring(0, lastPart.length - 2);

        fullLine += `INTO ${tableName.value}(${firstPart}) VALUES(${lastPart})\n`;
    }

    const codeGenerated = generateCode(fullLine);
    if (!generateSupportFile.checked) {
        navigator.clipboard.writeText(codeGenerated);

        $("#codeGeneratedModal").modal("show");
        document.getElementById("codeGenerated").innerText = codeGenerated;

        toastr.info(`Méthode AnyERP "${methodName.value}" écrite dans le presse-papier. Une modale est ouverte si pour modifier ce qui à été généré en cas de besoin.`);
    } else
        saveGeneratedSupportFile(`<?xml version="1.0" encoding="UTF-8"?>
<!--Version 2.4 of the Customer Resolver Configuration File  -->
<erpConnector>
    <sections>
        ${codeGenerated}
    </sections>
</erpConnector>
`, "InvoicePro_Customer_Support.xml");

    //Flush all form datas
    formCsvBaswareFormatter.reset();
    headerLines.innerHTML = "";
}

async function saveGeneratedSupportFile(content, defaultName) {
    if (!window.electronAPISupport) {
        toastr.error("La sauvegarde de fichier n'est disponible que dans l'application Electron");
        return;
    }

    try {
        const result = await window.electronAPISupport.saveSupportFile(content, defaultName);

        if (result.success) {
            toastr.success(`Fichier de support enregistré : ${result.filePath}`);
        } else if (!result.canceled) {
            toastr.error(`Échec de l'enregistrement : ${result.error}`);
        }
    } catch (err) {
        toastr.error(`Échec de l'enregistrement : ${err.message}`);
    }
}