module.exports = (request, response) => {
  /** todo: send 422 if required fields are empty */
  response.status(201).sendFile('POST.json', { root: __dirname });
};
