const ids=["create-contract-section","manager-product-section","manager-branchs-section","manager-order-section"]

function supp_show(id){
    
    ids.forEach(id=>{
        var div = document.querySelector("#"+id);
        div.style.display = "none";
    })
    var div = document.querySelector("#"+id);
        div.style.display = "block";
}
