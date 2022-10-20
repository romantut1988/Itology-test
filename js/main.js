$('.menu__btn').on('click', function () {
    $(".menu__list").toggleClass("menu__list--active")
});

// $(".popup__open").click(function (e) {
//     e.preventDefault();
//     $(".popup-bg").fadeIn(600);
//     $("html").addClass("no-scroll");
// });

// $(".popup__close").click(function () {
//     $(".popup-bg").fadeOut(600);
//     $("html").removeClass("no-scroll");
// });

const form = document.forms["form"];
const formArr = Array.from(form);
const validFormArr = [];
const button = form.elements["button"];

formArr.forEach((el) => {
    if (el.hasAttribute("data-reg")) {
        el.setAttribute("is-valid", "0");
        validFormArr.push(el);
    }
});

form.addEventListener("input", inputHandler);
form.addEventListener("submit", formCheck);

function inputHandler({ target }) {
    if (target.hasAttribute("data-reg")) {
        inputCheck(target);
    }
}

function inputCheck(el) {
    const inputValue = el.value;
    const inputReg = el.getAttribute("data-reg");
    const reg = new RegExp(inputReg);
    if (reg.test(inputValue)) {
        el.setAttribute("is-valid", "1");
        el.style.border = "border: 1px solid #b99150";
    } else {
        el.setAttribute("is-valid", "0");
        el.style.border = "2px solid rgb(255, 0, 0)";
    }
}

function formCheck(e) {
    e.preventDefault();
    const allValid = [];
    validFormArr.forEach((el) => {
        allValid.push(el.getAttribute("is-valid"));
    });
    const isAllValid = allValid.reduce((acc, current) => {
        return acc && current;
    });

    if (!Boolean(Number(isAllValid))) {
        alert("Заполните поля правильно!")
        return;
    }
    formSubmit();
}

async function formSubmit() {
    alert("Данные отправляются...")
    const data = serializeForm(form);
    const response = sendData(data);
    if (response.ok) {
        let result = await response.json();
        alert(result.message);
        formReset();
    }
}

function serializeForm(formNode) {
    return new FormData(form);
}

async function sendData(data) {
    return await fetch("index.html", {
        method: "post",
        body: data,
    });
}

function formReset() {
    form.reset();
    validFormArr.forEach((el) => {
        el.setAttribute("is-valid", "0");
        el.style.border = "none";
    });
}


