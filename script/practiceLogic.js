function togglePractice(on) {
  
    if (on) {
      showButtons();
      startButton.removeEventListener('click', startPractice);
      startButton.addEventListener('click', endPractice);
      startTime = new Date().getTime();
      console.log('Practice started at:', startTime);
      startButton.textContent = 'End practice';
    } else {
      hideButtons();
      var endTime = new Date().getTime();
      var timeDiff = endTime - startTime;
      console.log('Practice time:', (timeDiff * 1000).toString());
      document.getElementById('file-content').textContent += 'Practice time: ' + (timeDiff / 1000).toString() + ' seconds\n';
      if (timeDiff > 100) { //REMEMBER TO CHANGE THIS BACK TO 100.000ms
        showForm(loginForm);
        getDetails().then(([username, password]) => {
          writePractices(username, password, timeDiff, new Date().toISOString().slice(0, 19).replace('T', ' '));
        });
      } else {
        document.getElementById('file-content').textContent += 'Practice time too short to write to database.\n';
      }
      startButton.textContent = 'Start practice';
      startButton.removeEventListener('click', endPractice);
      startButton.addEventListener('click', startPractice);
    }
  }

function startPractice() {
    togglePractice(1);
}

function endPractice() {
    togglePractice(0);
}
