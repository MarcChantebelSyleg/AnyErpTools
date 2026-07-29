const historicFileOrganizations = document.getElementById("historicFileOrganizations");
const historicFileAllDatas = document.getElementById("historicFileAllDatas")
const CallHistoricFileAllDatas = document.getElementById("CallHistoricFileAllDatas");
const selectAll = document.getElementById("selectAll");
const writeOptions = document.getElementsByClassName("writeOption");

selectAll.addEventListener("click", (e) => {
    const allInputs = document.querySelectorAll(".organizationSelected input[type='checkbox']");

    for (const input of allInputs) {
        input.checked = true;
        input.parentNode.setAttribute("data-chosed", "1");
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
            console.log(result);

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
    if (!window.electronAPIXMLHistoricImportExport) {
        toastr.error("Cette option n'est disponible que si l'application est reliée à une API electron");
        return;
    }

    try {
        const fileReader = new FileReader();
        fileReader.readAsText(e.currentTarget.files[0]);
        fileReader.onload = async (fr) => {
            const result = await window.electronAPIXMLHistoricImportExport.transformHistoric(fr.target.result, true);

            if (result.isOk) {
                const finalResult = generateGlobalHistoricFile(result.json);
                const xmlFinalResult =
                    await window.electronAPIXMLHistoricImportExport.transformHistoric(finalResult, false);

                window.electronAPISaveHistoricalFile.saveHistoricFile(xmlFinalResult);
            } else toastr.error("Impossible de parser correctement le fichier XML");

            document.getElementById("historicInput2").reset();
        };
    } catch(err) {
        toastr.error(err.message);
    }
}, false);
