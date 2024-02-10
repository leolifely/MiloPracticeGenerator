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
      if (timeDiff > 100) { //REMEMBER TO CHANGE THIS BACK TO 100.000ms
        showForm(loginForm);
        let username, password = getDetails();
        writePractices(username, password, timeDiff, new Date().toISOString());
      } else {
        document.getElementById('file-content').textContent += 'Practice time too short to write to database.\n';
      }
      button.textContent = 'Start practice';
      button.removeEventListener('click', endPractice);
      button.addEventListener('click', startPractice);
    }
  }

function startPractice() {
    togglePractice(1);
}

function endPractice() {
    togglePractice(0);
}
