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

function startPractice() {
    togglePractice(1);
}

function endPractice() {
    togglePractice(0);
}
