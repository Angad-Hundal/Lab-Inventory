window.onload = function createTable() {
    // create the <table> element
    const table = document.createElement("table");
    const tableBody = document.createElement("tbody");

    // create the table headers
    const topRow = document.createElement("tr");
    const headerContent = ["Item ID", "Item Name", "Room", "Quantity Removed", "Quantity Left", "Date Removed", "User"]
    for (i = 0; i < headerContent.length; i++) {
        const header = document.createElement("th");
        const headerText = document.createTextNode(headerContent[i]);
        header.appendChild(headerText);
        topRow.appendChild(header);
    }
    tableBody.appendChild(topRow);

    // get the number of rows from the server (for now assume 0)
    numRows = 0;
    
    // create rows
    for (let i = 0; i < numRows; i++) {
        const row = document.createElement("tr")
    } 

    // add table body to table
    table.appendChild(tableBody);
    // add table to document
    document.body.appendChild(table);
    table.setAttribute("style", "width:90%");
}