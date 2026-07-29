const historicFileOrganizations = document.getElementById("historicFileOrganizations");
const historicFileAllDatas = document.getElementById("historicFileAllDatas")
const CallHistoricFileAllDatas = document.getElementById("CallHistoricFileAllDatas");
const selectAll = document.getElementById("selectAll");

selectAll.addEventListener("click", (e) => {
    const allInputs = document.querySelectorAll(".organizationSelected input[type='checkbox']");

    for (const input of allInputs) {
        input.checked = true;
        input.parentNode.setAttribute("data-chosed", "1");
    }
}, false);

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
                const finalResult = generateNewXmlFileForEachCompany(result.json);
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
