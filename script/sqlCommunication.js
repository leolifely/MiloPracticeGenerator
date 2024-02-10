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

function readPractices(id, password) {
    fetch('http://leoli.local:3000/ReadPractices', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ user: id, password: password})
    }).then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    }).then(data => {
      console.log(data);
      document.getElementById('file-content').textContent += 'Practice records for ' + id + ':\n';
      for (let i = 0; i < data.length; i++) {
        document.getElementById('file-content').textContent += 'Date: ' + data[i].date + ', Duration: ' + data[i].duration + 'ms\n';
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