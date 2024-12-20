const express = require('express');
const router = express.Router();
const Movie = require('../models/movie');

// Get movies by status (ongoing or upcoming)
router.get('/', async (req, res) => {
  const { status } = req.query;

  try {
    const filter = status ? { status } : {};
    const movies = await Movie.find(filter);
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    res.json(movie);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;
