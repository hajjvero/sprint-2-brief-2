// ===========================================
//                  Variables
// ===========================================

const steps = Array.from(document.getElementsByClassName("step"));
const cvForm = document.getElementById("cv-form");
const sections = Array.from(document.getElementsByClassName("form-step"));
const buttonPrevious = document.getElementById("button-previous");
const buttonNext = document.getElementById("button-next");
let currentSection = 0;

// ===========================================
//                  Progress bar functions
// ===========================================

const showStep = (order) => {
    steps.map((step, index) => {
        step.classList.remove("completed", "current", "upcoming");

        if (order === index) {
            step.classList.add("current");
        } else if (order > index) {
            step.classList.add("completed");
        } else
        {
            step.classList.add("upcoming");
        }
    });
}

// ===========================================
//                  Sections functions
// ===========================================

const showSection = (order) => {
    sections.map((section, index) => section.style.display = index === order ? "block" : "none");
}

// ===========================================
//                  Events functions
// ===========================================

/*
* logic of button next
* */
buttonNext.addEventListener("click", (e) => {
    // logic of display previous button
    buttonPrevious.classList.remove("hidden");

    e.target.classList.remove("hidden");
    showSection(++currentSection);
    showStep(currentSection);

    // logic of end section
    if (currentSection === sections.length -1) {
        e.target.classList.add("hidden");
    }
});

/*
* logic of button previous
* */
buttonPrevious.addEventListener("click", (e) => {
    // display next button
    if (currentSection !== sections.length - 1) {
        buttonNext.classList.remove("hidden");
    }

    e.target.classList.remove("hidden");
    showSection(--currentSection);
    showStep(currentSection);

    if (currentSection === 0) {
        e.target.classList.add("hidden");
    }
})

// ===========================================
//                  Initiale app
// ===========================================

showSection(currentSection);