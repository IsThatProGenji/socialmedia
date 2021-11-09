const express = require("express")
const router = express.Router()

const db = require("../config/db")


router.post("/", (req, res) => {

    const title = req.body.title;
    const description = req.body.description;
    const image = req.body.image
    const author = req.body.author

    db.query(
        "INSERT INTO uploads (title,description,image,author) VALUE (?, ?, ?,?) ",
        [title, description, image, author],
        (err, results) => {
            console.log(err)
            res.send(results)
        }

    )
})

router.get("/", (req, res) => {
    db.query("SELECT *,  count(likeid) as 'amount'FROM likes right join uploads on likes.likesid = uploads.id GROUP BY id order by id desc;", (err, results) => {
        if (err) {
            console.log(err);
        }
        res.send(results);
    });
});






router.get("/byUser/:username", (req, res) => {
    const userName = req.params.username;
    db.query(
        "SELECT *,  count(likeid) as 'amount' FROM likes  right join uploads on likes.likesid = uploads.id  WHERE uploads.author=? GROUP BY id order by id desc;",
        userName,
        (err, results) => {
            if (err) {
                console.log(err);
            }
            res.send(results);
        }
    );
});
module.exports = router



router.post("/like", (req, res) => {
    const author = req.body.author;
    const likesid = req.body.likesid;
    db.query(
        "INSERT INTO likes (author, likesid) VALUES (?,?)",
        [author, likesid],
        (err, results) => {
            if (err) {
                console.log(err);
            }
            db.query(
                "UPDATE uploads SET likes = likes + 1 WHERE likeid = ?",
                likesid,
                (err2, results2) => {
                    res.send(results);
                }
            );
        }
    );
});

module.exports = router;