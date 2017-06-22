const path = require('path');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

app.use("/", express.static(path.resolve('www')));

app.get("*", function(request, response) {
console.log("UH?")
  response.sendFile(path.resolve('www/index.html'));
});

app.listen(PORT, error => {
  error
  ? console.error(error)
  : console.info(`==> 🌎 Listening on port ${PORT}. Visit http://localhost:${PORT}/ in your browser.`)
});
