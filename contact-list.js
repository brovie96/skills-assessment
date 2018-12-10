var dataSelect;
var table;
var trOpen = false;
var openDiv = null;

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
    var nameTd = tr.querySelector(".name").cloneNode(true);
    var nameTr = document.createElement("TR");
    var nameTable = document.createElement("TABLE");
    var div = document.createElement("DIV");
    nameTr.append(nameTd);
    nameTr.style.backgroundColor = "#555555";
    nameTable.append(nameTr);
    var rect = tr.querySelector(".name").getBoundingClientRect();
    var rect2 = tr.closest("table").getBoundingClientRect();
    var left = (rect.left - rect2.left) + "px";
    var top = (rect.top - rect2.top) + "px";
    nameTable.style.width = (rect.right - rect.left) + "px";
    nameTable.style.height = (rect.bottom - rect.top) + "px";
    var dataTd = tr.querySelector(".name").cloneNode(true);
    var dataTr = document.createElement("TR");
    var dataTable = document.createElement("TABLE");
    dataTd.innerHTML = "<a href=\"mailto:" + tr.querySelector(".email").innerHTML + "\">" + tr.querySelector(".email").innerHTML + "</a><br><br>";
    dataTd.innerHTML += tr.querySelector(".phone").innerHTML + "<br><br>";
    dataTd.innerHTML += "6539 Wilton Ave.<br>Culver City, CA 90234";
    dataTr.append(dataTd);
    dataTr.style.backgroundColor = "#555555";
    dataTable.append(dataTr);
    rect = tr.querySelector(".data").getBoundingClientRect();
    dataTable.style.left = (rect.left - rect2.left) + "px";
    dataTable.style.width = (rect.right - rect.left) + "px";
    div.addEventListener("click", closeTr);
    div.setAttribute("id", "overlay-tables");
    div.append(nameTable);
    div.append(dataTable);
    div.style.left = left;
    div.style.top = top;
    var overlay = document.createElement("DIV");
    overlay.classList.add("overlay");
    document.getElementById("table-holder").appendChild(div);
    document.getElementById("table-holder").appendChild(overlay);
    rect = dataTable.getBoundingClientRect();
    rect2 = document.querySelector("#bottom-bar").getBoundingClientRect();
    if(rect.bottom > rect2.top) {
        console.log("in block");
        var dataTableHeight = rect.bottom - rect.top;
        var rect3 = nameTable.getBoundingClientRect()
        var nameTableHeight = rect3.bottom - rect3.top;
        var divTop = parseInt(div.style.top.substr(0, div.style.top.length - 2));
        div.style.top = (divTop - dataTableHeight + nameTableHeight) + "px";
        nameTable.style.top = dataTableHeight - nameTableHeight + "px";
    }
    openDiv = div;
    trOpen = true;
}

function closeTr() {
    var div = openDiv;
    openDiv = null;
    div.remove();
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
