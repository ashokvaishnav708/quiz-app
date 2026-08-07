const username = document.getElementById("username");
const saveButton = document.getElementById("saveButton");
const finalScore = document.getElementById("finalScore");
const mostRecentScore = localStorage.getItem("mostRecentScore");

finalScore.innerText = mostRecentScore;

username.addEventListener("keyup", () => {
    saveButton.disabled = !username.value;

});

saveHighScore = (e) => {
    console.log("")
    e.preventDefault();
}