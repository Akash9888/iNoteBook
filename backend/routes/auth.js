const express = require("express");
const User = require("../Models/User");
const bcrypt = require("bcryptjs");
const fetchUser = require("../MIddleware/fetchUser");
const jwt = require("jsonwebtoken");
const router = express.Router();

const { body, validationResult } = require("express-validator");

//create new user
router.post(
    "/createuser",
    [
        body("email", "Enter a valid email address").isEmail(),
        body("name", "Enter a valid name of minimum 3").isLength({
            min: 3,
        }),
        body("password", "Enter a valid password of min length 6").isLength({
            min: 6,
        }),
    ],
    async (req, res) => {
        let success = false;
        // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success, errors: errors.array() });
        }
        try {
            let user = await User.findOne({ email: req.body.email });
            console.log(user);
            if (user) {
                return res.status(400).json({
                    success,
                    error: "Soryy entered email address is already exists",
                });
            }

            success = true;

            //create hash password
            const salt = await bcrypt.genSaltSync(10);
            const secretPassword = await bcrypt.hashSync(
                req.body.password,
                salt
            );

            //create user account
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secretPassword,
            });

            //user id from db
            const data = {
                user: {
                    id: user.id,
                },
            };

            //create jwt token
            const secretKey = "pakipakapepekhay";
            const authToken = jwt.sign(data, secretKey);

            res.json({ success, authToken });
        } catch (error) {
            console.error(error.message);
            res.status(500).send(success, "Some Error occurred");
        }
    }
);

//login user
router.post(
    "/login",
    [
        body("email", "Enter a valid email address").isEmail(),

        body("password", "Enter  valid password").exists(),
    ],
    async (req, res) => {
        let success = false;
        // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success, errors: errors.array() });
        }
        const { email, password } = req.body;
        try {
            let user = await User.findOne({ email });
            console.log(user);
            if (!user) {
                return res.status(400).json({
                    success,
                    error: "Please login with correct email and password",
                });
            }

            const passComp = await bcrypt.compare(password, user.password);

            if (!passComp) {
                return res.status(400).json({
                    success,
                    error: "Please login with correct email and password",
                });
            }

            success = true;

            //user id from db
            const data = {
                user: {
                    id: user.id,
                },
            };

            //create jwt token
            const secretKey = "pakipakapepekhay";
            const authToken = jwt.sign(data, secretKey);

            res.json({ success, authToken });
        } catch (error) {
            console.error(error.message);
            res.status(500).send(success, "Some Error occurred");
        }
    }
);

//get user

router.post("/getuser", fetchUser, async (req, res) => {
    try {
        userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error occurred");
    }
});

module.exports = router;
