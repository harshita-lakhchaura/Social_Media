import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

//Register user
export const register = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation
        } = req.body;

        async function hashPassword(password) {
            try {
                const salt = await bcrypt.genSalt();
                const hashedPassword = await bcrypt.hash(password, salt);
                const newUser = new User({
                    firstName,
                    lastName,
                    email,
                    password: hashedPassword,
                    picturePath,
                    friends,
                    location,
                    occupation,
                    viewedProfile: Math.floor(Math.random() * 10000),
                    impressions: Math.floor(Math.random() * 10000)
                })

                const savedUser = await newUser.save();
                res.status(201).json(savedUser);

            } catch (err) {
                console.log(err);
            }
        }

        hashPassword(password);
    }
    catch (err) {
        res.status(500).send({ message: err.message });
    }
}