const router = require("express").Router();
const Celeb = require("../models/Celebrity.model");

router.get("/", async (req, res) => {
  try {
    const allCelebs = await Celeb.find();
    res.render("celebs/celebs", { allCelebs });
  } catch (error) {
    console.error("Error: ", err);
    res.redirect("/");
  }
});

router.get("/create", (req, res) => {
  res.render("celebs/new-celeb");
});

router.post("/create", async (req, res) => {
  const { name, occupation, catchPhrase } = req.body;
  // Celeb.create(req.body).then()
  try {
    await Celeb.create({
      name,
      occupation,
      catchPhrase,
    });

    res.redirect("/celebs");
  } catch (error) {
    console.error("Error: ", err);
    res.render("celebs/new-celeb", { ...req.body });
  }
});
module.exports = router;
