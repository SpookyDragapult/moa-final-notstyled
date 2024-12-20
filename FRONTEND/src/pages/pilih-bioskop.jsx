import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../contexts/BookingContext';
import '../styles/Pilih-Bioskop.css';

function PilihBioskop() {
  const navigate = useNavigate()
  const { updateTheater, updateSchedule, movieTitle, selectedMovie } = useBooking(); // Access context functions
  const [selectedDate, setSelectedDate] = useState('10 Oktober');
  const [selectedTheater, setSelectedTheater] = useState(null);
  const [selectedSchedule, setSelectedSchedule] = useState(null);

  const goToProfile = () => {
    navigate('/profile', {
      state: { from: '/pilih-bioskop'}
    })
  }

  // Data mock untuk setiap tanggal
  const theatreData = {
    '10 Oktober': [
      { name: 'Bioskop A', address: 'Alamat A' },
      { name: 'Bioskop B', address: 'Alamat B' },
    ],
    '11 Oktober': [
      { name: 'Bioskop C', address: 'Alamat C' },
      { name: 'Bioskop D', address: 'Alamat D' },
    ],
    '12 Oktober': [
      { name: 'Bioskop E', address: 'Alamat E' },
      { name: 'Bioskop F', address: 'Alamat F' },
    ],
  };

  const handleTheaterClick = (theater) => {
    setSelectedTheater(theater);
    updateTheater(theater); // Update theater in context
  };

  const handleScheduleClick = (schedule) => {
    setSelectedSchedule(schedule);
    updateSchedule(schedule); // Update schedule in context
  };

  const handleConfirm = () => {
    if (selectedTheater && selectedSchedule) {
      navigate('/pilih-kursi'); // Navigate to the seat selection page
    } else {
      alert('Please select a theater and schedule first!');
    }
  };


  // State untuk mengontrol sidebar
        const [isSidebarActive, setIsSidebarActive] = useState(false);
      
        // Fungsi untuk toggle sidebar
        const toggleSidebar = () => {
          setIsSidebarActive(!isSidebarActive);
        };
      
        // Fungsi untuk navigasi
        const handleNavigation = (section) => {
          window.location.href = `#${section}`;
        };

  return (
    <div>
      {/* Header */}
      <div className="header">
        <div className="d-flex align-items-center">
          <div className="hamburger-menu" onClick={toggleSidebar}>
            <div />
            <div />
            <div />
          </div>
          <h2 className="text-danger ms-3 mb-0 logo">Ticketing</h2>
        </div>
        <div className="d-flex align-items-center">
          <div className="search-bar me-3">
            <i className="fas fa-search"></i>
            <input placeholder="cari film" type="text" />
          </div>
          <div className="notif">
            <i className="fas fa-bell fa-2x me-3"></i>
          </div>
          <div className="user-info">
          <span onClick={goToProfile} className="text-decoration-none text-reset d-flex" style={{cursor: 'pointer'}}>
                        <i className="fas fa-user-circle fa-2x"></i>
                        <span className="align-self-center">profile</span>
          </span>
          </div>
        </div>
      </div>

      <div className="d-flex">
            {/* Sidebar */}
            <div className={`sidebar ${isSidebarActive ? "active" : ""}`} id="sidebar">
            <a className="active" href="/" onClick={() => handleNavigation("movie")}>
                <i className="fas fa-film pe-2"></i>Movie
            </a>
            <a href="/trending" onClick={() => handleNavigation("trending")}>
                <i className="fas fa-fire pe-2"></i>Trending
            </a>
            <a href="/food" onClick={() => handleNavigation("food")}>
                <i className="fas fa-utensils pe-2"></i>Food
            </a>
            </div>

      {/* Main Content */}
            <div className="flex-grow-1">
              <div className="main-content">
                <div className="d-flex justify-content-center">
                  <div className="poster p-2">
                    <img src={selectedMovie.src} alt={selectedMovie.title} />
                  </div>
                  <div className="desc p-2 ms-3">
                    <h2>{selectedMovie.title}</h2>
                    <p>{selectedMovie.description}</p>
                    <div className="rating d-flex align-items-center">
                        <span className="rating-value ">{selectedMovie.rating}</span>
                        <div className="star text-warning">
                            {[...Array(5)].map((_, i) => (
                            <span key={i}>
                                <i
                                className={
                                    i < selectedMovie.rating
                                    ? "fas fa-solid fa-star"
                                    : "far fa-star"
                                }
                                ></i>
                            </span>
                            ))}
                        </div>
                        <span className="votes">{selectedMovie.votes} Votes</span>
                    </div>
                    <p>
                      <i className="bi bi-stopwatch mt-2"></i> {selectedMovie.duration}
                    </p>
                  </div>
                </div>
    
                {/* Booking Section */}
                <div className="book d-flex justify-content-center">
                  <div className="dropdown">
                    <button
                      className="btn btn-danger dropdown-toggle"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="true"
                    >
                      Playing In
                    </button>
                    <ul className="dropdown-menu">
                      <li>
                        <a className="dropdown-item" href="#">
                          Yogyakarta
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Another action
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Something else here
                        </a>
                      </li>
                    </ul>
                    <button className="btn btn-outline-danger m-2">
                      Watch Trailer
                    </button>
                  </div>
                </div>
    
                <p className="available m-2">
                  Ticket Available 
                </p>

        {/* Tanggal Tab */}
        <nav>
          <div className="nav nav-tabs justify-content-center">
            {Object.keys(theatreData).map((date) => (
              <button
                key={date}
                className={`nav-link ${selectedDate === date ? 'active' : ''}`}
                onClick={() => setSelectedDate(date)}
              >
                {date}
              </button>
            ))}
          </div>
        </nav>
        {/* Konten Berdasarkan Tanggal */}
        <div className="theatre-area mt-3">
          {theatreData[selectedDate]?.map((theatre, index) => (
            <div className="theatre-card p-2 mb-3" key={index}>
              <h3>{theatre.name}</h3>
              <p>{theatre.address}</p>
              <div className="time d-flex justify-content-center">
                <button
                  className="btn btn-jam m-2"
                  onClick={() => {
                    handleTheaterClick(theatre.name);
                    handleScheduleClick('Jam 1');
                  }}
                >
                  Jam 1
                </button>
                <button
                  className="btn btn-jam m-2"
                  onClick={() => {
                    handleTheaterClick(theatre.name);
                    handleScheduleClick('Jam 2');
                  }}
                >
                  Jam 2
                </button>
                <button
                  className="btn btn-jam m-2"
                  onClick={() => {
                    handleTheaterClick(theatre.name);
                    handleScheduleClick('Jam 3');
                  }}
                >
                  Jam 3
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Total Harga */}
        <div className="confirm d-flex">
          <h1 className="total me-auto p-2">
            Selected: {selectedTheater || 'None'} - {selectedSchedule || 'None'}
          </h1>
          <button className="btn btn-outline-danger p-3" onClick={handleConfirm}>
            Confirm
          </button>
        </div>

      </div>
    </div>
    </div>
    </div>
  );
}

export default PilihBioskop
