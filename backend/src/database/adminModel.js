const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const schema = new mongoose.Schema({
    registrationNumber: {
        type: Number,
        unique: true,
        trim:true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    tokens: [
        {
            token: {
                type: String
            }
        }
    ]
});


schema.methods.authSystem = async function () {
    const genToken = await jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
    this.tokens = this.tokens.concat({ token: genToken });
    this.save();
    return genToken;
}

const Admin = new mongoose.model("admin", schema);
module.exports = Admin;