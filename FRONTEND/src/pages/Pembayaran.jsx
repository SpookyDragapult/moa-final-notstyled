import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../contexts/BookingContext';
import '../styles/pembayaran.css';

function Pembayaran () {
    const navigate = useNavigate();
    const { selectedSeats, ticketPrice, theater, schedule, movieTitle, selectedMovie } = useBooking();
    const [paymentMethod, setPaymentMethod] = useState('');
    
   // State to manage active payment method and its details
   const [activeTab, setActiveTab] = useState('CreditCard');
   const [walletChosen, setWalletChosen] = useState('');
   const [bankChosen, setBankChosen] = useState('Bank BRI');
   const [cardDetails, setCardDetails] = useState({
     firstName: '',
     lastName: '',
     cardNumber: '',
     cvv: '',
     issueDate: '',
     expiryDate: '',
   });

   const [isSuccess, setIsSuccess] = useState(false);
   const [showModal, setShowModal] = useState(false);
 
   const userId = localStorage.getItem('userId');
   const totalPrice = selectedSeats.length * ticketPrice;



        const goToProfile = () => {
            navigate('/profile', {
            state: { from: '/pembayaran'}
            })
        }

    
       // Handle input changes
       const handleCardChange = (e) => {
        const { name, value } = e.target;
        setCardDetails({ ...cardDetails, [name]: value });
      };

  const handleSetWallet = (wallet) => setWalletChosen(wallet);
  const handleBankChange = (e) => setBankChosen(e.target.value);

          // Function to submit booking data
          const handleConfirmPayment = async () => {
            let paymentDetails = {};
            if (activeTab === 'CreditCard') {
              paymentDetails = { method: 'Credit Card', ...cardDetails };
            } else if (activeTab === 'EWallet') {
              paymentDetails = { method: 'E-Wallet', wallet: walletChosen };
            } else if (activeTab === 'Bank') {
              paymentDetails = { method: 'Bank Transfer', bank: bankChosen };
            }
          
            const bookingData = {
              userId,
              schedule,
              movieTitle: movieTitle,
              theater: theater,  // Change 'theater' to 'movieTitle' (or adjust as necessary)
              seat: selectedSeats,  // 'selectedSeats' will map to 'seat'
               totalPrice,
              paymentMethod: paymentDetails.method,  // 'method' inside 'paymentDetails' maps to 'paymentMethod'
              eWallet: paymentDetails.wallet,  // If it's an E-Wallet, send 'wallet' here
              creditCard: paymentDetails.cardDetails,  // If it's Credit Card, send 'cardDetails' here
              bank: paymentDetails.bank,  // If it's Bank Transfer, send 'bank' here
            };
          
            console.log('Sending booking data:', bookingData);
          
            try {
              const response = await fetch('http://localhost:5000/api/payments/bookings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(bookingData),
              });
          
              if (!response.ok) {
                throw new Error('Booking failed');
              }
              setIsSuccess(true);
            } catch (error) {
              setIsSuccess(false);
              console.error(error);  // Log error for debugging
            }
            setShowModal(true);
          };

  const closeModal = () => {
    setShowModal(false);
    
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
  <div className="header">
    <div className="d-flex align-items-center">
      <div className="hamburger-menu" onClick={toggleSidebar}>
        <div>
        </div>
        <div>
        </div>
        <div>
        </div>
      </div>
      <h2 className="text-danger ms-3 mb-0 logo">
        Ticketing
      </h2>
    </div>
    <div className="d-flex align-items-center">
      <div className="search-bar me-3">
        <i className="fas fa-search">
        </i>
        <input placeholder="cari film" type="text" />
      </div>
      <div className="notif"><i className="fas fa-bell fa-2x me-3">
        </i></div>
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
    <div className="flex-grow-1">
      <div className="main-content">
        <div className="d-flex justify-content-center">
          <div className="poster p-2">
            <img src={selectedMovie.src} alt={selectedMovie.title} />
          </div>
          <div className="desc p-2 ms-3">
            <h2>{selectedMovie.title}</h2>
            <p> <i className="bi bi-stopwatch mt-2" /> {selectedMovie.duration}</p>
            <p>Bioskop A, Studio 1</p>
            <p>Kamis, 10 Okt 2024, 20:24</p>
          </div>
        </div>
        <div className="tiket">
          <p className="available m-3">{selectedMovie.title} - Reguler 2D</p>
        </div>
        <div className="container p-3 mb-3 border border-secondary">
          <div className="border-bottom">
            <h2>Detail Pesanan</h2>
          </div>
          <div className="d-flex mt-3">
            <div className="me-auto">
              <p>1 TIKET</p>
              <p>KURSI REGULER</p>
              <p>BIAYA LAYANAN <br />
                <i className="greyed">Untuk Membantu Meningkatkan Layanan Kami</i></p>
            </div>
            <div>
              <p><span id="Kursi">E4</span></p>
              <p>Rp. <span id="HargaTiket">40.000</span></p>
              <p>Rp. 4000</p>
            </div>
          </div>
        </div>
        <div className>
          <ul className="nav nav-tabs justify-content-center" id="myTab" role="tablist">
            <li className="nav-item" role="presentation">
              <button className={`nav-link pembayaran ${activeTab === 'CreditCard' ? 'active' : ''}`}
            onClick={() => setActiveTab('CreditCard')} id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true" 
              >Kartu Kredit</button>
            </li>
            <li className="nav-item" role="presentation">
              <button className={`nav-link pembayaran ${activeTab === 'EWallet' ? 'active' : ''}`}
            onClick={() => setActiveTab('EWallet')} id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">E-Wallet</button>
            </li>
            <li className="nav-item" role="presentation">
              <button className={`nav-link pembayaran ${activeTab === 'Bank' ? 'active' : ''}`}
            onClick={() => setActiveTab('Bank')}id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact-tab-pane" type="button" role="tab" aria-controls="contact-tab-pane" aria-selected="false">Bank</button>
            </li>
          </ul>
          <div className="tab-content" id="myTabContent">
            <div className="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabIndex={0}>
              <div className="container-sm mt-4 border border-secondary p-4">
                <div className='heading text-center'>
                  <h2>Informasi Kartu Kredit</h2>
                </div>
              {activeTab === 'CreditCard' && (
        <div className="row g-3">
          {['firstName', 'lastName', 'cardNumber', 'cvv'].map((field, idx) => (
            <div className="col-md-6" key={idx}>
              <input
                type="text"
                name={field}
                className="form-control"
                placeholder={field.replace(/([A-Z])/g, ' $1')}
                onChange={handleCardChange}
              />
            </div>
          ))}
          <div className="col-md-6">
            <label className="form-label">Issue Date</label>
            <input
              type="month"
              name="issueDate"
              className="form-control"
              onChange={handleCardChange}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Expiry Date</label>
            <input
              type="month"
              name="expiryDate"
              className="form-control"
              onChange={handleCardChange}
            />
          </div>
        </div>
      )}
              </div>
            </div>
            <div className="tab-pane fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabIndex={0}>
              <div className="container-sm d-flex flex-column border border-secondary justify-content-evenly mt-4 p-4">
                <div className="heading text-center">
                  <h2>Pilihan E-Wallet Yang Tersedia</h2>
                </div>
                {activeTab === 'EWallet' && (
        <div className="d-flex justify-content-center mb-3">
          {['Dana', 'Gopay', 'LinkAja'].map((wallet) => (
            <button
              key={wallet}
              className={`btn p-3 m-3 ${walletChosen === wallet ? 'btn-success' : 'btn-outline-danger'}`}
              onClick={() => setWalletChosen(wallet)}
            >
              {wallet}
            </button>
          ))}
        </div>
      )}
              </div>
            </div>
            <div className="tab-pane fade" id="contact-tab-pane" role="tabpanel" aria-labelledby="contact-tab" tabIndex={0}>
              <div className="container-sm d-flex flex-column border border-secondary justify-content-center mt-4 p-4">
              <div className='heading text-center'>
                  <h2>Pilihan Bank</h2>
                </div>
              {activeTab === 'Bank' && (
        <div className="mb-3">
          <label className="form-label">Pilih Bank</label>
          <select className="form-select" value={bankChosen} onChange={(e) => setBankChosen(e.target.value)}>
            <option value="Bank BRI">Bank BRI</option>
            <option value="Bank BNI">Bank BNI</option>
            <option value="Bank Mandiri">Bank Mandiri</option>
            <option value="Bank Jago">Bank Jago</option>
          </select>
        </div>
      )}
              </div>
            </div>
          </div>
          {/* Confirm Payment Button */}
      <div className="text-center mt-4">
        <button onClick={handleConfirmPayment} className="btn btn-danger">
          Konfirmasi Pembayaran
        </button>
      </div>

     {/* Success/Failure Modal */}
{showModal && (
  <div className="modal fade show d-block" tabIndex="-1">
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">
            {isSuccess ? 'Movie Booked!' : 'Booking Failed'}
          </h5>
          <button className="btn-close" onClick={closeModal}></button>
        </div>
        <div className="modal-body">
          <p className='modal'>{isSuccess ? 'Your movie has been successfully booked.' : 'Something went wrong, please try again.'}</p>
        </div>
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={closeModal}>
            Close
          </button>
          {isSuccess && (
            <button className="btn btn-danger" onClick={() => navigate('/profile')}>
              View Profile
            </button>
          )}
        </div>
      </div>
    </div>
  </div>
)}

        </div>
      </div>
    </div>
  </div>
</div>

    )
}

export default Pembayaran