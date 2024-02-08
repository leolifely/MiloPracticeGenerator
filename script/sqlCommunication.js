function writeToDB(user, duration, date) {
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
  