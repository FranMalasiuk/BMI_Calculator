const data = [
    {
        min: 0,
        max: 18.4,
        classification: "Below 18.5",
        info: "Underweight",
        obesity: "0",
    },
    {
        min: 18.5,
        max: 24.9,
        classification: "Between 18.5 and 24.9",
        info: "Healthy",
        obesity: "0",
    },
    {
        min: 25,
        max: 29.9,
        classification: "Between 25 and 29.9",
        info: "Overweight",
        obesity: "I",
    },
    {
        min: 30,
        max: 39.9,
        classification: "Between 30 and 39.9",
        info: "Obesity",
        obesity: "II",
    },
    {
        min: 40,
        max: 99,
        classification: "Over 40",
        info: "Severe Obesity",
        obesity: "III",
    },
];

const imcTable = document.querySelector("#imc-table");

const heightInput = document.querySelector("#height");
const weightInput = document.querySelector("#weight");
const calcBtn = document.querySelector("#calc-btn");
const clearBtn = document.querySelector("#clear-btn");

const calcContainer = document.querySelector("#calc-container");
const resultContainer = document.querySelector("#result-container");

const imcNumber = document.querySelector("#imc-number span");
const imcInfo = document.querySelector("#imc-info span");

const backBtn = document.querySelector("#back-btn");

function createTable(data) {
    data.forEach((item) => {

        const div = document.createElement("div")
        div.classList.add("table-data")

        const classification = document.createElement("p")
        classification.innerText = item.classification;

        const info = document.createElement("p")
        info.innerText = item.info;

        const obesity = document.createElement("p")
        obesity.innerText = item.obesity;

        div.appendChild(classification);
        div.appendChild(info);
        div.appendChild(obesity);

        imcTable.appendChild(div);
    });
}

function cleanInputs() {
    heightInput.value = ""
    weightInput.value = ""
}

function validDigits(text) {
    return text.replace(/[^0-9.]/g, "");
}

function calcImc(weight, height) {
    const imc = (weight / (height * height)).toFixed(1);

    return imc;
}

function showOrHideResults() {
    calcContainer.classList.toggle("hide")
    resultContainer.classList.toggle("hide")
};

createTable(data);

[heightInput, weightInput].forEach((el) => {
    el.addEventListener("input", (e) => {
        const updatedValue = validDigits(e.target.value);

        e.target.value = updatedValue;
    });
});

calcBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const weight = +weightInput.value.replace(",", ".")
    const height = +heightInput.value.replace(",", ".")

    if(!weight || !height) return;

    const imc = calcImc(weight, height);

    let info;

    data.forEach((item) => {
        if (imc >= item.min && imc <= item.max) {
            info = item.info;
        }
    });

    console.log(info);
    
    if (!info) return;

    imcNumber.innerText = imc;
    imcInfo.innerText = info;

    switch (info) {
        case "Underweight":
            imcNumber.classList.add("low");
            imcInfo.classList.add("low");    
            break;       
        case "Healthy":
            imcNumber.classList.add("good");
            imcInfo.classList.add("good");    
            break;   
        case "Overweight":
            imcNumber.classList.add("low");
            imcInfo.classList.add("low");    
            break;   
        case "Obesity":
            imcNumber.classList.add("medium");
            imcInfo.classList.add("medium");    
            break;   
        case "Severe Obesity":
            imcNumber.classList.add("high");
            imcInfo.classList.add("high");   
            break;   
    };

    showOrHideResults();

});

clearBtn.addEventListener("click", (e) => {
    e.preventDefault();

    cleanInputs();
});

backBtn.addEventListener("click", () => {
    cleanInputs();
    showOrHideResults();

});
