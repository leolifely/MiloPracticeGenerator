function togglePractice(on, instument) {
  
    if (on) {
      showButtons();
      startViolinButton.removeEventListener('click', () => startPractice(instument));
      startViolinButton.addEventListener('click', () => endPractice(instument));
      startHarpButton.removeEventListener('click', () => startPractice(instument));
      startHarpButton.addEventListener('click', () => endPractice(instument));
      startTime = new Date().getTime();
      console.log('Practice started at:', startTime);
      startHarpButton.textContent = 'End Harp Practice';
      startViolinButton.textContent = 'End Violin Practice';
    } else {
      hideButtons();
      var endTime = new Date().getTime();
      var timeDiff = endTime - startTime;
      console.log('Practice time:', (timeDiff * 1000).toString());
      document.getElementById('file-content').textContent += 'Practice time: ' + (timeDiff / 1000).toString() + ' seconds\n';
      if (timeDiff > 100_000) { 
        showForm(loginForm);
        getDetails().then(([username, password]) => {
          writePractices(username, password, timeDiff, new Date().toISOString().slice(0, 19).replace('T', ' '));
        });
      } else {
        document.getElementById('file-content').textContent += 'Practice time too short to write to database.\n';
      }
      startViolinButton.textContent = 'Start Violin Practice';
      startHarpButton.textContent = 'Start Harp Practice';
      startViolinButton.removeEventListener('click', () => endPractice(instument));
      startViolinButton.addEventListener('click', () => startPractice(instument));
      startHarpButton.removeEventListener('click', () => endPractice(instument));
      startHarpButton.addEventListener('click', () => startPractice(instument));
    }
  }

function startPractice(instument) {
    togglePractice(1, instument);
}

function endPractice(instument) {
    togglePractice(0, instument);
}
