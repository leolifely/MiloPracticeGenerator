function randomLine(fileName, numLines) {
  if (fileName === 'scales.txt') {
    document.getElementById('3-scales-button').style.display = 'none';
  } else if (fileName === 'reviews_book1.txt') {
    document.getElementById('2-book1-review-button').style.display = 'none';
  } else if (fileName === 'reviews_book2.txt') {
    document.getElementById('2-book2-review-button').style.display = 'none';
  } else if (fileName === 'reviews_book3.txt') {
    document.getElementById('2-book3-review-button').style.display = 'none';
  }
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
var button = document.getElementById('start-practice-button');

function togglePractice(on) {
  
  if (on) {
    showButtons();
    button.removeEventListener('click', startPractice);
    button.addEventListener('click', endPractice);
    startTime = new Date().getTime();
    console.log('Practice started at:', startTime);
    button.textContent = 'End practice';
  } else {
    hideButtons();
    var endTime = new Date().getTime();
    var timeDiff = endTime - startTime;
    console.log('Practice time:', (timeDiff * 1000).toString());
    document.getElementById('file-content').textContent += 'Practice time: ' + (timeDiff / 1000).toString() + ' seconds\n';
    if (timeDiff > 100_000) {
      var user = prompt('Enter your name:', 'Milo');
      writeToDB(user, timeDiff, new Date().toISOString().slice(0, 19).replace('T', ' '));
    } else {
      document.getElementById('file-content').textContent += 'Practice time too short.\n';
    }
    button.textContent = 'Start practice';
    button.removeEventListener('click', endPractice);
    button.addEventListener('click', startPractice);
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

function startPractice() {
  togglePractice(1);
}

function endPractice() {
  togglePractice(0);
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

button.addEventListener('click', startPractice);

document.getElementById('3-scales-button').addEventListener('click', () => randomLine('scales.txt', 3));
document.getElementById('2-book1-review-button').addEventListener('click', () => randomLine('reviews_book1.txt', 2));
document.getElementById('2-book2-review-button').addEventListener('click', () => randomLine('reviews_book2.txt', 2));
document.getElementById('2-book3-review-button').addEventListener('click', () => randomLine('reviews_book3.txt', 2));