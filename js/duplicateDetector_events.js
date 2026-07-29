const output = document.getElementById("XmlDuplicateOutput");

document.getElementById("XmlFile").addEventListener("change", (evt) => {
    processDuplicatesObjectsFile(evt.currentTarget, document.getElementById("duplicateXMLTargetFields"));
}, false);
