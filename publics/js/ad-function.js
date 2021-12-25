const ids=["add-employee-section","manager-account-section"]

function ad_show(id){
    
    ids.forEach(id=>{
        var div = document.querySelector("#"+id);
        div.style.display = "none";
    })
    var div = document.querySelector("#"+id);
        div.style.display = "block";
}

function get_user(){
    ad_show('manager-account-section')
    var keyword=document.getElementById("username-for-seach-lock")
    var xhtml = new XMLHttpRequest();
    xhtml.onload = function() {

    let data = JSON.parse(this.responseText)
    document.querySelector("#manager-account-table tbody")
    .innerHTML=render_user(data)
        keyword.value=''
    }

    xhtml.open("POST", "find-user");
    xhtml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhtml.send("user="+keyword.value);
}



function render_user(users){
    tr=``
    users.forEach(user=>{
    tr=tr+
    `<tr><td scope="col">
    <h6 style="margin:5px 0 0 0;">${user.TaiKhoan}</h6></td>
    <td scope="col">
    <h6 style="margin:5px 0 0 0;">${user.NguoiDung}</h6></td>
    <td scope="col">
    <h6 style="margin:5px 0 0 0;">${user.VaiTro}</h6></td>
    <td scope="col">
    <h6 style="margin:5px 0 0 0;">${user.TrangThai}</h6></td>`
    if(user.TrangThai=='Disabled'){
        tr+=
        `<td scope="col" id="btn-${user.TaiKhoan}"><button class="btn-primary" onclick="Enable('${user.TaiKhoan}')">
        <h6 style="width:100px; margin:5px 0 0 0; color: aliceblue; ">Mở khóa</h6>
        </button></td></tr>`
    }
    else{
        tr+=
        `<td scope="col" id="btn-${user.TaiKhoan}"><button class="btn-danger" onclick="Disable('${user.TaiKhoan}')">
        <h6 style="width:100px; margin:5px 0 0 0; color: aliceblue; ">Khóa</h6>
        </button></td></tr>`
    }
    })
    return tr
}

function Enable(TK){
    var xhtml = new XMLHttpRequest();
    xhtml.onload = function() {

    let data = JSON.parse(this.responseText)
    document.querySelector(`#btn-${TK}`).innerHTML=
    `<td scope="col" id="btn-${TK}">
    <button class="btn-danger" onclick="Disable('${TK}')">
    <h6 style="width:100px; margin:5px 0 0 0; color: aliceblue; ">Khóa</h6>
    </button></td></tr>`
    }

    xhtml.open("POST", "manage-user");
    xhtml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhtml.send("TK="+TK);
}

function Disable(TK){
    var xhtml = new XMLHttpRequest();
    xhtml.onload = function() {

    let data = JSON.parse(this.responseText)
    document.querySelector(`#btn-${TK}`).innerHTML=
    `<td scope="col" id="btn-${TK}">
    <button class="btn-danger" onclick="Enable('${TK}')">
    <h6 style="width:100px; margin:5px 0 0 0; color: aliceblue; ">Mở khóa</h6>
    </button></td></tr>`
    }

    xhtml.open("POST", "manage-user");
    xhtml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhtml.send("TK="+TK);
}
function add_emp(){
    let name = document.querySelector(`#empName`)
    let username = document.querySelector(`#empUsername`)
    let pass = document.querySelector(`#empPassword`)

    var xhtml = new XMLHttpRequest();
    xhtml.onload = function() {
        name.value=''
        username.value=''
        pass.value=''
        get_user();
    }

    xhtml.open("POST", "add-emp");
    xhtml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhtml.send(`name=${name.value}&username=${username.value}&pass=${pass.value}`);
}