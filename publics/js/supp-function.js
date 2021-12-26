var ids = ["add-product-container", "add-branchs-container", "create-contract-section", "manager-product-section", "manager-branchs-section", "manager-order-section"]

function supp_show(id) {

    ids.forEach(id => {
        var div = document.querySelector("#" + id);
        div.style.display = "none";
    })
    var div = document.querySelector("#" + id);
    div.style.display = "block";
}

function show_form(id) {
    var div = document.querySelector("#" + id);
    div.style.display = "block";
    show_oldproduct_form()
}

function render_branches_for_contract(branches) {

    var tr = ''
    branches.forEach(branch => {
        tr = tr + `<tr><td scope="col" style="width: 100px;">
            <h6 style="margin:5px 0 0 0;">${branch.TenCN}</h6>
        </td>
        <td scope="col" style="width: 200px;">
            <h6 style="margin:5px 0 0 0;">${branch.DiaChi}</h6>
        </td>
        <td scope="col" style="width: 100px;">
            <button class="btn-primary" onclick="hàm_thêm_xóa_chi_nhánh('mã chi nhánh');">
                <h6 style="margin:5px 0 0 0; color: aliceblue;" >Thêm</h6>
            </button>
        </td></tr>`
    })
    return tr
}

function render_branches_for_products(branches) {

    var tr = ''
    tr = tr + `<option selected>Chọn chi nhánh</option>`
    branches.forEach(branch => {
        tr = tr + `<option value="${branch.MaCN}">${branch.MaCN} - ${branch.TenCN}</option>`
    })
    return tr
}

function get_branches_for_contract() {
    supp_show('create-contract-section');
    var xhtml = new XMLHttpRequest();
    xhtml.onload = function() {

        document.querySelector("#create-contract-section tbody").innerHTML =
            render_branches_for_contract(JSON.parse(this.responseText))

    }

    xhtml.open("GET", "get-branches");
    //xhtml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhtml.send();
}

function get_branches_for_manager_pro() {
    supp_show('manager-product-section');
    var xhtml = new XMLHttpRequest();
    xhtml.onload = function() {

        document.querySelector("#select-branch-for-edit-product").innerHTML =
            render_branches_for_products(JSON.parse(this.responseText));
        get_products()

    }

    xhtml.open("GET", "get-branches");
    //xhtml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhtml.send();
}

function get_orders() {
    supp_show('manager-order-section')
    var xhtml = new XMLHttpRequest();
    xhtml.onload = function() {
        let data = JSON.parse(this.responseText)
        document.querySelector("#manager-order-section tbody").innerHTML = render_orders(data)
    }

    xhtml.open("GET", "supp-get-orders");
    //xhtml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhtml.send();
}

function render_orders(orders) {
    if (orders.length < 1) {
        return 'No Result'
    }
    tr = ``
    orders.forEach(order => {
        tr += `
        <tr><td scope="col"><h6 style="margin:5px 0 0 0;">${order.MaDH}</h6></td>
        <td scope="col"><h6 style="margin:5px 0 0 0;">${order.DiaChiGiaoHang}</h6></td>
        <td scope="col"><h6 style="margin:5px 0 0 0;">${order.TongTien}</h6></td>
        <td scope="col"><h6 style="margin:5px 0 0 0;">${order.TinhTrang}</h6></td></tr>`
    })
    return tr
}

function get_products() {
    var macn = document.getElementById('select-branch-for-edit-product').value
    var xhtml = new XMLHttpRequest();
    xhtml.onload = function() {
        let data = JSON.parse(this.responseText)
        document.querySelector("#product-of-branch-table tbody").innerHTML = render_products(data)
    }

    xhtml.open("POST", "supp-get-products");
    xhtml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhtml.send(`MaCN=${macn}`);
}

function get_products_for_add_old() {
    var xhtml = new XMLHttpRequest();
    xhtml.onload = function() {
        let data = JSON.parse(this.responseText)
        document.querySelector("#select-add-old-product").innerHTML = render_products_for_add_old(data)
    }

    xhtml.open("GET", "supp-get-products");
    //xhtml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhtml.send();
}

function get_branches_for_add_old() {
    var xhtml = new XMLHttpRequest();
    xhtml.onload = function() {

        document.querySelector("#select-branch-for-add-old-product").innerHTML =
            render_branches_for_products(JSON.parse(this.responseText));

    }

    xhtml.open("GET", "get-branches");
    //xhtml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhtml.send();
}

function render_products_for_add_old(branches) {
    if (branches.length < 1) {
        return 'No Result'
    }
    var tr = ''
    tr = tr + `<option selected>Chọn sản phẩm</option>`
    branches.forEach(branch => {
        tr = tr + `<option value="${branch.MaSP}">${branch.TenSP} - ${(branch.GiaBan).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')} vnd</option>`
    })
    return tr
}

function render_products(orders) {
    if (orders.length < 1) {
        return 'No Result'
    }
    tr = ``
    orders.forEach(order => {
        tr += `
        <tr>
            <td scope="col">
            <h6 style="margin:5px 0 0 0;">${order.MaSP}</h6>
            </td>
            <td scope="col">
            <h6 style="margin:5px 0 0 0;">${order.TenSP}</h6>
            </td>
            <td scope="col">
            <h6 style="margin:5px 0 0 0;">${(order.GiaBan).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')} vnd</h6>
            </td>
            <td scope="col">
            <h6 style="margin:5px 0 0 0;">${order.SLTon}</h6>
            </td>
            <td scope="col" >

                <button type="button" class="btn-danger" onclick="delete_product('${order.MaSP}')">
                    <h6 style=" margin:5px 0 0 0; color: aliceblue; ">Xóa</h6>
                </button>
            </td>
        </tr>`
    })
    return tr
}

function delete_product(masp) {
    var macn = document.getElementById('select-branch-for-edit-product').value;

    var xhtml = new XMLHttpRequest();
    xhtml.onload = function() {
        get_products();
    }

    xhtml.open("POST", "supp-delete-products-frombranchs");
    xhtml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhtml.send(`MaCN=${macn}&MaSP=${masp}`);
}

function show_oldproduct_form() {
    document.getElementById('add-new-product-form').style.display = "none"
    document.getElementById('add-old-product-form').style.display = "block"
    get_products_for_add_old();
    get_branches_for_add_old();
}

function show_newproduct_form() {
    document.getElementById('add-new-product-form').style.display = "block"
    document.getElementById('add-old-product-form').style.display = "none"
}

function add_old_product_tobranch() {
    var form = document.getElementById('add-old-product-form');
    var MaSP = form[0].value;
    var MaCN = form[1].value;
    var SLTon = parseInt(form[2].value);
    var data = `MaSP=` + MaSP + `&MaCN=${MaCN}&SLTon=${SLTon}`;

    var xhtml = new XMLHttpRequest();
    xhtml.onload = function() {
        get_branches_for_manager_pro();
    }

    xhtml.open("POST", "/supp-add-old-product");
    xhtml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhtml.send(data);
    return false;
}