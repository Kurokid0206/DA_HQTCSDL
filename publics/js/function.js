

function signup(){

}
function insert_contract(){

}

function insert_product(){

}
function delete_product(){

}
function update_product(){

}
function view_order(){

    var xhtml = new XMLHttpRequest();
    xhtml.onload = function() {

        // input.value="";
        // var data=JSON.parse(this.responseText)
        // console.log(data)

    }

    xhtml.open("GET", "view-order");
    //xhtml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhtml.send();


    return false;
}
view_order();