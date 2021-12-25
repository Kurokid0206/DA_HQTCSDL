var ids = ["confirm-contract-section", "view-contract-section"]


function emp_show(id) {
    ids.forEach(id => {
        var div = document.querySelector("#" + id);
        div.style.display = "none";
    })
    var div = document.querySelector("#" + id);
    div.style.display = "block";
}

function emp_view_notconfirm_contract() {
    let tbl = document.querySelector("#confirm-contract-table tbody")
    var xhtml = new XMLHttpRequest();
    xhtml.onload = function() {
        // input.value="";
        // var data=JSON.parse(this.responseText)
        // console.log(data)

        tbl.innerHTML = render_contract_for_confirm(JSON.parse(this.responseText))
    }

    xhtml.open("GET", "find-notconfirm-contract");
    //xhtml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhtml.send();

    return false;
}

function emp_view_contract() {
    let tbl = document.querySelector("#view-contract-table tbody")
    var xhtml = new XMLHttpRequest();
    xhtml.onload = function() {
        // input.value="";
        // var data=JSON.parse(this.responseText)
        // console.log(data)

        tbl.innerHTML = render_contract_for_view(JSON.parse(this.responseText))
    }

    xhtml.open("GET", "/view-contract");
    //xhtml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhtml.send();

    return false;
}

function render_contract_for_confirm(contracts) {

    var tr = ''
    contracts.forEach(contract => {
        tr = tr + `
    <tr>
        <td scope="col">
            <h6 style="margin:5px 0 0 0;">${contract.MaHD}</h6>
        </td>
        <td scope="col">
            <h6 style="margin:5px 0 0 0;">${contract.TenDT}</h6>
        </td>
        <td scope="col">
            <h6 style="margin:5px 0 0 0;">${contract.NguoiDaiDien}</h6>
        </td>
        <td scope="col">
            <h6 style="margin:5px 0 0 0;">${contract.SoChiNhanhDK}</h6>
        </td>
        <td scope="col">
            <input type="date" id="${contract.MaHD}" style="margin:0;" />
        </td>
        <td scope="col">
            <button type="button" class="btn-primary" onclick="confirm_contract('${contract.MaHD}')">
                <h6 style=" margin:5px 0 0 0; color: aliceblue; ">Duyệt</h6>
            </button>

        </td>
    </tr>
        `
    })
    return tr
}

function render_contract_for_view(contracts) {

    var tr = ''
    contracts.forEach(contract => {
        var date_plus = new Date(contract.ThoiHan);
        date_plus.setDate(date_plus.getDate() + 1);
        contract.ThoiHan = date_plus.toISOString().slice(0, 10);
        tr = tr + `
    <tr>
        <td scope="col">
            <h6 style="margin:5px 0 0 0;">${contract.MaHD}</h6>
        </td>
        <td scope="col">
            <h6 style="margin:5px 0 0 0;">${contract.TenDT}</h6>
        </td>
        <td scope="col">
            <h6 style="margin:5px 0 0 0;">${contract.NguoiDaiDien}</h6>
        </td>
        <td scope="col">
            <h6 style="margin:5px 0 0 0;">${contract.SoChiNhanhDK}</h6>
        </td>
        <td scope="col">
        <h6 style="margin:5px 0 0 0;">${contract.ThoiHan}</h6>
        </td>

    </tr>
        `
    })
    return tr
}

function confirm_contract(MaHD) {
    var thoihan = document.getElementById(MaHD).value
    if (thoihan == '') {
        document.getElementById('confirm-contract-help').innerHTML = ''
        document.getElementById('confirm-contract-help').innerHTML = 'vui lòng nhập thời hạn hợp đồng trước khi duyệt!'
        return false;
    }
    document.getElementById('confirm-contract-help').innerHTML = ''
    var xhtml = new XMLHttpRequest();
    xhtml.onload = function() {
        // input.value="";
        // var data=JSON.parse(this.responseText)
        console.log(this.responseText)

        //tbl.innerHTML = render_contract(JSON.parse(this.responseText))
        emp_view_notconfirm_contract()
    }

    xhtml.open("POST", "confirm-contract");
    xhtml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhtml.send(`MaHD=${MaHD}&ThoiHan=${thoihan}`);

    return false;
}