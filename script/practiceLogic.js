function togglePractice(on, instument) {
  
    if (on) {
      if (instument === 'violin') {
        startViolinButton.textContent = 'End Violin Practice';
        startViolinButton.removeEventListener('click', () => startPractice(instument));
        startViolinButton.addEventListener('click', () => endPractice(instument));
        showButtons();
      }
      else if (instument === 'harp') {
       startHarpButton.removeEventListener('click', () => startPractice(instument));
       startHarpButton.addEventListener('click', () => endPractice(instument));
       startHarpButton.textContent = 'End Harp Practice';
      }
      if (!startTime) {
        startTime = new Date().getTime();
      }
      console.log('Practice started at:', startTime);
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

      if (instument === 'violin') {
        startViolinButton.textContent = 'Start Violin Practice';
        startViolinButton.removeEventListener('click', () => endPractice(instument));
        startViolinButton.addEventListener('click', () => startPractice(instument));
      }
      else if (instument === 'harp') {
        startHarpButton.textContent = 'Start Harp Practice';
        startHarpButton.removeEventListener('click', () => endPractice(instument));
        startHarpButton.addEventListener('click', () => startPractice(instument));
      }
  }
}

function startPractice(instument) {
    togglePractice(1, instument);
}

function endPractice(instument) {
    togglePractice(0, instument);
}
