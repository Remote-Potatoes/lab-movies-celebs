const router = require("express").Router();
const Celeb = require("../models/Celebrity.model");

router.get("/", (req, res) => {
  Celeb.find()
    .then((allCelebs) => {
      res.render("celebs/celebs", { allCelebs });
    })
    .catch((err) => {
      console.error("Error: ", err);
      res.redirect("/");
    });
});

router.get("/create", (req, res) => {
  res.render("celebs/new-celeb");
});

router.post("/create", (req, res) => {
  const { name, occupation, catchPhrase } = req.body;
  // Celeb.create(req.body).then()
  Celeb.create({
    name,
    occupation,
    catchPhrase,
  })
    .then(() => {
      res.redirect("/celebs");
    })
    .catch((err) => {
      console.error("Error: ", err);
      res.render("celebs/new-celeb", { ...req.body });
    });
});
module.exports = router;
