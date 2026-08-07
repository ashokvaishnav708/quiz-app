# Quiz App

A basic quiz app built with plain HTML, CSS and JavaScript. No frameworks, no libraries, just the fundamentals.

Did this mainly to get back into the habit of writing HTML/CSS/JS from scratch instead of always reaching for a framework.

## How it works

- `index.html` - home screen, just links to play or view high scores
- `game.html` / `game.js` - loads `questions.json`, shuffles through the questions, tracks score
- `end.html` / `end.js` - shows your final score, lets you save it under a username
- `highscores.html` / `highscores.js` - reads saved scores back out of localStorage

Scores are stored in `localStorage`, so nothing server-side, no database. Top 5 scores are kept.

## Built with

- HTML
- CSS
- JavaScript

## Status

Calling this one done. Might come back and mess around with more JS/HTML/CSS concepts here later, but no big plans right now.
