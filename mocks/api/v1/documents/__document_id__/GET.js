module.exports = (request, response) => {
  const ids = ['4', '5', '6', '7', '8', '9', '10', '11'];
  const { document_id } = request.params;
  if (ids.includes(document_id)) {
    response.status(200).sendFile(`GET${document_id}.json`, { root: __dirname });
  } else {
    response.status(200).sendFile('GET.json', { root: __dirname });
  }
};
