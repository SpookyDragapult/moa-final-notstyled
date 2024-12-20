// BookingContext.js (or wherever your context is defined)
import React, { createContext, useContext, useState } from 'react';

const BookingContext = createContext();

export const useBooking = () => useContext(BookingContext);

export const BookingProvider = ({ children }) => {
  const [movieTitle, setMovieTitle] = useState(""); // Store only the movie title
  const [theater, setTheater] = useState(null);
  const [schedule, setSchedule] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState("");
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [ticketPrice, setTicketPrice] = useState(40000); // Default price per seat

  const updateSeats = (seats) => {
    setSelectedSeats(seats);
  };

  // Update the entire movie object
  const updateMovie = (selectedMovie) => {
    setSelectedMovie(selectedMovie);
  };

  const updatePrice = (price) => {
    setTicketPrice(price);
  };

  const updateMovieTitle = (title) => {
    setMovieTitle(title);
  };

  // Function to update the theater
  const updateTheater = (selectedTheater) => { // Updated to 'updateTheater'
    setTheater(selectedTheater);
  };
  // Function to update the schedule
  const updateSchedule = (selectedSchedule) => {
    setSchedule(selectedSchedule);
  };

  return (
    <BookingContext.Provider value={{ theater, selectedMovie, schedule, selectedSeats, ticketPrice, movieTitle, updateSeats, updateMovie, updatePrice, updateTheater, updateSchedule, updateMovieTitle }}>
      {children}
    </BookingContext.Provider>
  );
};
