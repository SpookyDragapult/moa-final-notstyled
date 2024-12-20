const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  src: {
    type: String, // Path atau URL gambar poster
    required: true,
  },
  title: {
    type: String, // Judul film
    required: true,
  },
  status: {
    type: String, // Status film: 'ongoing' atau 'upcoming'
    enum: ['nowplaying', 'upcoming'],
    required: true,
  },
  description: {
    type: String, // Deskripsi singkat film
    required: true,
  },
  producer: {
    type: String, // Nama produser
    required: true,
  },
  director: {
    type: String, // Nama sutradara
    required: true,
  },
  writer: {
    type: String, // Nama penulis
    required: true,
  },
  rating: {
    type: Number, // Rating rata-rata film
    required: true,
    default: 0,
  },
  votes: {
    type: Number, // Jumlah suara rating
    required: true,
    default: 0,
  },
  videoTrailer: {
    type: String, // Path atau URL video trailer
    required: true,
  },
  cast: [
    {
      name: String, // Nama pemain
      image: String, // URL gambar pemain
    },
  ],
  duration: {
    type: String, // Tanggal rilis film (optional untuk perbandingan waktu)
    required: true,
  },
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;

