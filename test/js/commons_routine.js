function readCsvFile(fnToCallAfter, csvFile) {
    fr = new FileReader();
    fr.readAsText(csvFile.files[0]);
    fr.onload = function() {
        fnToCallAfter(this.result);
    }
}
