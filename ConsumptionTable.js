console.log("file accessed");

// function to create a table showing all the data on consumption stored in the server
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
    document.body.appendChild(document.createElement("br"));
}




// finds the total ammount spent for the entire table
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
    const text = document.createTextNode("Total Spending: " + totalSpending + "\n");
    label.appendChild(text);
    div.appendChild(label);
    document.body.appendChild(div);
    document.body.appendChild(document.createElement("br"));
}




// creates a table with the total usage of each individual item
function totalUsageTable(rowData) {
    let numRows = rowData.length; // number of rown in the big table

    let viewedItems = []; // empty array to hold a list of all the items we have already viewed (and therefore counted)

    // create the <table> element
    const table = document.createElement("table");
    const tableBody = document.createElement("tbody");

    // create the table header
    const topRow = document.createElement("tr");
    const header1 = document.createElement("th");
    const header1Text = document.createTextNode("Item Name");
    header1.appendChild(header1Text);
    topRow.appendChild(header1);
    const header2 = document.createElement("th");
    const header2Text = document.createTextNode("Total Quantity Used");
    header2.appendChild(header2Text);
    topRow.appendChild(header2);
    tableBody.appendChild(topRow);

    // loop through each row in the table
    for (i = 0; i < numRows; i++) {
        let currentItem = rowData[i]["Item Name"];

        // for loop to check whether the current item has already been counted
        let seen = false;
        for (j = 0; j < viewedItems.length; j++) {
            if (rowData[i]["Item Name"] == viewedItems[j]) {
                seen = true;
                break;
            }
            else {
                seen = false;
            }
        }

        // if seen is false this is a new item, we need to total all instances of it in the table
        if (!seen) {
            // create a new row with the current item name
            const row = document.createElement("tr");
            const nameDataItem = document.createElement("td");
            const nameData = document.createTextNode(currentItem);
            nameDataItem.appendChild(nameData);
            row.appendChild(nameDataItem);

            let totalConsumed = 0; // variable to hold the total ammount of the current item consumed

            // loop through every row and check if it is of the current item
            for (k = 0; k < numRows; k++) {
                if (rowData[k]["Item Name"] == currentItem) {
                    totalConsumed += Number(rowData[k]["Quantity Removed"]);
                }
            }

            // add the total quantity used to the new table
            const quantityDataItem = document.createElement("td");
            const quantityData = document.createTextNode(totalConsumed);
            quantityDataItem.appendChild(quantityData);
            row.appendChild(quantityDataItem);            

            // add the current item to the list of viewed items (we don't need to look at it again)
            viewedItems.push(currentItem);
            // add the newly created row to the table
            tableBody.appendChild(row);
        }
    }
    // add the completed table to the document
    table.appendChild(tableBody);
    document.body.appendChild(table);
    document.body.appendChild(document.createElement("br"));
}





// function which pulls the data from the server then calls the other functions to display it
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

            // create a table with the total usage of each item
            totalUsageTable(rows_of_consumption_table);

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