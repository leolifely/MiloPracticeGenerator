function randomLine(fileName, numLines) {
    if (fileName === 'scales.txt') {
      document.getElementById('3-scales-button').style.display = 'none';
    } else if (fileName === 'reviews_book1.txt') {
      document.getElementById('2-book1-review-button').style.display = 'none';
    } else if (fileName === 'reviews_book2.txt') {
      document.getElementById('2-book2-review-button').style.display = 'none';
    } else if (fileName === 'reviews_book3.txt') {
      document.getElementById('2-book3-review-button').style.display = 'none';
    }
    fetch(fileName).then(response => {
      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
          }
      return response.text();
    }).then(data => {
      const lines = data.split('\n');
      let lastLine = [];
      for (let i = 0; i < numLines; i++) {
        const randomIndex = Math.floor(Math.random() * lines.length);
        
        if (lastLine.includes(randomIndex)) {
          i--;
          continue;
        }

        lastLine = randomIndex;
        console.log('chosen line:', lines[randomIndex]);
        document.getElementById('file-content').textContent += lines[randomIndex] + '\n';
      }
    }).catch(error => {
      console.error(error);
    });
  }
  