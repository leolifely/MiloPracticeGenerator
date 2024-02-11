function writePractices(username, password, duration, date) {
    fetch('http://leoli.local:3000/WritePractices', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username: username, password: password, duration: duration, date: date})
    }).then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      } else if (response.status === 403) {
        alert('Invalid username or password');
      }
      return response.text();
    }).then(data => {
      console.log(data);
    }).catch(error => {
      console.error(error);
    });
  }

function readPractices(username, password) {
    fetch('http://leoli.local:3000/ReadPractices', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username: username, password: password})
    }).then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    }).then(data => {
      console.log(data);
      document.getElementById('file-content').textContent += 'Practice records for ' + username + ':\n';
      for (let i = 0; i < data.length; i++) {
        document.getElementById('file-content').textContent += 'Date: ' + data[i].date.slice(0, 19).replace('T', ' ').split(' ')[0] + ', Duration: ' + formatTime(data[i].duration)+ '\n';
      }
    }).catch(error => {
      console.error(error);
    });
}

function signUp(username, password) {
    fetch('http://leoli.local:3000/SignUp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ user: username, password: password})
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

function formatTime(milliseconds) {
    const seconds = Math.floor((milliseconds / 1000) % 60);
    const minutes = Math.floor((milliseconds / 1000 / 60) % 60);
    const hours = Math.floor((milliseconds / 1000 / 60 / 60) % 24);

    return [
        hours.toString().padStart(2, "0"),
        minutes.toString().padStart(2, "0"),
        seconds.toString().padStart(2, "0")
    ].join(":");
}