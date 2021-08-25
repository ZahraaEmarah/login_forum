
const login_button = document.getElementById("login-submit")
const signup_button = document.getElementById("signup-submit")
const login_form = document.getElementById("form")
const create = document.getElementById("create_account")

signup_button.addEventListener("click", (e) =>{
    const username = form.username.value;
    const password = form.password.value;
    Validate();
})

create.addEventListener("click", (e) =>{
})

function Validate() {
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("ConfirmPassword").value;
    var message = document.getElementById("matching");
    if (password != confirmPassword) {
        message.innerHTML="Passwords do not match";
        return false;
    }
    return true;
}