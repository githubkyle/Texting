const express = require("express");
const mime = require("mime");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  express.static("Develop", {
    setHeaders: (res, path) => {
      if (path.endsWith(".js")) {
        res.setHeader("Content-Type", "application/javascript");
      }
    }
  })
);
app.use(
  express.static("Develop", {
    setHeaders: (res, path) => {
      if (path.endsWith(".js")) {
        res.setHeader("Content-Type", "application/javascript");
      }
    }
  })
);
app.use(express.static("../client/dist"));
app.use(express.static("../client"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require("./routes/htmlRoutes")(app);

app.listen(PORT, () => console.log(`Now listening on port: ${PORT}`));
