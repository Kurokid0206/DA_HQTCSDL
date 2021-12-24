const ids=["add-product-container","add-branchs-container","create-contract-section","manager-product-section","manager-branchs-section","manager-order-section"]

function supp_show(id){
    
    ids.forEach(id=>{
        var div = document.querySelector("#"+id);
        div.style.display = "none";
    })
    var div = document.querySelector("#"+id);
        div.style.display = "block";
}
function show_form(id){
    var div = document.querySelector("#"+id);
    div.style.display = "block";
}
function render_branches_for_contract(branches){
    
    var tr=''
    branches.forEach(branch=>{
        tr=tr+`<tr><td scope="col" style="width: 100px;">
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

function get_branches_for_contract(){
    supp_show('create-contract-section');
    var xhtml = new XMLHttpRequest();
    xhtml.onload = function() {
        console.log(JSON.parse(this.responseText))
        document.querySelector("#create-contract-section tbody").innerHTML=
        render_branches_for_contract(JSON.parse(this.responseText))

    }

    xhtml.open("GET", "get-branches");
    //xhtml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhtml.send();
}