const ids=["new-order-section","view-order-section"]

function show(id){
    
    ids.forEach(id=>{
        var div = document.querySelector("#"+id);
        div.style.display = "none";
    })
    var div = document.querySelector("#"+id);
        div.style.display = "block";
}

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

        render_view_order(JSON.parse(this.responseText))

    }

    xhtml.open("GET", "cus-view-order");
    //xhtml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhtml.send();

    return false;
}

function customer_view_order_detail(){
    var xhtml = new XMLHttpRequest();
    xhtml.onload = function() {

        // input.value="";
        // var data=JSON.parse(this.responseText)
        // console.log(data)

    }

    xhtml.open("GET", "cus-view-order-detail");
    //xhtml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhtml.send();

    return false;
}


function insert_order(){
    var xhtml = new XMLHttpRequest();
    xhtml.onload = function() {

       

    }

    xhtml.open("POST", "insert-order");
    xhtml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhtml.send();

    return false;
}

function insert_order_detail(){
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


function render_view_order(data){
    var bill = document.querySelector("#bill tbody")
    var tr=``
    data.forEach(element => {
        tr=tr+`<tr><td scope="col" style="width: 100px;">
        <h6 style="margin:5px 0 0 0;">${element.MaDH}</h6>
        </td>
        <td scope="col" style="width: 200px;">
        <h6 style="margin:5px 0 0 0;">${element.DiaChiGiaoHang}</h6>
        </td>
        <td scope="col" style="width: 100px;">
        <h6 style="margin:5px 0 0 0;">${element.TongTien}</h6>
        </td>
        <td scope="col" style="width: 100px;">
        <h6 style="margin:5px 0 0 0;">${element.TinhTrang}</h6>
        </td>
        <td>
        <button class="btn-danger" onclick="function(${element.MaDH})">
        <h6 style="margin:5px 0 0 0; color: aliceblue;">Hủy đơn</h6></button></td></tr>`
    });
    bill.innerHTML=tr
}
