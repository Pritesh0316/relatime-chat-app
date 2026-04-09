require("dotenv").config();

const app = require("./app");
const connectDB = require("./config/db");

connectDB();

const Port = process.env.PORT;

app.listen(Port, () => {
  console.log(`Server running on port ${Port}`);
});