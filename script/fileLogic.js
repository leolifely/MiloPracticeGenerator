function randomLine(fileName, numLines) {
    if (fileName === 'scales.txt') {
      document.getElementById('3-scales-button').style.display = 'none';
      document.getElementById('file-content').textContent += '-'.repeat(7) + '\n' +'Scales:\n';
      enableButton(document.getElementById('2-book1-review-button'));
    } else if (fileName === 'reviews_book1.txt') {
      document.getElementById('2-book1-review-button').style.display = 'none';
      document.getElementById('file-content').textContent += 'Book 1 Reviews:\n';
      enableButton(document.getElementById('2-book2-review-button'));
    } else if (fileName === 'reviews_book2.txt') {
      document.getElementById('2-book2-review-button').style.display = 'none';
      document.getElementById('file-content').textContent += 'Book 2 Reviews:\n';
      enableButton(document.getElementById('2-book3-review-button'));
    } else if (fileName === 'reviews_book3.txt') {
      document.getElementById('2-book3-review-button').style.display = 'none';
      document.getElementById('file-content').textContent += 'Book 3 Reviews:\n';
    }
    fetch(fileName).then(response => {
      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
          }
      return response.text();
    }).then(data => {
      const lines = data.split('\n');
      let lastLines = [];
      for (let i = 0; i < numLines; i++) {
        let randomIndex;
        do {
          randomIndex = Math.floor(Math.random() * lines.length);
        } while (lastLines.includes(randomIndex));
        lastLines.push(randomIndex);

        console.log('chosen line:', lines[randomIndex]);
        document.getElementById('file-content').textContent += lines[randomIndex] + '\n';
      }
      document.getElementById('file-content').textContent += '-'.repeat(lines[lastLines[numLines-1]].length) + '\n';
    }).catch(error => {
      console.error(error);
    });
  }
  