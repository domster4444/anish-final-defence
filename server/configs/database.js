const colorette = require("colorette");

async function connectToAtlas() {
  const mongoose = await require("mongoose");
  mongoose.set("strictQuery", false);
  //* mongoose.connect(urlParam,{options to resolve depricated warninigs })
  let a = await mongoose
    .connect("mongodb+srv://anish1:regmi1@cluster0.5r15fkm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((data) => {
      console.log(colorette.bold(`Success ${colorette.bgGreen(colorette.white(" Database "))} Connected ✔️`));
    })
    .catch((error) => {
      console.log(error.message);
      process.exit(1);
    });
}

module.exports = connectToAtlas;

//? useCase direction
// const connectDB = require('./configs/database');
// const DATABASE_URL = process.env.DATABASE_URL;
// connectDB(DATABASE_URL);
