import { connect } from "mongoose";

const mongodb_url =
  process.env.DATABASE_HOST ||
  "mongodb+srv://E07:E07@cluster0.awvmtif.mongodb.net/test";
connect(mongodb_url)
  .then(() => {
    console.log("Connection to MongoDB server established");
  })
  .catch(() => {
    console.log("Unnable to connect to MongoDB server");
  });
