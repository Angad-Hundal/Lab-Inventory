console.log("file accessed");

function createTable(row_data) {
    console.log("creating table");
    // create the <table> element
    const table = document.createElement("table");
    const tableBody = document.createElement("tbody");

    // create the table headers
    const topRow = document.createElement("tr");
    const headerContent = ["Item ID", "Item Name", "Room", "Quantity Removed", "Quantity Left", "Units", "Cost", "Date Removed", "User ID"]
    const numColumns = headerContent.length;
    for (i = 0; i < numColumns; i++) {
        const header = document.createElement("th");
        const headerText = document.createTextNode(headerContent[i]);
        header.appendChild(headerText);
        topRow.appendChild(header);
    }
    tableBody.appendChild(topRow);

    // get the number of rows from the server
    numRows = row_data.length;
    
    console.log("number of rows:" + numRows);
    // create rows
    for (let i = 0; i < numRows; i++) {
        const row = document.createElement("tr");

        // fill an individual row with data
        for (j = 0; j < numColumns; j++) {
            const dataItem = document.createElement("td");
            const contents = document.createTextNode(row_data[i][headerContent[j]]);
            dataItem.appendChild(contents);
            row.appendChild(dataItem);
        }
        console.log("row data:" + row_data[0][0]);
        tableBody.appendChild(row);
    } 

    // add table body to table
    table.appendChild(tableBody);
    // add table to document
    document.body.appendChild(table);
    table.setAttribute("style", "width:90%");
}




function getTotals(rowData) {

    let numRows = rowData.length; // the number of rown in the table

    let totalSpending = 0; // variable to track total spending in the entire table
    
    // for loop adds the total cost of what was removed in each entry of the table to totalSpending
    for (i = 0; i < numRows; i++) {
        let cost = rowData[i]["Quantity Removed"] * rowData[i]["Cost"]
        totalSpending += cost;
    }

    // add a label with the total spending to the html document
    const div = document.createElement("div");
    const label = document.createElement("label");
    const text = document.createTextNode("Total Spending: " + totalSpending);
    label.appendChild(text);
    div.appendChild(label);
    document.body.appendChild(div);
}




function getUsage() {

    console.log("Get usage working")
    let http = new XMLHttpRequest();
    let url = "/getusage"

    http.open('GET', url, true);
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    http.addEventListener('error', function (event) { alert ("something went wrong while getting"); });

    http.onreadystatechange = function() {
        if (http.readyState == 4 && http.status == 200) {
            let table = http.responseText;

            console.log("ready state changed");

            let object = JSON.parse(table);
            let rows_of_consumption_table = object["rows"];

            // print the total spending in the html document
            getTotals(rows_of_consumption_table);

            // create the table with the data pulled from the database
            createTable(rows_of_consumption_table);

            // create a button to return to the home page
            const homeButton = document.createElement("button");
            homeButton.innerHTML = "Home";
            homeButton.onclick = function() {
                parent.location = "all.html"
            }
            document.body.appendChild(homeButton);
        }
    }
    http.send();
}

getUsage();