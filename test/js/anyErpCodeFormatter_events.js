const anyErpLine = document.getElementById("anyErpLine");
const resultField = document.getElementById("result");
const pasteField = document.getElementById("paste");
const resultContainer = document.getElementById("resultContainer");

anyErpLine.addEventListener("keyup", (evt) => {
    if (evt.target.value.length > 0) {
        const res = formatBaseware(evt.target.value);

        if (res != "<pre></pre>") {
            resultField.innerHTML = res;
            pasteField.style.display = "block";
        } else {
            resultField.innerHTML = "<p id='formatError'>Format de la chaine incorrecte</p>";
            pasteField.style.display = "none";
        }

        resultContainer.style.display = "block";
    } else resultContainer.style.display = "none";
}, false);

pasteField.addEventListener("click", () => {
    const res = resultField.innerText.
        replace(/\s+/g, "").
        replace(/[&]/, "&amp;").
        replace(/[<]/g, "&lt;").
        replace(/[>]/g, "&gt;");

    navigator.clipboard.writeText(res).then(() => {
        toastr.info("Copie réalisée avec succès");
    }).catch(() => {
        toastr.error("Copie impossible");
    });

    anyErpLine.value = res;
}, false);

document.getElementById("anyErpCodeFormatterForm").addEventListener("submit", (evt) => {
    evt.preventDefault();
}, false);
