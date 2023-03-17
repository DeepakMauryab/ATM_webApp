const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const { authentication, adminAuth } = require("../auth/authentication");

const collection = require("../database/model");
const Admin = require("../database/adminModel");


router.post("/register", async (req, res) => {
    const { name, adharNumber, password } = req.body;
    try {
        if (!name && !adharNumber && !password) {
            res.status(406).json({ error: "enter all details" })
        } else {
            await collection.create({ name, adharNumber, password });
            res.status(201).json({ message: "data inserted" });

        }

    } catch (error) {
        res.status(422).json({ error: "user not registered" });
    }
});


router.post("/login", async (req, res) => {
    const { adharNumber, password } = req.body;
    try {
        if (!adharNumber && !password) {
            res.status(406).json({ error: "enter all details" })
        } else {

            const data = await collection.findOne({ $or: [{ accountNumber: adharNumber }, { adharNumber: adharNumber }] });
            const match = await bcrypt.compare(password, data.password);
            if (match) {
                const token = await data.generateAuthToken();
                res.cookie("atmdata", token,
                    {
                        expires: new Date(Date.now() + ((10000)))
                    }
                );
                res.status(201).json({ message: "user Login succesfully" });
            } else {
                res.status(406).json({ message: "Wrong Password" });

            }
        }
    } catch (error) {
        res.status(422).json({ error: "user login failed" });
    }
});

// adding money router
router.post("/addMoney", authentication, async (req, res) => {
    const { balance, pin } = req.body;
    const myBalance = Number(balance);
    try {
        const data = req.userData;
        if (data.atmPin === pin) {
            data.balance += myBalance;
            await data.save();
            res.status(201).json({ message: "money added" });
        } else {

            res.status(422).json({ error: "incorrect pin" });
        }
    } catch (error) {
        res.status(422).json({ error: "data does not matched" });
    }
});

// money withdraw 
router.post("/withdraw", authentication, async (req, res) => {
    const { balance, pin } = req.body;
    const myBalance = Number(balance);
    try {
        const data = req.userData;
        if (pin === data.atmPin) {
            if (data.balance >= myBalance) {
                data.balance = data.balance - myBalance;
                await data.save();
                res.json({ message: "Money Withdraw" });
            } else {
                res.status(500).json({ error: "no sufficient money" });
            }
        } else {
            res.status(422).json({ error: "wrong atm pin" });

        }
    } catch (error) {
        res.status(422).json({ error: "some error not withdraw money" });
    }
});

// balance check karne ke liye function
router.post("/checkBalance", authentication, async (req, res) => {
    try {
        const data = req.userData;
        res.send({ balance: data.balance });
    } catch (error) {
        res.status(422).json({ error: "some error not withdraw money" });
    }
});

// set user pin 
router.post("/setPin", authentication, async (req, res) => {
    try {
        const data = req.userData;
        const user = await collection.findOne({ _id: data._id });
        if (user) {

            const pin = req.body.pin;
            await user.setPin(pin);

            res.status(201).json({ message: "succesfull created pin!" })
        }
    } catch (err) {
        res.status(422).json({ error: "not created pin" });
    }
})


// for user inserting card authentication
router.post("/pinAuth", async (req, res) => {
    const { adharNumber, pin } = req.body
    try {
        const data = await collection.findOne({ adharNumber: adharNumber });
        const userPin = data.atmPin;

        if (pin === userPin) {
            const token = await data.generateAuthToken();
            res.cookie("atmdata", token,
                {
                    expires: new Date(Date.now() + (1000000))
                }
            );
            res.status(201).json({ message: "user inserted in bank" });
        }
    } catch (err) {
        res.status(422).json({ error: "enter pin correct" });
    }
});

// money transfer function router
router.post("/transfer", authentication, async (req, res) => {
    const { balance, accountNumber, pin } = req.body;
    const myBalance = Number(balance);
    try {
        const data = req.userData;
        if (pin === data.atmPin) {
            const reciever = await collection.findOne({ accountNumber: accountNumber });
            if (reciever) {
                if (data.balance >= myBalance) {
                    data.balance = data.balance - myBalance;
                    await data.save();
                    reciever.balance += myBalance;
                    await reciever.save();
                    res.json({ message: "Money Withdraw" });
                } else {
                    res.status(404).json({ error: "no sufficient money" });
                }
            } else {

                res.status(404).json({ error: "account  number not found !" });
            }
        } else {
            res.status(422).json({ error: "pin incorrect" });
        }
    } catch (err) {
        res.status(422).json({ error: "pin incorrect or account number incorrect" });
    }
});

// cancle transaction
router.get("/cancle", authentication, async (req, res) => {
    try {
        req.userData.tokens = [];
        await req.userData.save();
        res.clearCookie("atmdata", { path: "/" });
        res.status(200).send("user logout");
    } catch (err) {
        res.status(422).json({ error: "not loged" });
    }
});

// user authentication
router.get("/userData", authentication, (req, res) => {
    res.send(req.userData);
})


// admin section
// admin login
router.post("/adminlogin", async (req, res) => {
    const { registrationNumber, password } = req.body;
    try {
        if (!registrationNumber, !password) {
            res.status(406).json({ error: "enter all details" })
        } else {

            const data = await Admin.findOne({ registrationNumber: registrationNumber });
            const match = await bcrypt.compare(password, data.password);
            if (match) {
                const token = await data.authSystem();
                res.cookie("admintoken", token,
                    {
                        expires: new Date(Date.now() + (24 * 60 * 60 * 1000))
                    }
                );
                res.status(201).json({ message: "admin Login succesfully" });
            } else {
                res.status(406).json({ message: "Wrong Password" });

            }
        }
    } catch (error) {
        res.status(422).json({ error: "admin login failed" });
    }
});

router.get("/users", adminAuth, async (req, res) => {
    try {
        const admin = req.adminData;
        if (admin) {
            const data = await collection.find();
            res.send(data);
        } else {
            res.status(422).json({ error: "admin not available" });
        }
    } catch (error) {
        res.status(422).json({ error: "admin not login" });
    }
});
router.get("/logout", adminAuth, async (req, res) => {
    try {
        req.adminData.tokens = [];
        await req.adminData.save();
        res.clearCookie("admintoken", { path: "/" });
        res.status(200).send("admin logout");
    } catch (err) {
        res.status(422).json({ error: " admin not loged" });
    }
});

router.post("/editData", async (req, res) => {
    try {
        const { name, accountNumber, adharNumber,balance } = req.body;
        const data = await collection.findOne({ _id: req.body._id });
        data.name = name;
        data.accountNumber = accountNumber;
        data.adharNumber = adharNumber;
        data.balance= balance;
        await data.save();
        res.status(201).json({ message: "data selected succesfully" });
    } catch (error) {
        res.status(422).json({ error: "not selected data" });
    }
})

router.post("/deleteData", async (req, res) => {
    try {
        const data = await collection.deleteOne({ _id: req.body.deleteId });
        res.status(201).json({ message: "data delete succesfully" });

    } catch (error) {
        res.status(422).json({ error: "not deleted" });
    }
})

module.exports = router;