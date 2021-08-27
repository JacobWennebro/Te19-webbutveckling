const questions = [
    "Det absolut tråkigaste jag gjort i sommar var {question}",
    "Men jag har också gjort en rolig grej och det var {question}.",
    "Jag har badat {question} gånger och det kändes {question}.",
    "Det godaste jag åt i somras var {question}",
    "Jag skulle vilja jämföra smaken med {question}.",
    "En tv-serie som jag upptäckte i somras var {question}",
    "Den skulle jag vilja rekommendera till alla som {question}",
    "En person som jag träffade i somras var {question}",
    "Jag skulle vilja citera hen genom att säga {question}",
    "Vid ett tillfälle i somras åkte jag till {question}",
    "Där var det både {question} och {question}",
    "Jag skulle vilja sammanfatta min sommar med tre ord, {question}, {question} och {question}.",
    "En helt okej sommar men nog har jag allt längtat efter att jag ska få börja skolan igen och jag tror detta år på NTI kommer att bli {question}!"
]

const answers = [];

function completeQuestion(e) {
    if(e.key !== "Enter") return;

    const questionNumber = Number(e.target.parentElement.getAttribute("data-question"));
    const answer = Array.from(e.target.parentElement.children).map(c => c.innerText);

    if(!answer.includes("")) {
        answers.push(answer);
        renderQuestion(questionNumber+1);    
    }
    e.preventDefault(true);
}

function parseQuestion(str) {
    if(typeof str !== "string") return console.error("str must be a string!");
    return str.replace(/{question}/g, `<span onkeydown="completeQuestion(event)" class="input" contenteditable="true"></span>`);
}

function renderQuestion(num) {
    if(typeof num !== "number") return console.error("num must be a number!");

    const parent = document.getElementById("captionParent");
    const question = questions[num];

    if(question) {
        parent.innerHTML = `<h1 data-question="${num}" id="caption">${parseQuestion(question)}</h1>`;
        parent.children[0].children[0].focus();
    } else completeForm();

}

function completeForm() {
    let compilation = [];

    for(let i=0; i < questions.length; i++) {
        let question = questions[i];
        const answer = answers[i];

        console.log(answer);

        if(answer == undefined) {
            console.error("Cheater");
            continue;
        }

        for(const a of answer) {
            question = question.replace("{question}", a);
        }
        
        compilation.push(question.toUpperCase());
    }

    console.log(compilation);

    const parent = document.getElementById("captionParent");
    parent.innerHTML = "";

    const larv = document.createElement("img");
    larv.src = "larv.png";
    larv.id = "larv";
    document.body.appendChild(larv);

    const p = document.createElement("p");
    p.className = "container";

    for(const line of compilation) {
        const span = document.createElement("span");
        span.innerText = line + " ";
        span.classList.add("divider");
        p.appendChild(span);
    }

    parent.appendChild(p);

}

document.body.addEventListener("mousemove", e => {
    const larv = document.getElementById("larv");
    if(larv) {
        larv.style.top = e.pageY + "px";
        larv.style.left = e.pageX + "px";
    }
});

renderQuestion(0);