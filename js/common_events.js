const toolTooChoose = document.getElementsByClassName("toolTooChoose");

for (const htmlEl of toolTooChoose) {
    htmlEl.addEventListener("click", (e) => {
        for (subHtmlEl of toolTooChoose) {
            document.getElementById(subHtmlEl.getAttribute("data-panel")).classList.add("d-none");
        }

        document.getElementById(e.currentTarget.getAttribute("data-panel")).classList.remove("d-none");
    }, false);
}