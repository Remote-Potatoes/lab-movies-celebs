const Celeb = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model");

const router = require("express").Router();

router.get("/", async (req, res) => {
  const allMovies = await Movie.find();
  res.render("movies/movies", { allMovies });
});

router.get("/create", async (req, res) => {
  const allCelebs = await Celeb.find();
  res.render("movies/new-movie", { allCelebs });
});

router.post("/create", async (req, res) => {
  const { title, genre, plot, cast } = req.body;

  try {
    await Movie.create({
      title,
      genre,
      plot,
      cast,
    });
    res.redirect("/movies");
  } catch (err) {
    console.error("Error: ", err);
    res.redirect("/movies/create");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const singleMovie = await Movie.findById(req.params.id).populate("cast");

    if (!singleMovie) {
      res.redirect("/");
    }

    res.render("movies/movie-details", { singleMovie });
  } catch (error) {
    console.error("Error: ", err);
    res.redirect("/");
  }
});

router.post("/:id/delete", async (req, res) => {
  //   Movie.deleteOne({ _id: new mongoose.mongo.ObjectId(req.params.id) })
  try {
    await Movie.findByIdAndDelete(req.params.id);
    res.redirect("/movies");
  } catch (error) {
    console.error("Error: ", err);
    res.redirect("/");
  }
});

module.exports = router;
