function writeDB(user, duration, date) {
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

function readDB(user) {
    fetch('http://leoli.local:3000/ReadDB', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ user: user})
    }).then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    }).then(data => {
      console.log(data);
      document.getElementById('file-content').textContent += 'Practice records for ' + user + ':\n';
      for (let i = 0; i < data.length; i++) {
        document.getElementById('file-content').textContent += 'Date: ' + data[i].date + ', Duration: ' + data[i].duration + 'ms\n';
      }
    }).catch(error => {
      console.error(error);
    });
}