const formRegister = document.querySelector('.form-register');

const validarFormulario = (event) => {
    event.preventDefault();

    const name = document.querySelector("#name");
    const mail = document.querySelector("#mail");
    const password = document.querySelector("#password");
    const repeatpw = document.querySelector("#repeatpw");
    const datepicker = document.querySelector("#datepicker");
    const country = document.querySelector("#country");
    const termsCheckbox = document.querySelector("#terms");
    let validation = true;

    if (name.value.trim() === "") {
        name.classList.add("error");
        document.querySelector("#error-name").textContent = "Debe completar el campo -nombre y apellido-";
        document.querySelector("#error-name").classList.add("validation-message");
        validation = false;
    }
    if (mail.value.trim() === "") {
        document.querySelector("#error-mail").textContent = 'Debe completar el campo -Email-';
        document.querySelector("#error-mail").classList.add("validation-message");
        mail.classList.add('error');
        validation = false;
    }
    if (password.value.trim() === "") {
        document.querySelector("#error-password").textContent = 'Debe completar el campo -contraseña-';
        document.querySelector("#error-password").classList.add("validation-message");
        password.classList.add('error');
        validation = false;
    } else if (password.value.length < 6 || password.value.length > 12) {
        document.querySelector("#error-password").textContent = "La contraseña debe contener entre 6 y 12 caracteres";
        document.querySelector("#error-password").classList.add("validation-message");
        password.classList.add("error");
        validation = false;
    }
    if (repeatpw.value.trim() === "") {
        document.querySelector("#error-repeatpw").textContent = "Debe completar el campo -repetir contraseña-";
        document.querySelector("#error-repeatpw").classList.add("validation-message");
        repeatpw.classList.add("error");
        validation = false;
    } else if (repeatpw.value.trim() !== password.value.trim()) {
        document.querySelector("#error-repeatpw").textContent = "Las contraseñas no coinciden";
        document.querySelector("#error-repeatpw").classList.add("validation-message");
        repeatpw.classList.add("error");
        validation = false;
    }
    if (datepicker.value.trim() === "") {
        document.querySelector("#error-datepicker").textContent = "Debe completar el campo -fecha de nacimiento-";
        document.querySelector("#error-datepicker").classList.add("validation-message");
        datepicker.classList.add("error");
        validation = false;
    }
    if (country.value.trim() === "") {
        document.querySelector("#error-country").textContent = "Debe completar el campo -país-";
        document.querySelector("#error-country").classList.add("validation-message");
        country.classList.add("error");
        validation = false;
    }
    if (!termsCheckbox.checked) {
        document.querySelector("#error-terms").textContent = "Debe aceptar los términos y condiciones";
        document.querySelector("#error-terms").classList.add("validation-message");
        validation = false;
    }

    if (validation) {
        formRegister.submit();
    } else {
        return false;
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const passwordInput = document.getElementById("password");
    const repeatPasswordInput = document.getElementById("repeatpw");
    const togglePassword = document.getElementById("togglePassword");
    const toggleRepeatPassword = document.getElementById("toggleRepeatPassword");

    const togglePasswordVisibility = (input, toggle) => {
        if (input.type === "password") {
            input.type = "text";
            toggle.innerHTML = '<i class="fa fa-eye-slash" aria-hidden="true"></i>';
        } else {
            input.type = "password";
            toggle.innerHTML = '<i class="fa fa-eye" aria-hidden="true"></i>';
        }
    };

    togglePassword.addEventListener("click", function () {
        togglePasswordVisibility(passwordInput, this);
    });

    toggleRepeatPassword.addEventListener("click", function () {
        togglePasswordVisibility(repeatPasswordInput, this);
    });
});

$(document).ready(function () {
    $("#datepicker").datepicker();
});

formRegister.addEventListener("submit", validarFormulario);