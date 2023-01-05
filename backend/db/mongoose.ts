import { connect, set } from "mongoose";
// eslint-disable-next-line prettier/prettier
import { mongoDB_url, mongoDB_pass, mongoDB_user, mongoDB_name } from "../env.backend";

set("strictQuery", true);
const mongodb_url = `mongodb+srv://${mongoDB_user}:${mongoDB_pass}@${mongoDB_url}/${mongoDB_name}`;
connect(mongodb_url)
  .then(() => {
    console.log("Connection to MongoDB server established");
  })
  .catch(() => {
    console.log("Unable to connect to MongoDB server");
  });
