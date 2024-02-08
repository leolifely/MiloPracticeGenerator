var startTime;
var button = document.getElementById('start-practice-button');






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



hideButtons();

button.addEventListener('click', startPractice);

document.getElementById('3-scales-button').addEventListener('click', () => randomLine('scales.txt', 3));
document.getElementById('2-book1-review-button').addEventListener('click', () => randomLine('reviews_book1.txt', 2));
document.getElementById('2-book2-review-button').addEventListener('click', () => randomLine('reviews_book2.txt', 2));
document.getElementById('2-book3-review-button').addEventListener('click', () => randomLine('reviews_book3.txt', 2));