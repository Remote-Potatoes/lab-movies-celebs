const Celeb = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model");

const router = require("express").Router();

router.get("/", (req, res) => {
  Movie.find().then((allMovies) => {
    res.render("movies/movies", { allMovies });
  });
});

router.get("/create", (req, res) => {
  Celeb.find().then((allCelebs) => {
    res.render("movies/new-movie", { allCelebs });
  });
});

router.post("/create", (req, res) => {
  const { title, genre, plot, cast } = req.body;
  Movie.create({
    title,
    genre,
    plot,
    cast,
  })
    .then(() => {
      res.redirect("/movies");
    })
    .catch((err) => {
      console.error("Error: ", err);
      res.redirect("/movies/create");
    });
});

router.get("/:id", (req, res) => {
  Movie.findById(req.params.id)
    .populate("cast")
    .then((singleMovie) => {
      if (!singleMovie) {
        res.redirect("/");
      }

      res.render("movies/movie-details", { singleMovie });
    })
    .catch((err) => {
      console.error("Error: ", err);
      res.redirect("/");
    });
});

router.post("/:id/delete", (req, res) => {
  //   Movie.deleteOne({ _id: new mongoose.mongo.ObjectId(req.params.id) })
  Movie.findByIdAndDelete(req.params.id)
    .then(() => {
      res.redirect("/movies");
    })
    .catch((err) => {
      console.error("Error: ", err);
      res.redirect("/");
    });
});

module.exports = router;
