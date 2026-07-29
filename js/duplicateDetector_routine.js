function getFieldParsed() {
    return document.getElementById("duplicateXMLTargetFields").value.toLowerCase()
        .split(",")
        .map(f => f.trim())
        .filter(f => f.length > 0)
}

function generateHashLineForSpecificFieldsCSV(csvLine, fields, headers) {
    let fullString = "";

    for (const field of fields) {
        fullString += csvLine[headers.indexOf(field)];
    }

    return fullString;
}

function generateHashLineForSpecificFieldsXml(item, fields) {
    let fullString = "";

    for (const field of fields) {
        fullString += item.getElementsByTagName(field)[0];
    }

    return fullString;
}

function findCSVDuplicates(csvContent, fields, filename) {
    const allLines = csvContent.split("\n");
    let headers = allLines[0].toLowerCase().split(";");
    let otherLines = allLines.slice(1);

    let allHash = "";
    const duplicates = [];

    otherLines.forEach((line, index) => {
        const myHash = generateHashLineForSpecificFieldsCSV(line.split(";"), fields, headers);

        if (allHash.indexOf(myHash) == -1) allHash += myHash;
        else duplicates.push(index);
    });

    return duplicates;
}

function findXmlDuplicates(xmlContent, fields) {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlContent, "text/xml");

    if (xmlDoc.querySelector("parsererror")) {
        throw new Error("XML invalide");
    }

    const items = Array.from(xmlDoc.getElementsByTagName(
        document.getElementById("duplicateXmlBaseObject").value
    ));

    const allHash = [];
    const duplicates = [];

    items.forEach((item, index) => {
        const myHash = generateHashLineForSpecificFieldsXml(item, fields);

        if (allHash.indexOf(myHash) == -1) allHash.push(myHash);
        else duplicates.push(index);
    });

    return duplicates;
}

function displayDuplicates(duplicates) {
    let duplicatesStr = "";
    
    for (const duplicate of duplicates) {
        duplicatesStr += "<p>Ligne ou objet dupliqué ayant comme position la " + duplicate + "</p><br />"
    }

    return duplicatesStr;
}

function readFilesToSearchDuplicate(index, files, fields) {
    const file = files[index];
    const reader = new FileReader();

    reader.onload = function(e) {
        try {
            const duplicates = file.name.endsWith(".xml") ?
                findXmlDuplicates(e.target.result, fields) :
                findCSVDuplicates(e.target.result, fields, file.name);
            output.innerHTML = "<p>Fichier " + file.name  + "</p>"
            if (duplicates.length === 0) {
                output.innerHTML += "<p>✅ Aucun doublon trouvé.</p>";
            } else {
                output.innerHTML += "<p>⚠️ Doublons détectés :</p><br /><br />" +
                displayDuplicates(duplicates);
            }

            if (index < files.length - 1) readFilesToSearchDuplicate(++index, files);
            else document.getElementById("XmlFileForm").reset();
        } catch (err) {
            output.textContent = "Erreur : " + err.message;
        }
    };

    reader.readAsText(files[index]);
}

function processDuplicatesObjectsFile(fileInput, fieldsInput) {
    output.innerHTML = "";

    const files = fileInput.files;
    if (files.length == 0) {
        output.textContent = "Veuillez sélectionner un fichier XML.";
        return;
    }
    
    readFilesToSearchDuplicate(0, files, getFieldParsed());
}