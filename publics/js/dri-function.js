const ids=["driver-order-section","driver-confirm-section","driver-salary-section"]


function dri_show(id){
    
    ids.forEach(id=>{
        var div = document.querySelector("#"+id);
        div.style.display = "none";
    })
    var div = document.querySelector("#"+id);
        div.style.display = "block";
}
function driver_view_order(){
    let tbl = document.querySelector("#driver-order-table tbody")
    var xhtml = new XMLHttpRequest();
    xhtml.onload = function() {
        // input.value="";
        // var data=JSON.parse(this.responseText)
        // console.log(data)
        dri_show('driver-order-section')
        tbl.innerHTML=render_order(JSON.parse(this.responseText))
    }

    xhtml.open("GET", "driver-view-order");
    //xhtml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhtml.send();

    return false;
}

function dri_update_order(){

    var xhtml = new XMLHttpRequest();
    xhtml.onload = function() {

    }

    xhtml.open("POST", "dri-update-order-stat");
    xhtml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhtml.send();

    return false;
}

function render_order(orders){

    var tr=''
    orders.forEach(order=>{
        tr=tr+`
        <tr>
        <td scope="col" style="width: 100px;">
        <h6 style="margin:5px 0 0 0;">${order.MaDH}</h6>
        </td>
        <td scope="col" style="width: 300px;">
        <h6 style="margin:5px 0 0 0;">${order.HoTen}</h6>
        </td>
        <td scope="col" style="width: 100px;">
        <h6 style="margin:5px 0 0 0;">${order.TongTien}</h6>
        </td>
        <td scope="col" style="width: 300px;">
        <h6 style="margin:5px 0 0 0;">${order.DiaChiGiaoHang}</h6>
        </td>
        <td scope="col">
        <button class="btn-primary" onclick="do_sthing_like_oẳng(#id_order)" id="take-order-btn">
        <h6 style=" margin:5px 0 0 0; color: aliceblue; ">Nhận đơn</h6>
        </button>
        </td>
        </tr>
        `
    })
    return tr
}
function dri_recv_order(){
    var xhtml = new XMLHttpRequest();
    xhtml.onload = function() {

        // input.value="";
        // var data=JSON.parse(this.responseText)
        // console.log(data)

    }

    xhtml.open("POST", "dri-recv-order");
    xhtml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhtml.send();

    return false;
}