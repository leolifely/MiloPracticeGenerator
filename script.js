function randomLine(fileName, numLines) {
  fetch(fileName).then(response => {
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
        }
    return response.text();
  }).then(data => {
    const lines = data.split('\n');
    let lastLine = -1;
    for (let i = 0; i < numLines; i++) {
      const randomIndex = Math.floor(Math.random() * lines.length);
      if (randomIndex === lastLine) {
        i--;
        continue;
      }
      lastLine = randomIndex;
      console.log('chosen line:', lines[randomIndex]);
      document.getElementById('file-content').textContent += lines[randomIndex] + '\n';
    }
  }).catch(error => {
    console.error(error);
  });
}

var startTime;

function togglePractice(on) {
  var button = document.getElementById('start-practice-button');
  if (on) {
    showButtons();
    startTime = Date.now();
    console.log('Practice started at:', startTime);
    button.textContent = 'End practice';
    button.removeEventListener('click', () => togglePractice(1));
    button.addEventListener('click', () => togglePractice(0));
  } else {
    hideButtons();
    var endTime = Date.now();
    var timeDiff = (endTime - startTime) / 60000;
    console.log('Practice time:', timeDiff);
     var user = prompt('Enter your name:', 'Milo');
     writeToDB(user, timeDiff, new Date().toISOString());

    button.textContent = 'Start practice';
    button.removeEventListener('click', () => togglePractice(0));
    button.addEventListener('click', () => togglePractice(1));
  }
}

function hideButtons() {
  document.getElementById('3-scales-button').style.display = 'none';
  document.getElementById('2-book1-review-button').style.display = 'none';
  document.getElementById('2-book2-review-button').style.display = 'none';
  document.getElementById('2-book3-review-button').style.display = 'none';
}

function showButtons() {
  document.getElementById('3-scales-button').style.display = 'block';
  document.getElementById('2-book1-review-button').style.display = 'block';
  document.getElementById('2-book2-review-button').style.display = 'block';
  document.getElementById('2-book3-review-button').style.display = 'block';

}

function writeToDB(user, duration, date) {
  fetch('http://leoli.local:3000/WriteDB', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ user: user, duration: duration, date: date})
  }).then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.text();
  }).then(data => {
    console.log(data);
  }).catch(error => {
    console.error(error);
  });
}

hideButtons();

document.getElementById('start-practice-button').addEventListener('click', () => togglePractice(1));

document.getElementById('3-scales-button').addEventListener('click', () => randomLine('scales.txt', 3));
document.getElementById('2-book1-review-button').addEventListener('click', () => randomLine('reviews_book1.txt', 2));
document.getElementById('2-book2-review-button').addEventListener('click', () => randomLine('reviews_book2.txt', 2));
document.getElementById('2-book3-review-button').addEventListener('click', () => randomLine('reviews_book3.txt', 2));