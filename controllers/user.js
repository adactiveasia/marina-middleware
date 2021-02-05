const fs = require('fs');
const path = require('path');
const admin = require("firebase-admin");
const User = require('../models/user');
const Mail = require('./mail');


exports.win = async (req, res, next) => {

    const { win, email, mobile, first, last, birthday, optin } = req.body;
    try {
        const mailTotal = await User.find({ email: email }).countDocuments();
        const mobileTotal = await User.find({ mobile: mobile }).countDocuments();
        if (mailTotal + mobileTotal < 5 && mailTotal < 4 && mobileTotal < 4) {
            const user = new User({
                email, mobile, first, last, birthday, optin
            });
            await user.save();

            let info = '';
            let error = '';

            try {
                info = Mail.sendMail(email, win)
            } catch (e) {
                error = e;
            }



            return res.status(200).json({
                error: 0,
                message: 'user saved successefully',
                info: info,
                mailError: error,
            })
        } else {
            return res.status(200).json({
                error: 1,
                message: 'you have claim more than 3 times',
            })
        }

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    };

};

async function deleteUser(uid) {
    await admin.auth().deleteUsers([uid])
        .then(() => {
            console.log("success");
        })
        .catch(function (error) {
            console.log('Error listing users:', error);
        });
}

async function listAllUsers() {
    // List batch of users, 1000 at a time.
    let users;
    await admin.auth().listUsers(10)
        .then(function (listUsersResult) {
            users = listUsersResult.users.map((userRecord) => {
                return userRecord.toJSON()
            })
        })
        .catch(function (error) {
            console.log('Error listing users:', error);
        });
    return users;
}