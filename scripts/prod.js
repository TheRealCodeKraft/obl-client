const path = require('path');
const express = require('express');
const app = express();
const openamAgent = require('openam-agent');
const agentConfig = require('../config/openam.json');
const agent = openamAgent(agentConfig);
const PORT = process.env.PORT || 3000;

var cookieShield = new openamAgent.CookieShield({cdsso: true});

var router = express.Router();
router.use(agent.shield(cookieShield));
//app.use('*', router);
app.use(agent.cdsso());

app.get("/agent/cdsso", function(request, response) {
  response.send("CDSSO AGENT");
});
app.get("/", function(request, response) {
  response.sendFile(path.resolve('www/index.html'));
});

app.use("/", express.static(path.resolve('www')));

app.get("*", function(request, response) {
  response.sendFile(path.resolve('www/index.html'));
});

app.listen(PORT, error => {
  error
  ? console.error(error)
  : console.info(`==> 🌎 Listening on port ${PORT}. Visit http://localhost:${PORT}/ in your browser.`)
});
