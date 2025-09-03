import express from "express";
const router = express.Router();


//routes

router
    .route("/")

    .get((req, res) => {
        console.log("This was a get request");
    })
    .post((req, res) => {
        console.log("This was a get request");
    });

router
    .route("/:id")
    .put((req, res) => {
        console.log("This was a put request");
    })
    .delete((req, res) => {
        console.log("This was a delete request");
    });

    export default router;