const historicFileOrganizations = document.getElementById("historicFileOrganizations");
const historicFileAllDatas = document.getElementById("historicFileAllDatas")
const CallHistoricFileAllDatas = document.getElementById("CallHistoricFileAllDatas");
const selectAll = document.getElementById("selectAll");
const writeOptions = document.getElementsByClassName("writeOption");
const takesTagOrNot = document.getElementsByClassName("takeTagOrNot");
const progress = document.getElementById("progress");

selectAll.addEventListener("click", (e) => {
    const allInputs = document.querySelectorAll(".organizationSelected input[type='checkbox']");

    for (const input of allInputs) {
        if (!input.parentNode.classList.contains("d-none")) {
            input.checked = true;
            input.parentNode.setAttribute("data-chosed", "1");
        }
    }
}, false);

document.getElementById("unSelectAll").addEventListener("click", (e) => {
    const allInputs = document.querySelectorAll(".organizationSelected input[type='checkbox']");

    for (const input of allInputs) {
        if (!input.parentNode.classList.contains("d-none")) {
            input.checked = false;
            input.parentNode.setAttribute("data-chosed", "0");
        }
    }
}, false);

document.getElementById("extractOptionSearch").addEventListener("keyup", (e) => {
    const extractOptions = document.querySelectorAll("#extractOptions .extractOption");
    const valueTyped = e.currentTarget.value;

    for (const extractOption of extractOptions) {
        if (valueTyped == "" || extractOption.getAttribute("data-xml-name").toLowerCase().indexOf(valueTyped.toLowerCase()) != -1)
            extractOption.classList.remove("d-none");
        else
            extractOption.classList.add("d-none");
    }
}, false);

document.getElementById("searchOrganizations").addEventListener("keyup", (e) => {
    const allOrganizations = document.querySelectorAll(".organizationSelected");
    const valueTyped = e.currentTarget.value;

    for (const organization of allOrganizations) {
        if (valueTyped == "" || organization.getAttribute("data-name").toLowerCase().indexOf(valueTyped.toLowerCase()) != -1)
            organization.classList.remove("d-none");
        else
            organization.classList.add("d-none");
    }
}, false);

for (const writeOption of writeOptions) {
    writeOption.addEventListener("click", (e) => {
        const target = e.currentTarget;
        generateExtractOption(
            target.parentNode.getElementsByTagName("span")[0].innerText,
            target.parentNode.getElementsByTagName("div")[0]
        );
    }, false);
}

for (const takeTagOrNot of takesTagOrNot) {
    takeTagOrNot.addEventListener("click", (e) => {
        const target = e.currentTarget;

        if (target.getAttribute("data-take-tag") == "1") {
            target.setAttribute("data-take-tag", "0");
            target.setAttribute("title", "Cliquez ici pour traiter cette balise");
            target.src = "./img/takeTag.png";
        } else {
            target.setAttribute("data-take-tag", "1");
            target.setAttribute("title", "Cliquez ici pour ne pas traiter cette balise");
            target.src = "./img/notTakeTag.png";
        };

        target.parentNode.setAttribute("data-take-tag", target.getAttribute("data-take-tag"));
    }, false);
}

document.getElementById("CallHistoricFileOrganizations").addEventListener("click", (e) => {
    historicFileOrganizations.click();
}, false);

historicFileOrganizations.addEventListener("change", (e) => {
    if (!window.electronAPIXMLHistoricImportExport) {
        toastr.error("Cette option n'est disponible que si l'application est reliée à une API electron");
        return;
    }

    try {
        const fileReader = new FileReader();
        fileReader.readAsText(e.currentTarget.files[0]);
        fileReader.onload = async (fr) => {
            const result = await window.electronAPIXMLHistoricImportExport.transformHistoric(fr.target.result, true);

            if (result.isOk) displayAllOrganizations(result.json);
            else toastr.error("Impossible de parser correctement le fichier XML");

            document.getElementById("historicInput1").reset();
        };
    } catch(err) {
        toastr.error(err.message);
    }
}, false);

CallHistoricFileAllDatas.addEventListener("click", (e) => {
    historicFileAllDatas.click();
}, false);

historicFileAllDatas.addEventListener("change", (e) => {
    const entitysToChoose = document.querySelectorAll(`div.extractOption[data-xml-name="CMN_ENTITY_CONFIG"] .extractOptions`);

    if (!window.electronAPIXMLHistoricImportExport) {
        toastr.error("Cette option n'est disponible que si l'application est reliée à une API electron");
    } else if (entitysToChoose.length == 0) {
        toastr.error("Choisissez au moins une entité à extraire (facture / demande d'achat)");
    } else {
        try {
            const fileReader = new FileReader();
            fileReader.readAsText(e.currentTarget.files[0]);
            fileReader.onload = async (fr) => {
                progress.classList.remove("d-none");
                const result = await window.electronAPIXMLHistoricImportExport.transformHistoric(fr.target.result, true);

                if (result.isOk) {
                    const finalResult = generateFilteredHistoricFile(result.json);
                    const xmlFinalResult =
                        await window.electronAPIXMLHistoricImportExport.transformHistoric(finalResult, false);

                    window.electronAPISaveHistoricalFile.saveHistoricFile(xmlFinalResult);
                } else toastr.error("Impossible de parser correctement le fichier XML");

                document.getElementById("historicInput2").reset();
            };
        } catch(err) {
            toastr.error(err.message);
        }
    }

    document.getElementById("historicInput1").reset();
    document.getElementById("historicInput2").reset();
}, false);
