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

function showForm(form) {
  form.style.display = 'flex';
}

function hideForm(form) {
  form.style.display = 'none';
}

function disableButton(button) {
  button.disabled = true;
}

function enableButton(button) {
  button.disabled = false;
}

hideButtons();

startButton.addEventListener('click', startPractice);
signupButton.addEventListener('click', () => showForm(signupForm));
dataButton.addEventListener('click', () => showForm(loginForm));

document.getElementById('3-scales-button').addEventListener('click', () => randomLine('scales.txt', 3));
document.getElementById('2-book1-review-button').addEventListener('click', () => randomLine('reviews_book1.txt', 2));
document.getElementById('2-book2-review-button').addEventListener('click', () => randomLine('reviews_book2.txt', 2));
document.getElementById('2-book3-review-button').addEventListener('click', () => randomLine('reviews_book3.txt', 2));

disableButton(document.getElementById('2-book1-review-button'));
disableButton(document.getElementById('2-book2-review-button'));
disableButton(document.getElementById('2-book3-review-button'));