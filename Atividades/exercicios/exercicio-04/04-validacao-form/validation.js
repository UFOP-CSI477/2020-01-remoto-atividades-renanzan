const formElements = {
    fullname: {
        lastValue: document.getElementById("fullname").value,
        value: document.getElementById("fullname").value,
        el: document.getElementById("fullname"),
        alertEl: document.getElementById("alert-fullname")
    },
    document: {
        lastValue: document.getElementById("document").value,
        value: document.getElementById("document").value,
        el: document.getElementById("document"),
        alertEl: document.getElementById("alert-document")
    },
    password: {
        lastValue: document.getElementById("password").value,
        value: document.getElementById("password").value,
        el: document.getElementById("password"),
        alertEl: document.getElementById("alert-password")
    }
};

document.querySelectorAll("#data-form input:not([type='button'])").forEach(el => {
    const formEl = formElements[el.id];

    el.addEventListener("focus", () => {
        formEl.lastValue = formEl.value;
    });

    el.addEventListener("blur", () => {
        if(formEl.lastValue !== el.value) {
            destroyAlert(alertEl);

            formEl.lastValue = el.value;
            formEl.value = el.value;
        }
    });
});

document.querySelector("#data-form").addEventListener("keydown", (e) => {
    if(e.key === "Enter") {
        clearAlerts();
        
        handleRegister();
    }
});

// function validar(campo, alerta, label) {
    
//     let n = campo.value;

//     if ( n.length == 0 || isNaN ( parseInt(n) ) ) {
//         // Erro
//         // Exibir alerta:
//         document.getElementById(alerta).style.display = "block";

//         // Reporte o campo como inválido
//         campo.classList.add("is-invalid");

//         // Reportar o label como inválido/atenção:
//         document.getElementById(label).classList.add("text-danger");

//         // Finalizar
//         campo.value = "";
//         campo.focus();
//         return false;
//     }

//     // Tudo correto
//     document.getElementById(alerta).style.display = "none";
//     campo.classList.remove("is-invalid");
//     campo.classList.add("is-valid");

//     document.getElementById(label).classList.remove("text-danger");

//     document.getElementById(label).classList.add("text-success");

//     return true;
// }

function printAlert(alertEl, message) {
    alertEl.style.display = "block";
    alertEl.innerText = message;

    const inputId = alertEl.id.replace("alert-", "");
    const inputEl = document.getElementById(inputId);

    inputEl.classList.add("is-invalid");
}

function destroyAlert(alertEl) {
    alertEl.style.display = "none";
    alertEl.innerText = "";

    const inputId = alertEl.id.replace("alert-", "");
    const inputEl = document.getElementById(inputId);

    inputEl.classList.remove("is-invalid");
    inputEl.classList.remove("is-valid");
}

function setValid(inputEl) {
    inputEl.classList.add("is-valid");
}

function clearAlerts() {
    const alerts = document.querySelectorAll("*[id^=alert]");

    for(const el of alerts)
        destroyAlert(el);
}

function validateFullname(fullnameObj) {
    if(fullnameObj.value.length <= 0) {
        printAlert(fullnameObj.alertEl, "* Campo obrigatório");

        return false;
    }

    setValid(fullnameObj.el);
    return true;
}

function validateDocument(documentOjb) {
    const alertMessage = "Ooops! O documento inserido não é válido."
    
    var Soma;
    var Resto;
    Soma = 0;

  if(documentOjb.value == "00000000000") {
    printAlert(documentOjb.alertEl, alertMessage);

    return false;
  }

  for (i=1; i<=9; i++)
    Soma = Soma + parseInt(documentOjb.value.substring(i-1, i)) * (11 - i);
  Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    
    if (Resto != parseInt(documentOjb.value.substring(9, 10)) ) {
        printAlert(documentOjb.alertEl, alertMessage);

        return false;
    }

  Soma = 0;
    for (i = 1; i <= 10; i++) Soma = Soma + parseInt(documentOjb.value.substring(i-1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(documentOjb.value.substring(10, 11) ) ) {
        printAlert(documentOjb.alertEl, alertMessage);
        
        return false;
    }

    setValid(documentOjb.el);
    return true;
}

function validatePassword(passwordObj) {
    if(passwordObj.value.length <= 0) {

    }
}

function handleRegister() {
    let success = true;

    console.log("validateFullname");
    success = success && validateFullname(form.fullname);
    console.log("validateDocument");
    success = success && validateDocument(form.document);

    console.log("success", success);

    // if(validar(n1, "alerta1", "label1") && validar(n2, "alerta2","label2")) {
    //     let resultado = parseInt(n1.value) + parseInt(n2.value);
    //     document.dados.resultado.value = resultado;
    // }

}