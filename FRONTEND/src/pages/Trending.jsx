import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import '../styles/trending.css'

function Trending() {
  const navigate = useNavigate()

  const goToProfile = () => {
    navigate('/profile', {
      state: { from: '/trending'}
    })
  }

  // State untuk mengontrol sidebar
      const [isSidebarActive, setIsSidebarActive] = useState(false);
    
      // Fungsi untuk toggle sidebar
      const toggleSidebar = () => {
        setIsSidebarActive(!isSidebarActive);
      };
    
      // Fungsi untuk navigasi
      const handleNavigation = (section) => {
        window.location.href = `#${section}`;
      }
    ;
  
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
  <div className={`sidebar ${isSidebarActive ? "active" : ""}`} id="sidebar">
          <a  href="/" onClick={() => handleNavigation("movie")}>
            <i className="fas fa-film pe-2"></i>Movie
          </a>
          <a className="active" href="/trending" onClick={() => handleNavigation("trending")}>
            <i className="fas fa-fire pe-2"></i>Trending
          </a>
          <a href="/food" onClick={() => handleNavigation("food")}>
            <i className="fas fa-utensils pe-2"></i>Food
          </a>
  </div>
    <div className="flex-grow-1">
      <div className="main-content">
        <div className="trending d-flex">
          <span><i className="fas fa-solid fa-fire ms-3" /></span>
          <h4 className="ms-2">Trending</h4>
        </div>
        <div className="category d-flex ms-5 mb-3">
          <div className="global me-3">
            <a className="text-decoration-none text-reset" href><h5>Global</h5></a>
            <div className="line-category">
            </div>
          </div>
          <div className="local">
            <a className="text-decoration-none text-reset" href><h5>Local</h5></a>
          </div>
        </div>
        <div className="line mb-4" />
        <div className="gallery-image">
          <div className="gallery d-flex mb-3">
            <div className="nomer align-self-center fs-1">1.</div>
            <img className="ms-2" src="/images/minion.jpg" alt />
            <div className="keterangan ms-3">
              <h3>Minion</h3>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas minus hic similique vel eveniet saepe natus blanditiis illum fuga excepturi.</p>
              <div className="rating-film d-flex">
                <span>5</span>
                <div className="star px-3 text-warning">
                  <span><i className="fas fa-solid fa-star" /></span>
                  <span><i className="fas fa-solid fa-star" /></span>
                  <span><i className="fas fa-solid fa-star" /></span>
                  <span><i className="fas fa-solid fa-star" /></span>
                  <span><i className="fas fa-solid fa-star" /></span>
                </div>
                <span>1 Votes</span>
              </div>
            </div>
          </div>
          <div className="gallery d-flex mb-3">
            <div className="nomer align-self-center fs-1">2.</div>
            <img className="ms-2" src="/images/minion.jpg" alt />
            <div className="keterangan ms-3">
              <h3>Minion</h3>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas minus hic similique vel eveniet saepe natus blanditiis illum fuga excepturi.</p>
              <div className="rating-film d-flex">
                <span>5</span>
                <div className="star px-3 text-warning">
                  <span><i className="fas fa-solid fa-star" /></span>
                  <span><i className="fas fa-solid fa-star" /></span>
                  <span><i className="fas fa-solid fa-star" /></span>
                  <span><i className="fas fa-solid fa-star" /></span>
                  <span><i className="fas fa-solid fa-star" /></span>
                </div>
                <span>1 Votes</span>
              </div>
            </div>
          </div>
          <div className="gallery d-flex mb-3">
            <div className="nomer align-self-center fs-1">3.</div>
            <img className="ms-2" src="/images/minion.jpg" alt />
            <div className="keterangan ms-3">
              <h3>Minion</h3>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas minus hic similique vel eveniet saepe natus blanditiis illum fuga excepturi.</p>
              <div className="rating-film d-flex">
                <span>5</span>
                <div className="star px-3 text-warning">
                  <span><i className="fas fa-solid fa-star" /></span>
                  <span><i className="fas fa-solid fa-star" /></span>
                  <span><i className="fas fa-solid fa-star" /></span>
                  <span><i className="fas fa-solid fa-star" /></span>
                  <span><i className="fas fa-solid fa-star" /></span>
                </div>
                <span>1 Votes</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

  )
}

export default Trending