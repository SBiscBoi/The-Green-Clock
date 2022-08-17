//WARNING: Columns are rows and Rows are columns.  Why? no idea.  Will fix later but must complete first before refactoring.
//width and height of grid
var width = 10;
var height = 8;

var row = 0;
var column = 0;

var complete = false;

var setBlocks = []; //impliment data read from a file

const startDate = new Date("Augest 13 2022");
//console.log(startDate);

window.onload = function(){
    intialize();
}

//is this neccesarry? probably not.
//can anyone stop me? no.
function intialize(){
    //create grid
    for (let c = 0; c < height; c++){
        for (let r = 0; r < width; r++){
            // <span id="0-0" class="clock-grid"></span>
            let block = document.createElement("span");
            block.id = c.toString() + "-" + r.toString();
            block.classList.add("block");
            document.getElementById("clock-grid").appendChild(block);
        }
    }
    //kill off blocks that shouldn't be there
    killExcess();
    //get current time and store difference
    let currDate = new Date();
    //calculate difference by mod 7 to determine how many blocks to fill
    amountToFill = calcFills(startDate, currDate);
    //read file to load squares already filled
    //fill new squares
    fill(amountToFill);
    //check if all squares are filled
}

function killExcess(){
    let killList = ["0-0", "0-1", "0-4", "0-5", "0-8", "0-9", "1-0", "1-9", "4-0", "4-9", "5-0", "5-1", "5-8", "5-9", "6-0", "6-1", "6-2", "6-7", "6-8", "6-9", "7-0", "7-1", "7-2", "7-3", "7-6", "7-7", "7-8", "7-9"];
    for (let c = 0; c < height; c++){
        for (let r = 0; r < width; r++){
            // <span id="0-0" class="clock-grid"></span>
            let currBlock = document.getElementById(c.toString() + "-" + r.toString());
            if(killList.includes(currBlock.id)){
                currBlock.classList.add("inv-block");
            }
        }
    }
}

function calcFills(sDate, nDate){
    //find total amount of days past start date
    let diff = nDate.getTime() - sDate.getTime();
    var days = Math.ceil(diff / (1000 * 3600 * 24));
    //mod 7 to get amount of blocks to fill
    var fillAmu = 0;
    if (days >= 7){
        fillAmu = Math.floor(days / 7);
    }
    return fillAmu;
}

function fill(fillAmount){
    for(let i = 0; i < fillAmount; i++){
        let blockToFill = document.getElementById(genCoords());
        blockToFill.classList.add("filled-block");
    }
}

function genCoords(){
    let col = Math.floor(Math.random() * (9 - 0 + 1)) + 0;
    let row = Math.floor(Math.random() * (7 - 0 + 1)) + 0;
    let block = (row.toString() + "-" + col.toString()).toString();
    let badBlocks = ["0-0", "0-1", "0-4", "0-5", "0-8", "0-9", "1-0", "1-9", "4-0", "4-9", "5-0", "5-1", "5-8", "5-9", "6-0", "6-1", "6-2", "6-7", "6-8", "6-9", "7-0", "7-1", "7-2", "7-3", "7-6", "7-7", "7-8", "7-9"];
    while (badBlocks.includes(block) || setBlocks.includes(block)){
        col = Math.floor(Math.random() * (9 - 0 + 1)) + 0;
        row = Math.floor(Math.random() * (7 - 0 + 1)) + 0;
        block = (row.toString() + "-" + col.toString()).toString();
    }
    setBlocks.push(block);
    return block;
}
