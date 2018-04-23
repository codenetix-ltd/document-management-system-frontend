module.exports = (request, response) => {
  setTimeout(() => {
    response.status(200).sendFile('GET.json', { root: __dirname });
  }, 1000);
};
