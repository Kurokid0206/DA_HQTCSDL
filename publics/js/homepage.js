var ids=["customer-form","partner-form","driver-form"]

function show(id){
    
    ids.forEach(id=>{
        var div = document.querySelector("#"+id);
        div.style.display = "none";
    })
    var div = document.querySelector("#"+id);
        div.style.display = "block";
}


function add_KH(){

    let form = document.querySelector("#customer-form")
    let name = form[0].value
    let DiaChi1 = form[1]
    let DiaChi2 = form[2]
    let SDT = form[3]
    let email= form[4]
    let username = form[5]
    let password = form[6]
    var xhtml = new XMLHttpRequest();
    xhtml.onload = function() {

    }
    xhtml.open("POST", "add-KH");
    xhtml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhtml.send(
        `name=${name.value}
        &addr=${DiaChi2.value}, ${DiaChi1.value}
        &phone=${SDT.value}
        &email=${email.value}
        &username=${username.value}
        &pass=${password.value}`
    );
}

