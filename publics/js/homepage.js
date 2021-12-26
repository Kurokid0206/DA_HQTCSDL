var ids = ["customer-form", "partner-form", "driver-form"]

function show(id) {

    ids.forEach(id => {
        var div = document.querySelector("#" + id);
        div.style.display = "none";
    })
    var div = document.querySelector("#" + id);
    div.style.display = "block";
}


function add_KH() {
    let form = document.querySelector("#customer-form")
    let name = form[0]
    let DiaChi1 = form[1]
    let DiaChi2 = form[2]
    let SDT = form[3]
    let email = form[4]
    let username = form[5]
    let password = form[6]
    var xhtml = new XMLHttpRequest();
    xhtml.onload = function() {

        window.location.replace("/");
    }
    xhtml.open("POST", "add-KH");
    xhtml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhtml.send(
        `name=${name.value}&addr=${DiaChi2.value}, ${DiaChi1.value}&phone=${SDT.value}&email=${email.value}&username=${username.value}&pass=${password.value}`
    );
}

function add_TX() {
    let form = document.querySelector("#driver-form")
    let name = form[0]
    let cmnd = form[1]
    let bsx = form[2]
    let SDT = form[3]
    let tknh = form[4]
    let DiaChi = form[5]
    let kvhd = form[6]
    let email = form[7]
    let username = form[8]
    let password = form[9]
    var xhtml = new XMLHttpRequest();
    xhtml.onload = function() {

        window.location.replace("/");
    }
    xhtml.open("POST", "add-TX");
    xhtml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhtml.send(
        `name=${name.value}&addr=${DiaChi.value}&phone=${SDT.value}&email=${email.value}&username=${username.value}&pass=${password.value}&bsx=${bsx.value}&cmnd=${cmnd.value}&kvhd=${kvhd.value}&tknh=${tknh.value}`
    );
}

function add_DT() {
    let form = document.querySelector("#partner-form")
    let name = form[0]
    let namedd = form[1]
    let tp = form[2]
    let quan = form[3]
    let sld = form[4]
    let lhvc = form[5]
    let addr = form[6]
    let phone = form[7]
    let email = form[8]
    let username = form[9]
    let password = form[10]
    var xhtml = new XMLHttpRequest();
    xhtml.onload = function() {

        window.location.replace("/");
    }
    xhtml.open("POST", "add-DT");
    xhtml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhtml.send(
        `lhvc=${lhvc.value}&sld=${sld.value}&quan=${quan.value}&tp=${tp.value}&namedd=${namedd.value}&name=${name.value}&addr=${addr.value}&phone=${phone.value}&email=${email.value}&username=${username.value}&pass=${password.value}`
    );
}