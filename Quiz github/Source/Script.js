const korisnik = {
    ime: "",
    godina:"",
    poeni: 0
};

const prasanja = [
    {
        type: "choice",
        prasanje: "Кој јазик се користи за динамика на HTML страна?",
        opcii: ["HTML", "CSS", "JavaScript"],
        odg: 2
    },
    {
        type: "text",
        prasanje: "Како се вика тагот за најголем наслов во HTML?",
        odg: "h1"
    },
    {
        type: "choice",
        prasanje: "Колку битови има еден бајт?",
        opcii: ["4", "8", "16"],
        odg: 1
    },
    {
        type: "text",
        prasanje: "Кој таг се користи за вметнување слика во HTML?",
        odg: "img"
    },
    {
        type: "choice",
        prasanje: "Која компанија го има развиено JavaScript?",
        opcii: ["Microsoft", "Netscape", "Google"],
        odg: 1
    },
    {
        type: "choice",
        prasanje: "Кои од овие е програмски јазик?",
        opcii: ["HTTP", "FTP", "Python"],
        odg: 2
    },
    {
        type: "text",
        prasanje: "Како се вика променливата во JavaScript чија вредност не може да се промени?",
        odg: "const"
    },
    {
        type: "text",
        prasanje: "Кој HTML таг се користи за поврзување CSS фајл?",
        odg: "link"
    },
    {
        type: "choice",
        prasanje: "Кој уред е излезен уред?",
        opcii: ["Тастатура", "Микрофон", "Монитор"],
        odg: 2
    },
    {
        type: "text",
        prasanje: "Како се дефинира структура во C++?",
        odg: "struct"
    }
];

let momentalnoPrasanje = 0;

const prodolzi = document.getElementById("prodolzi");
const pocni = document.getElementById("pocni");
const sledno = document.getElementById("sledno");
const restart = document.getElementById("restart");

prodolzi.addEventListener("click", () => {
    document.getElementById("intro").classList.add("hidden");
    document.getElementById("start").classList.remove("hidden");
});
pocni.addEventListener("click", startQuiz);
sledno.addEventListener("click", slednoPrasanje);
restart.addEventListener("click", restartQuiz);

function startQuiz() {
    const ime = document.getElementById("username").value.trim();
    const godina = document.getElementById("god").value.trim();

    if (ime === "" || godina === "") {
        alert("Внеси податоци!");
        return;
    }

    korisnik.ime = ime;
    korisnik.godina = godina;
    korisnik.poeni = 0;
    momentalnoPrasanje = 0;

    document.getElementById("displayName").textContent = korisnik.ime;
    document.getElementById("start").classList.add("hidden");
    document.getElementById("quiz").classList.remove("hidden");

    vcitajPrasanje();
}

function vcitajPrasanje() {
    const p = prasanja[momentalnoPrasanje];
    const prasanjeDiv = document.getElementById("question");
    const odgovoriDiv = document.getElementById("answers");

    prasanjeDiv.textContent = p.prasanje;
    odgovoriDiv.innerHTML = "";

    if (p.type === "choice") {
        p.opcii.forEach((opt, index) => {
            const label = document.createElement("label");
            label.innerHTML = `
                <input type="radio" name="answer" value="${index}">
                ${opt}
            `;
            odgovoriDiv.appendChild(label);
        });
    } else {
        const input = document.createElement("input");
        input.type = "text";
        input.id = "textAnswer";
        input.placeholder = "Внеси одговор";
        odgovoriDiv.appendChild(input);
    }
}

function slednoPrasanje() {
    const p = prasanja[momentalnoPrasanje];
    let tocno = false;

    if (p.type === "choice") {
        const selected = document.querySelector('input[name="answer"]:checked');

        if (!selected) {
            alert("Одбери одговор!");
            return;
        }

        tocno = parseInt(selected.value) === p.odg;
    } else {
        const textInput = document.getElementById("textAnswer").value.trim().toLowerCase();

        if (textInput === "") {
            alert("Внеси одговор!");
            return;
        }

        tocno = textInput === p.odg.toLowerCase();
    }

    if (tocno) {
        korisnik.poeni++;
    }

    momentalnoPrasanje++;

    if (momentalnoPrasanje < prasanja.length) {
        vcitajPrasanje();
    } else {
        zavrsiKviz();
    }
}

function zavrsiKviz() {
    document.getElementById("quiz").classList.add("hidden");
    document.getElementById("result").classList.remove("hidden");

    document.getElementById("finalResult").textContent =
        `${korisnik.ime}, освои ${korisnik.poeni} од ${prasanja.length} поени.`;

    const formData = new FormData();
    formData.append("I", korisnik.ime);
    formData.append("G", korisnik.godina);
    formData.append("P", korisnik.poeni);

    fetch ("insert.php", {
        method:"POST",
        body:formData
        //headers: {'Content-Type':'application/x-www-form-urlencoded'},
        //body: `I=${encodeURIComponent(korisnik.ime)}&G=${encodeURIComponent(god)}&P=${encodeURIComponent(korisnik.poeni)}`
    })
    .then (res => res.text())
    .then (data => console.log(data))
    .catch (err => console.log(err))
}

function restartQuiz() {
    document.getElementById("result").classList.add("hidden");
    document.getElementById("start").classList.remove("hidden");
    document.getElementById("username").value = "";
    document.getElementById("god").value = "";
}

document.getElementById("startForm").addEventListener("submit", function(e) {
    e.preventDefault(); // Спречи класично submit

    const ime = document.getElementById("username").value.trim();
    const god = document.getElementById("god").value.trim();
    //const poraka = document.getElementById("poraka");

    if(!ime || !god) {
        poraka.textContent = "Сите полиња се задолжителни!";
        poraka.style.color = "red";
        return;
    }

});