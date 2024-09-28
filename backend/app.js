const express = require("express");
const app = express();
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(process.env.PORT, () => {
  console.log(`Server is listening on port ${process.env.PORT}`);
});

//找找看要怎麼透過環境變數的設定來修改要監聽的 port number
