const UblInspectionFile = document.getElementById("xmlFileForUblInspection");

document.getElementById("ublCheckingToolMenu").addEventListener("click", (e) => {
    UblInspectionFile.click();
}, false);

UblInspectionFile.addEventListener("change", async (e) => {
    const res = await window.electronAPIUblInspector.launchUblInspector(e.currentTarget.files[0].path);
    console.log(res);
}, false);
