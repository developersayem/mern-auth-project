import express from "express";
import dontenv from "dotenv"
import { connectDB } from "./db/connectDB.js";



dontenv.config()
const app = express();


app.get('/', (req, res) => {
    res.send("Hello  World !");

});

app.listen(3000, () => {
    connectDB()
    console.log('Server listening on port 3000!');
});