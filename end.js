const username = document.getElementById("username");
const saveButton = document.getElementById("saveButton");
const finalScore = document.getElementById("finalScore");
const mostRecentScore = localStorage.getItem("mostRecentScore");

const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

finalScore.innerText = mostRecentScore;

username.addEventListener("keyup", () => {
    saveButton.disabled = !username.value;

});

saveHighScore = (e) => {
    e.preventDefault();

    const score = {
        score: Math.floor(Math.random() * 100),
        name: username.value,
    };

    highScores.push(score);
    highScores.sort((a, b) => b.score - a.score);
    highScores.splice(5);

    localStorage.setItem("highScores", JSON.stringify(highScores));
    console.log(window.location.origin);
    window.location.assign("/");
}