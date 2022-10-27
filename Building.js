import Searchable from "./Searchable.js";
import Room from "./Room.js";

class Building extends Searchable {
    // class constructor takes the name of the building
    constructor(name) {
        super(name);
        this.roomList = [];
    }

    // adds a room to the array of rooms
    addRoom(room) {
        this.roomList.push(room);
        this.roomList.sort;
    }

    getAllItems() {
        returnArray = [];
        // for loop loops through every room in the building
        for (let currentRoom in this.roomList) {
            itemArray = currentRoom.getAllItems();
            // nested for loop loops through every item in the current room and ads it to the return array
            for (let currentItem in itemArray) {
                returnArray.push(currentItem);
                // might want to combine multiples of the same item here
            }
        }
        return returnArray;
    }

    getItemByName(name) {
        let returnArray = [];
        // for loop loops through every room in the building
        for (let currentRoom in this.roomList) {
            itemArray = currentRoom.getItemByName(name);
            // for loop adds every item returned from the getItemByName on the current room to a single array
            for (let currentItem in itemArray) {
                returnArray.push(currentItem);
            }
        }
        return returnArray;
    }

    getZeroItems() {
        let returnArray = [];
        // for loop that loops through every room
        for (let currentRoom in this.roomList) {
            itemArray = currentRoom.getZeroItems();
            // for loop that adds all values in the returned array to the return array of this function
            for (let currentItem in itemArray) {
                returnArray.push(currentItem);
            }
        }
        return returnArray;
    }

    getName() {
        return this.name;
    }
}