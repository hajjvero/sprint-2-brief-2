const btnModel1 = document.getElementById("btn-model-1");
const btnModel2 = document.getElementById("btn-model-2");

export function initModelCvLogic() {
    // Model 1
    btnModel1.addEventListener("click", () => {
        console.log("1");
    });

    // Model 2
    btnModel2.addEventListener("click", () => {
        console.log("2");
    })
}