
function validateForm() {
    
    let name    = document.forms["myFormLogin"]["name"].value;
    let psw     = document.forms["myFormLogin"]["psw"].value;
    emailInput  = document.getElementById("userEmail");
    emailInput.classList.remove("imputError");
    pswInput    = document.getElementById("pswInput");
    pswInput.classList.remove("imputError");
    eMensaje    = document.getElementById ("emailMensaje")
    eMensaje.style.display = "none"
    pswMensaje  = document.getElementById ("pswMensaje")
    pswMensaje.style.display = "none"

    if ((name == "") || (psw == "")) {
        if (name == "") {
            emailInput.classList.add("imputError");
            eMensaje.style.display = "block";
        }
        if (psw == "") {
            pswInput.classList.add("imputError");
            pswMensaje.style.display = "block";
        }
        return false;
    }else{
       validateLogin();
       return true;
    }
    
}

function validateLogin() {
    sessionStorage.setItem("logged", true);
    sessionStorage.setItem("email", document.getElementById("userEmail").value);
}
//sessionStorage.setItem("logged", false);
//sessionStorage.setItem("email", "");










