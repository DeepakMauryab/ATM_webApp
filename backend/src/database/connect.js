const mongoose = require("mongoose");

const mongoOption={
    useNewUrlParser: true,
    useUnifiedTopology: true
}

mongoose.set("strictQuery", false);

mongoose.connect(process.env.MONGODB, mongoOption).then(() => {
    console.log("Database Connected");
}).catch((err) => {
    console.log(err);
})