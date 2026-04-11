require("dotenv").config();

const server = require("./app");
const connectDB = require("./config/db");

connectDB();

const Port = process.env.PORT;

server.listen(Port, () => {
  console.log(`Server running on port ${Port}`);
});