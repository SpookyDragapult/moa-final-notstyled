import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'
import '../styles/profile.css';
import { use } from 'react';

function Profile() {
    const navigate = useNavigate()
    const location = useLocation()
    const [user, setUser] = useState(null); // for user
    const [loading, setLoading] = useState(null); // for loading
  // State untuk mengelola tab yang aktif
  const [activeTab, setActiveTab] = useState('active-tickets');
  
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve token from localStorage
        if (!token) {
          return navigate('/login'); // Redirect to login if no token exists
        }

        const response = await fetch('http://localhost:5000/api/auth/profile', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`, // Send token as Bearer in Authorization header
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch profile');
        }

        const data = await response.json();
        setUser(data); // Set user data to state
        localStorage.setItem('userId', data._id);
       
      } catch (error) {
        console.error(error);
        navigate('/login'); // Redirect to login if error occurs
      } finally {
        setLoading(false); // Set loading to false after fetch completes
      }
    };

    fetchUserProfile();
  }, [navigate]);

  // Fungsi untuk menangani klik tab
  const handleTabClick = (tab) => {
    setActiveTab(tab);
};

    // FUngsi handle back
    const handleBack = () =>  {
        // Cek state dari lokasi sebelumnya
        const state = location.state;

        //Jika ada state dari, navigasi ke path tersebut
        if (state && state.from) {
            navigate(state.from)
        } else {
            navigate('/')
        }
    }
    const ID = user?._id;

  return (
    <div>
      <div className="header">
        <h2 className="text-danger ms-3 mb-0 logo">Ticketing</h2>
        <div className="d-flex align-items-center me-3">
            <button onClick={handleBack} className="btn btn-outline-danger btn-sm">
                Kembali
            </button>
        </div>
      </div>

      {/* Profile Section */}
      <div className="container mt-5 pt-4">
        <div className="profile-header text-center">
          <img src="/images/mario.jpg" alt="Foto Profil" className="rounded-circle m-3" width={150} height={150} />
          {loading ? (
            <p>Loading...</p> // Show loading text if data is being fetched
          ) : (
            <>
              <h3 className="username text-danger">{user?.name}</h3>
              <p className="pale">{user?.email}</p>
              <p className="pale">{ID}</p>
            </>
          )}
          <button className="btn btn-outline-danger btn-sm mt-2">Edit Profil</button>
        </div>

        {/* Tabs */}
        <div className="profile-tabs mt-5 text-center">
          <button
            id="active-tickets-tab"
            className={`btn mx-2 ${activeTab === 'active-tickets' ? 'btn-danger active-tab' : 'btn-outline-danger'}`}
            onClick={() => handleTabClick('active-tickets')}
          >
            Tiket Aktif
          </button>
          <button
            id="history-tab"
            className={`btn mx-2 ${activeTab === 'ticket-history' ? 'btn-danger active-tab' : 'btn-outline-secondary'}`}
            onClick={() => handleTabClick('ticket-history')}
          >
            Riwayat Tiket
          </button>
        </div>

        {/* Tab Content */}
        <div
          id="active-tickets"
          className="mt-4"
          style={{ display: activeTab === 'active-tickets' ? 'block' : 'none' }}
        >
          <h5 className="text-danger">Tiket Aktif</h5>
          {/* Tickets Section */}
          <div id="ticket-container" className="mt-4 px-3">
            {/* Ticket 1 */}
            <div className="ticket-card d-flex mb-3">
              <div className="bg-danger text-light p-3 rounded-start">
                <h5>Your Name</h5>
                <p>Bioskop: Pakuwon Mall Jogja XXI</p>
                <p>Studio 5</p>
                <p>Jumat, 15 Nov 2024</p>
                <p>Jam: 21:15</p>
              </div>
              <div className="bg-light text-dark p-3 rounded-end w-100">
                <p>Jumlah Tiket: 4 Orang</p>
                <p>Seats: D3, D4, D5, D6</p>
                <p>Kode Transaksi: <span className="fw-bold">230191</span></p>
                <p>
                  Kode QR: <img src="https://via.placeholder.com/40" alt="QR" />
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Ticket History */}
        <div
          id="ticket-history"
          className="mt-4"
          style={{ display: activeTab === 'ticket-history' ? 'block' : 'none' }}
        >
          <h5 className="text-secondary">Riwayat Tiket</h5>
          <div className="card mb-3">
            <div className="card-body dark">
              <div className="border-bottom mb-3">
                <h4 className="card-title">Spider-Man: No Way Home</h4>
              </div>
              <div>
                <p className="card-text m-1">Tanggal: 1 Desember 2024</p>
                <p className="card-text m-1">Lokasi: XXI Pondok Indah</p>
                <p className="card-text m-1">Jam Tayang : 20.24</p>
                <p className="card-text m-1">Jumlah Tiket : 1 Kursi</p>
                <p className="card-text m-1">Transaksi : <span className="success-text">Berhasil</span></p>
              </div>
            </div>
          </div>
          <div className="card mb-3">
            <div className="card-body dark">
              <div className="border-bottom mb-3">
                <h4 className="card-title">The Batman</h4>
              </div>
              <p className="card-text m-1">Tanggal: 20 November 2024</p>
              <p className="card-text m-1">Lokasi: CGV Bandung</p>
              <p className="card-text m-1">Jam Tayang : 19.35</p>
              <p className="card-text m-1">Jumlah Tiket : 2 Kursi</p>
              <p className="card-text m-1">Transaksi : <span className="failed-text">Dibatalkan</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
