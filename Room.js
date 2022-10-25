import Searchable from "./Searchable.js";

class Room extends Searchable{
    // class constructor takes the name of the room and creates an empty array to hold items
    constructor(name) {
        super(name);
        this.itemList = [];
    }

    // method to add items to the itemList array
    addItem(item) {
        // need if statement to check that item is of type Item
        this.itemList.push(item);
        this.itemList.sort;
    }

    // returns the array if items
    getAllItems() {
        return this.itemList;
    }

    // returns an array of all items with a particular name
    getItemByName(name) {
        let returnArray = [];
        for (let current in this.itemList) {
            if (current.name = name) {
                returnArray.push(current);
            }
        }
        return returnArray;
    }

    // gets all items whos quantity is below a threshold
    getLowItems() {
        let returnArray = [];
        for (let current in this.itemList) {
            if (current.getQuantity < current.getMin) {
                returnArray.push(current);
            }
        }
        return returnArray;
    }

    // gets all items whos quantity is zero
    getZeroItems() {
        let returnArray = [];
        for (let current in this.itemList) {
            if (current.getQuantity == 0) {
                returnArray.push(current);
            }
        }
        return returnArray;
    }

    getName() {
        return this.name;
    }

    
}
