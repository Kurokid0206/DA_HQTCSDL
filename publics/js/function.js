

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
    

    return false;
}

function insert_customer(){
    var xhtml = new XMLHttpRequest();
    xhtml.onload = function() {

        // input.value="";
        // var data=JSON.parse(this.responseText)
        // console.log(data)

    }

    xhtml.open("POST", "insert-customer");
    xhtml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhtml.send();

    return false;
}

function insert_staff(){
    var xhtml = new XMLHttpRequest();
    xhtml.onload = function() {

        // input.value="";
        // var data=JSON.parse(this.responseText)
        // console.log(data)

    }

    xhtml.open("POST", "insert-staff");
    xhtml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhtml.send();

    return false;
}

function insert_driver(){
    var xhtml = new XMLHttpRequest();
    xhtml.onload = function() {

        // input.value="";
        // var data=JSON.parse(this.responseText)
        // console.log(data)

    }

    xhtml.open("POST", "insert-driver");
    xhtml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhtml.send();

    return false;
}

function insert_partner(){
    var xhtml = new XMLHttpRequest();
    xhtml.onload = function() {

        // input.value="";
        // var data=JSON.parse(this.responseText)
        // console.log(data)

    }

    xhtml.open("POST", "insert-partner");
    xhtml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhtml.send();

    return false;
}

function insert_branch(){
    var xhtml = new XMLHttpRequest();
    xhtml.onload = function() {

        // input.value="";
        // var data=JSON.parse(this.responseText)
        // console.log(data)

    }

    xhtml.open("POST", "insert-branch");
    xhtml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhtml.send();

    return false;
}