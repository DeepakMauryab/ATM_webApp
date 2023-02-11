const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const d = new Date();
let a = d.getHours().toString();
let c = d.getSeconds().toString();
let b = d.getMinutes().toString();
let defaultAccounNumber = a + b + c;

const schema = new mongoose.Schema({
    accountNumber: {
        type: Number,
        default: defaultAccounNumber,
        unique: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    adharNumber: {
        type: Number,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    atmPin: {
        type: String,
        trim: true
    },
    balance: {
        type: Number,
        default: 0.00
    },
    tokens: [
        {
            token: {
                type: String
            }
        }
    ]
});


schema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

schema.methods.generateAuthToken = async function () {
    const genToken = await jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
    this.tokens = this.tokens.concat({ token: genToken });
    this.save();
    return genToken;
}

schema.methods.setPin = async function (pin) {
    try {
        this.atmPin = pin;
        this.save();
    } catch (err) {
        console.log(err);
    }
}

const collection = new mongoose.model("atmData", schema);
module.exports = collection;