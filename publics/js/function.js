
// function log_in(){
//     var login = document.querySelector("#login-form")
//     console.log(login.text)
//     var xhtml = new XMLHttpRequest();
//     xhtml.onload = function() {

//         // input.value="";
//         // var data=JSON.parse(this.responseText)
//         // console.log(data)
//         console.log("hi")
//     }

//     xhtml.open("POST", "log-in");
//     //xhtml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
//     xhtml.send();

//     return false;
// }
function sign_up(){

}

function insert_product(){

}
function delete_product(){

}
function update_product(){

}

function driver_view_order(){

    var xhtml = new XMLHttpRequest();
    xhtml.onload = function() {
        // input.value="";
        // var data=JSON.parse(this.responseText)
        // console.log(data)
    }

    xhtml.open("GET", "driver-view-order");
    //xhtml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhtml.send();

    return false;
}

function customer_view_order(){
    var xhtml = new XMLHttpRequest();
    xhtml.onload = function() {

        // input.value="";
        // var data=JSON.parse(this.responseText)
        // console.log(data)

    }

    xhtml.open("GET", "cus-view-order");
    //xhtml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhtml.send();

    return false;
}

function insert_order(){
    var xhtml = new XMLHttpRequest();
    xhtml.onload = function() {

        // input.value="";
        // var data=JSON.parse(this.responseText)
        // console.log(data)

    }

    xhtml.open("POST", "insert-order");
    xhtml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhtml.send();

    return false;
}
function insert_contract(){
    var xhtml = new XMLHttpRequest();
    xhtml.onload = function() {

        // input.value="";
        // var data=JSON.parse(this.responseText)
        // console.log(data)

    }

    xhtml.open("POST", "insert-contract");
    xhtml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhtml.send();

    return false;
}

