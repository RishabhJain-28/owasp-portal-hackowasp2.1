const router = require("express").Router();
const request = require("request");
const keys = require("../config/keys");

router.post("/", async (req, res) => {
  const { code: source, input, lang } = req.body;
  // const input = req.body.input;

  console.log(source);
  const creq = {
    url: "https://api.hackerearth.com/code/run/",
    method: "POST",
    form: {
      client_secret: keys.hackerearth_client_secret,
      async: 0,
      source: source,
      lang,
      time_limit: 5,
      memory_limit: 262144,
      input,
    },
  };
  const cres = await request(creq, (err, z, body) => {
    console.log(JSON.parse(body));
    res.json(JSON.parse(body));
  });
});
module.exports = router;
