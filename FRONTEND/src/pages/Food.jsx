import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import '../styles/food.css'

function Food() {
  const navigate = useNavigate()

  const goToProfile = () => {
    navigate('/profile', {
      state: { from: '/food'}
    })
  }

  useEffect(() => {
    const initializeCarousel = (carouselId) => {
      let carouselElement = document.querySelector(carouselId);
      if (window.matchMedia("(min-width: 768px)").matches) {
        let carouselWidth = carouselElement.querySelector(".carousel-inner").scrollWidth;
        let cardWidth = carouselElement.querySelector(".carousel-item").offsetWidth;
        let scrollPosition = 0;

        carouselElement.querySelector(".carousel-control-next").addEventListener("click", function () {
          if (scrollPosition < carouselWidth - cardWidth * 4) {
            scrollPosition += cardWidth;
            carouselElement.querySelector(".carousel-inner").scroll({ left: scrollPosition, behavior: 'smooth' });
          }
        });

        carouselElement.querySelector(".carousel-control-prev").addEventListener("click", function () {
          if (scrollPosition > 0) {
            scrollPosition -= cardWidth;
            carouselElement.querySelector(".carousel-inner").scroll({ left: scrollPosition, behavior: 'smooth' });
          }
        });
      } else {
        carouselElement.classList.add("slide");
      }
    };

    initializeCarousel("#carouselMakanan");
    initializeCarousel("#carouselMinuman");
  }, []);
  
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
    {/* Sidebar */}
    <div className={`sidebar ${isSidebarActive ? "active" : ""}`} id="sidebar">
          <a  href="/" onClick={() => handleNavigation("movie")}>
            <i className="fas fa-film pe-2"></i>Movie
          </a>
          <a href="/trending" onClick={() => handleNavigation("trending")}>
            <i className="fas fa-fire pe-2"></i>Trending
          </a>
          <a className="active" href="/food" onClick={() => handleNavigation("food")}>
            <i className="fas fa-utensils pe-2"></i>Food
          </a>
        </div>
    <div className="flex-grow-1 overflow-hidden">
      <div className="main-content mb-5 ">
        <div className="food d-flex mb-3">
          <span><i className="fas fa-solid fa-burger ms-3" /></span>
          <h4 className="ms-2">Daftar Makanan</h4>
        </div>
        <div className="line mb-4" />
        <h4 className="ms-3 mb-3 makan">Makanan</h4>
        {/* MAKANAN */}
        <div className="makanan">
          <div className="custom-bootstrap">
            
          </div>
          <div id="carouselMakanan" className="carousel">
            <div className="carousel-inner d-flex">
              <div className="carousel-item active">
                <div className="card">
                  <div className="img-wrapper">
                    <img src="/images/coca-cola.png" alt />
                  </div>
                  <div className="card-body d-flex bg-danger">
                    <div className="keterangan mx-auto">
                      <h5 className="card-title">Coca-cola</h5>
                      <p className="card-text">Rp.80,000</p>
                    </div>
                    <div className="button align-self-center mx-auto">
                      <a href="#" className="btn">Beli</a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="carousel-item">
                <div className="card ms-4">
                  <div className="img-wrapper">
                    <img src="/images/popcorn.png" alt />
                  </div>
                  <div className="card-body d-flex bg-danger">
                    <div className="keterangan mx-auto">
                      <h5 className="card-title">Popcorn</h5>
                      <p className="card-text">Rp.80,000</p>
                    </div>
                    <div className="button align-self-center mx-auto">
                      <a href="#" className="btn">Beli</a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="carousel-item">
                <div className="card ms-4">
                  <div className="img-wrapper">
                    <img src="/images/popcorn.png" alt />
                  </div>
                  <div className="card-body d-flex bg-danger">
                    <div className="keterangan mx-auto">
                      <h5 className="card-title">Popcorn</h5>
                      <p className="card-text">Rp.80,000</p>
                    </div>
                    <div className="button align-self-center mx-auto">
                      <a href="#" className="btn">Beli</a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="carousel-item">
                <div className="card ms-4">
                  <div className="img-wrapper">
                    <img src="/images/popcorn.png" alt />
                  </div>
                  <div className="card-body d-flex bg-danger">
                    <div className="keterangan mx-auto">
                      <h5 className="card-title">Popcorn</h5>
                      <p className="card-text">Rp.80,000</p>
                    </div>
                    <div className="button align-self-center mx-auto">
                      <a href="#" className="btn">Beli</a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="carousel-item">
                <div className="card ms-4">
                  <div className="img-wrapper">
                    <img src="/images/popcorn.png" alt />
                  </div>
                  <div className="card-body d-flex bg-danger">
                    <div className="keterangan mx-auto">
                      <h5 className="card-title">Popcorn</h5>
                      <p className="card-text">Rp.80,000</p>
                    </div>
                    <div className="button align-self-center mx-auto">
                      <a href="#" className="btn">Beli</a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="carousel-item">
                <div className="card ms-4">
                  <div className="img-wrapper">
                    <img src="/images/popcorn.png" alt />
                  </div>
                  <div className="card-body d-flex bg-danger">
                    <div className="keterangan mx-auto">
                      <h5 className="card-title">Popcorn</h5>
                      <p className="card-text">Rp.80,000</p>
                    </div>
                    <div className="button align-self-center mx-auto">
                      <a href="#" className="btn">Beli</a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="carousel-item">
                <div className="card ms-4">
                  <div className="img-wrapper">
                    <img src="/images/popcorn.png" alt />
                  </div>
                  <div className="card-body d-flex bg-danger">
                    <div className="keterangan mx-auto">
                      <h5 className="card-title">Popcorn</h5>
                      <p className="card-text">Rp.80,000</p>
                    </div>
                    <div className="button align-self-center mx-auto">
                      <a href="#" className="btn">Beli</a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="carousel-item">
                <div className="card ms-4">
                  <div className="img-wrapper">
                    <img src="/images/popcorn.png" alt />
                  </div>
                  <div className="card-body d-flex bg-danger">
                    <div className="keterangan mx-auto">
                      <h5 className="card-title">Popcorn</h5>
                      <p className="card-text">Rp.80,000</p>
                    </div>
                    <div className="button align-self-center mx-auto">
                      <a href="#" className="btn">Beli</a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="carousel-item">
                <div className="card ms-4">
                  <div className="img-wrapper">
                    <img src="/images/popcorn.png" alt />
                  </div>
                  <div className="card-body d-flex bg-danger">
                    <div className="keterangan mx-auto">
                      <h5 className="card-title">Popcorn Last</h5>
                      <p className="card-text">Rp.80,000</p>
                    </div>
                    <div className="button align-self-center mx-auto">
                      <a href="#" className="btn">Beli</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselMakanan" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true" />
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselMakanan" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true" />
              <span className="visually-hidden">Next</span>
            </button>           
          </div>
        </div>
        {/* MINUMAN */}
        <h4 className="ms-3 my-3 makan">Minuman</h4>
        <div className="makanan">
          <div id="carouselMinuman" className="carousel">
            <div className="carousel-inner d-flex">
              <div className="carousel-item active">
                <div className="card">
                  <div className="img-wrapper">
                    <img src="/images/coca-cola.png" alt />
                  </div>
                  <div className="card-body d-flex bg-danger">
                    <div className="keterangan mx-auto">
                      <h5 className="card-title">Coca-cola</h5>
                      <p className="card-text">Rp.80,000</p>
                    </div>
                    <div className="button align-self-center mx-auto">
                      <a href="#" className="btn">Beli</a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="carousel-item">
                <div className="card ms-4">
                  <div className="img-wrapper">
                    <img src="/images/popcorn.png" alt />
                  </div>
                  <div className="card-body d-flex bg-danger">
                    <div className="keterangan mx-auto">
                      <h5 className="card-title">Popcorn</h5>
                      <p className="card-text">Rp.80,000</p>
                    </div>
                    <div className="button align-self-center mx-auto">
                      <a href="#" className="btn">Beli</a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="carousel-item">
                <div className="card ms-4">
                  <div className="img-wrapper">
                    <img src="/images/popcorn.png" alt />
                  </div>
                  <div className="card-body d-flex bg-danger">
                    <div className="keterangan mx-auto">
                      <h5 className="card-title">Popcorn</h5>
                      <p className="card-text">Rp.80,000</p>
                    </div>
                    <div className="button align-self-center mx-auto">
                      <a href="#" className="btn">Beli</a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="carousel-item">
                <div className="card ms-4">
                  <div className="img-wrapper">
                    <img src="/images/popcorn.png" alt />
                  </div>
                  <div className="card-body d-flex bg-danger">
                    <div className="keterangan mx-auto">
                      <h5 className="card-title">Popcorn</h5>
                      <p className="card-text">Rp.80,000</p>
                    </div>
                    <div className="button align-self-center mx-auto">
                      <a href="#" className="btn">Beli</a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="carousel-item">
                <div className="card ms-4">
                  <div className="img-wrapper">
                    <img src="/images/popcorn.png" alt />
                  </div>
                  <div className="card-body d-flex bg-danger">
                    <div className="keterangan mx-auto">
                      <h5 className="card-title">Popcorn</h5>
                      <p className="card-text">Rp.80,000</p>
                    </div>
                    <div className="button align-self-center mx-auto">
                      <a href="#" className="btn">Beli</a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="carousel-item">
                <div className="card ms-4">
                  <div className="img-wrapper">
                    <img src="/images/popcorn.png" alt />
                  </div>
                  <div className="card-body d-flex bg-danger">
                    <div className="keterangan mx-auto">
                      <h5 className="card-title">Popcorn</h5>
                      <p className="card-text">Rp.80,000</p>
                    </div>
                    <div className="button align-self-center mx-auto">
                      <a href="#" className="btn">Beli</a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="carousel-item">
                <div className="card ms-4">
                  <div className="img-wrapper">
                    <img src="/images/popcorn.png" alt />
                  </div>
                  <div className="card-body d-flex bg-danger">
                    <div className="keterangan mx-auto">
                      <h5 className="card-title">Popcorn</h5>
                      <p className="card-text">Rp.80,000</p>
                    </div>
                    <div className="button align-self-center mx-auto">
                      <a href="#" className="btn">Beli</a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="carousel-item">
                <div className="card ms-4">
                  <div className="img-wrapper">
                    <img src="/images/popcorn.png" alt />
                  </div>
                  <div className="card-body d-flex bg-danger">
                    <div className="keterangan mx-auto">
                      <h5 className="card-title">Popcorn</h5>
                      <p className="card-text">Rp.80,000</p>
                    </div>
                    <div className="button align-self-center mx-auto">
                      <a href="#" className="btn">Beli</a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="carousel-item">
                <div className="card ms-4">
                  <div className="img-wrapper">
                    <img src="/images/popcorn.png" alt />
                  </div>
                  <div className="card-body d-flex bg-danger">
                    <div className="keterangan mx-auto">
                      <h5 className="card-title">Popcorn Last</h5>
                      <p className="card-text">Rp.80,000</p>
                    </div>
                    <div className="button align-self-center mx-auto">
                      <a href="#" className="btn">Beli</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselMinuman" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true" />
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselMinuman" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true" />
              <span className="visually-hidden">Next</span>
            </button>           
          </div>
        </div>
      </div>
    </div>
  </div>

</div>
  )
}
  

export default Food;