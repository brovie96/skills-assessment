var dataSelect;
var table;
var trOpen = false;
var openTr = null;

function loaded() {
    dataSelect = document.getElementById("data-select");
    dataSelect.addEventListener("change", dataChange);
    table = document.getElementById("contacts-table");
    for(var i = 0, row; row = table.rows[i]; i++) {
        row.addEventListener("click", clickRow);
    }
}

function dataChange(){
    var selection = dataSelect.options[dataSelect.selectedIndex].value;

    if(selection == "email"){
        for(var i = 0, row; row = table.rows[i]; i++) {
            var data = row.querySelector(".data");
            //console.log(data);
            data.querySelector(".email").style.display = "block";
            data.querySelector(".phone").style.display = "none";
        }
    } else {
        for(var i = 0, row; row = table.rows[i]; i++) {
            var data = row.querySelector(".data");
            //console.log(data);
            data.querySelector(".email").style.display = "none";
            data.querySelector(".phone").style.display = "block";
        }
    }
}

function open(tr) {
    var trClone = tr.cloneNode(true);
    openTr = trClone;
    trOpen = true;
    trClone.style.backgroundColor = "#555555";
    trClone.querySelector(".data").style.color = "white";
    var table = document.createElement("TABLE");
    table.addEventListener("click", closeTr);
    table.appendChild(trClone);
    table.style.position = "absolute";
    table.style.zIndex = 70;
    var rect = tr.getBoundingClientRect();
    var rect2 = tr.closest("table").getBoundingClientRect();
    table.style.left = (rect.left - rect2.left) + "px";
    table.style.top = (rect.top - rect2.top) + "px";
    table.style.width = (rect.right - rect.left) + "px";
    table.style.height = (rect.bottom - rect.top) + "px";
    table.setAttribute("id", "overlay-table");
    var div = document.createElement("DIV");
    div.classList.add("overlay");
    document.getElementById("table-holder").appendChild(table);
    document.getElementById("table-holder").appendChild(div);
}

function closeTr() {
    var tr = openTr;
    openTr = null;
    tr.closest("table").remove();
    document.querySelector(".overlay").remove();
    trOpen = false;
}

function clickRow(event) {
    var tr = event.currentTarget;
    if(trOpen)
        closeTr();
    else
        open(tr);
}
