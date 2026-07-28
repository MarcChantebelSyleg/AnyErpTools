const formCsvBaswareFormatter = document.getElementById("formCsvBaswareFormatter");
const csvFile = document.getElementById("csvFile");
const csvStrings = document.getElementById("csvStrings");
const tableName = document.getElementById("tableName");
const headerDataAlreadyExist = document.getElementById("headerDataAlreadyExist");
const eraseIdColumn = document.getElementById("eraseIdColumn");
const generateSupportFile = document.getElementById("generateSupportFile");
const headerLines = document.getElementById("headerLines");

document.getElementById("importCsvFile").addEventListener("click", () => csvFile.click(), false);

csvFile.addEventListener("change", () => {
    readCsvFile(generateColumns, csvFile);
});

csvStrings.addEventListener("keyup", () => {
    if (csvStrings.value.length > 0) generateColumns(csvStrings.value)
});

formCsvBaswareFormatter.addEventListener("submit", (e) => {
    e.preventDefault();

    if (csvFile.files.length > 0) readCsvFile(formatInputCsv, csvFile);
    else if (csvStrings.value.length > 0) formatInputCsv(csvStrings.value);
    else toastr.error("Veuillez choisir un fichier CSV ou insérer son contenu dans l'emplacement approprié");
}, false);

for (const extractOption of document.getElementsByClassName("extractOption")) {
    extractOption.addEventListener("click", () => {
        if (csvFile.files.length > 0) readCsvFile(generateColumns, csvFile);
        else if (csvStrings.value.length > 0) generateColumns(csvStrings.value);
    }, false);
}