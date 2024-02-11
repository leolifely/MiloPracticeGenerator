getDetails().then(([username, password]) => {
    readPractices(username, password);
});