function show_customer_form() {
    document.getElementById("customer-form").style.display = "block";
    document.getElementById("partner-form").style.display = "none";
    document.getElementById("driver-form").style.display = "none";
}

show_customer_form();

function show_partner_form() {
    document.getElementById("customer-form").style.display = "none";
    document.getElementById("partner-form").style.display = "block";
    document.getElementById("driver-form").style.display = "none";
}

function show_driver_form() {
    document.getElementById("customer-form").style.display = "none";
    document.getElementById("partner-form").style.display = "none";
    document.getElementById("driver-form").style.display = "block";
}