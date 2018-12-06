var dataSelect;
var table;

function loaded() {
    dataSelect = document.getElementById("data-select");
    dataSelect.addEventListener("change", dataChange);
    table = document.getElementById("contacts-table");
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
