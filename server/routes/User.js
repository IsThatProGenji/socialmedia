const express = require("express")
const router = express.Router()

const db = require("../config/db")

router.post("/register", (req, res) => {

    const username = req.body.username;
    const password = req.body.password;
    db.query(
        "INSERT INTO users (username,password) VALUES (?,?)",
        [username, password],
        (err, results) => {
            console.log(err);
            res.send(results);
        }
    )
})
router.post("/login", (req, res) => {

    const username = req.body.username;
    const password = req.body.password;
    db.query(
        "SELECT * FROM users WHERE username = ?",
        username,
        (err, results) => {
            if (err) {
                console.log(err)
            }
            if (results.length > 0) {
                console.log(results[0])
                if (password == results[0].password) {
                    res.json({ loggedIn: true, username: username })
                    console.log("youre logged in")
                } else {
                    res.json({ loggedIn: false, username: username, message: "Wrong and Password Combination !" })

                }
            } else {
                res.json({ loggedIn: false, username: username, message: "User doesn't exist !" })

            }

            console.log(err);

        }
    )
})



module.exports = router