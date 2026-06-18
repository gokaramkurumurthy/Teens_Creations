import React, { useState, useEffect } from 'react';
import './App.css';
import ContactForm from './components/ContactForm';

function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [visibleElements, setVisibleElements] = useState(new Set());

  const heroSlides = [
    {
      title: "CINEMATIC EXCELLENCE",
      subtitle: "Creating award-winning feature films and documentaries that captivate global audiences worldwide",
      image: "https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop",
      cta: "Explore Films"
    },
    {
      title: "DIGITAL STORYTELLING",
      subtitle: "Producing cutting-edge web series and television content for streaming platforms and digital media",
      image: "https://images.pexels.com/photos/3062541/pexels-photo-3062541.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop",
      cta: "View Series"
    },
    {
      title: "SPECTACULAR EVENTS",
      subtitle: "Orchestrating unforgettable celebrity shows, award ceremonies, and premium entertainment experiences",
      image: "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop",
      cta: "Our Events"
    },
    {
      title: "STAR MANAGEMENT",
      subtitle: "Comprehensive talent management and celebrity promotion services for entertainment industry",
      image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop",
      cta: "Meet Talent"
    }
  ];

  const services = [
    {
      icon: "🎬",
      title: "Film Production",
      description: "Complete film production services from concept to distribution, including feature films, short films, and documentaries with international standards.",
      features: ["Pre-production Planning", "Cinematography", "Post-production", "Distribution"]
    },
    {
      icon: "📺",
      title: "Television & Digital",
      description: "Creating engaging television serials, web series, and reality shows for diverse platforms and streaming services worldwide.",
      features: ["TV Serials", "Web Series", "Reality Shows", "Digital Content"]
    },
    {
      icon: "🎭",
      title: "Talent Management",
      description: "Comprehensive casting, artist promotion, celebrity management, and talent development services for the entertainment industry.",
      features: ["Casting Services", "Artist Promotion", "Celebrity Management", "Talent Development"]
    },
    {
      icon: "🎪",
      title: "Event Management",
      description: "Organizing premium film events, award functions, music launches, cultural programs, and brand promotions with excellence.",
      features: ["Award Functions", "Music Launches", "Cultural Programs", "Brand Promotions"]
    },
    {
      icon: "📢",
      title: "Marketing & Publicity",
      description: "Strategic marketing, publicity campaigns, and promotional services for movies, serials, and entertainment events.",
      features: ["Digital Marketing", "PR Campaigns", "Social Media", "Brand Strategy"]
    },
    {
      icon: "💰",
      title: "Financing & Distribution",
      description: "Film financing solutions and comprehensive distribution strategies across multiple platforms and international markets.",
      features: ["Film Financing", "Distribution", "International Sales", "Revenue Optimization"]
    }
  ];

  const portfolioItems = [
    {
      title: "Award-Winning Features",
      category: "Feature Films",
      image: "https://images.pexels.com/photos/3062541/pexels-photo-3062541.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      description: "Critically acclaimed cinema"
    },
    {
      title: "Celebrity Galas",
      category: "Events",
      image: "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      description: "Luxury entertainment experiences"
    },
    {
      title: "Streaming Hits",
      category: "Web Series",
      image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      description: "Binge-worthy digital content"
    },
    {
      title: "Reality Productions",
      category: "Television",
      image: "https://images.pexels.com/photos/2608517/pexels-photo-2608517.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      description: "Engaging reality shows"
    },
    {
      title: "Documentary Excellence",
      category: "Documentaries",
      image: "https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      description: "Impactful storytelling"
    },
    {
      title: "Music Spectaculars",
      category: "Music Events",
      image: "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      description: "Unforgettable musical experiences"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Intersection Observer for scroll animations
      const elements = document.querySelectorAll('.animate-on-scroll');
      elements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight * 0.8 && rect.bottom > 0;
        
        if (isVisible && !visibleElements.has(element)) {
          setVisibleElements(prev => new Set([...prev, element]));
          element.classList.add('animate-in');
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state
    return () => window.removeEventListener('scroll', handleScroll);
  }, [visibleElements]);

  return (
    <div className="app">
      {/* Navigation */}
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <div className="nav-logo">
            <div className="logo-icon">🎬</div>
            <div className="logo-text">
              <h2>Teens Creations</h2>
              {/* <span>Entertainment</span> */}
            </div>
          </div>
          <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
            <a href="#home" className="nav-link">Home</a>
            <a href="#about" className="nav-link">About</a>
            <a href="#services" className="nav-link">Services</a>
            <a href="#portfolio" className="nav-link">Portfolio</a>
            <a href="#contact" className="nav-link">Contact</a>
          </div>
          <div className="nav-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-slider">
          {heroSlides.map((slide, index) => (
            <div
              key={index}
              className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="hero-overlay"></div>
              <div className="hero-content">
                <div className="hero-badge animate-fade-in">
                  <span className="badge-icon">🎬</span>
                  PREMIUM PRODUCTIONS
                </div>
                <h1 className="hero-title animate-slide-up">
                  <span className="title-main">{slide.title}</span>
                  <div className="title-underline"></div>
                </h1>
                <p className="hero-subtitle animate-slide-up-delay">{slide.subtitle}</p>
                <div className="hero-buttons animate-fade-in-delay">
                  <button className="cta-button primary">{slide.cta}</button>
                  <button className="cta-button secondary">
                    <span className="play-icon">▶</span>
                    Watch Reel
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="hero-indicators">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
            ></button>
          ))}
        </div>
        <div className="scroll-indicator">
          <div className="scroll-arrow"></div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section animate-on-scroll">
        <div className="container">
          {/* <div className="stats-grid">
            <div className="stat-item animate-on-scroll">
              <div className="stat-number">150+</div>
              <div className="stat-label">Projects Delivered</div>
            </div>
            <div className="stat-item animate-on-scroll">
              <div className="stat-number">500+</div>
              <div className="stat-label">Artists Managed</div>
            </div>
            <div className="stat-item animate-on-scroll">
              <div className="stat-number">50+</div>
              <div className="stat-label">Awards Won</div>
            </div>
            <div className="stat-item animate-on-scroll">
              <div className="stat-number">25+</div>
              <div className="stat-label">Years Experience</div>
            </div>
          </div> */}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about">
        <div className="container">
          <div className="about-content animate-on-scroll">
            <div className="about-text animate-on-scroll">
              <div className="section-badge">About Us</div>
              <h2 className="section-title">
                <span className="title-highlight">Crafting</span> Entertainment Excellence
              </h2>
              <p className="lead">
                We are a premier production house dedicated to creating exceptional 
                audio-visual content that captivates audiences worldwide and sets new 
                industry standards.
              </p>
              <p>
                Our expertise spans across feature films, documentaries, television serials, 
                web series, reality shows, and comprehensive event management. We combine 
                creative storytelling with cutting-edge technology to deliver productions 
                that resonate with global audiences.
              </p>
              <div className="about-features">
                <div className="feature-item">
                  <div className="feature-icon">🏆</div>
                  <div className="feature-text">
                    <h4>Award-Winning</h4>
                    <p>Recognized excellence in entertainment</p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">🌍</div>
                  <div className="feature-text">
                    <h4>Global Reach</h4>
                    <p>International distribution network</p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">🎯</div>
                  <div className="feature-text">
                    <h4>Premium Quality</h4>
                    <p>Uncompromising production standards</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="about-image animate-on-scroll">
              <div className="image-container">
                <img src="https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop" alt="Film Production" />
                <div className="play-overlay">
                  <div className="play-button">
                    <span>▶</span>
                  </div>
                </div>
              </div>
              <div className="floating-card">
                <div className="card-icon">🎬</div>
                <div className="card-content">
                  <h4>Latest Project</h4>
                  <p>Award-winning feature film in post-production</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="services">
        <div className="container">
          <div className="section-header animate-on-scroll">
            <div className="section-badge">Our Services</div>
            <h2 className="section-title">
              <span className="title-highlight">Complete</span> Entertainment Solutions
            </h2>
            <p className="section-subtitle">
              From concept to distribution, we provide end-to-end entertainment services
            </p>
          </div>
          <div className="services-grid">
            {services.map((service, index) => (
              <div key={index} className="service-card animate-on-scroll">
                <div className="service-header">
                  <div className="service-icon">{service.icon}</div>
                  <h3>{service.title}</h3>
                </div>
                <p className="service-description">{service.description}</p>
                <ul className="service-features">
                  {service.features.map((feature, idx) => (
                    <li key={idx}>
                      <span className="check-icon">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="service-footer">
                  <button className="service-btn">Learn More</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="portfolio">
        <div className="container">
          <div className="section-header animate-on-scroll">
            <div className="section-badge">Our Work</div>
            <h2 className="section-title">
              <span className="title-highlight">Portfolio</span> Showcase
            </h2>
            <p className="section-subtitle">
              Discover our award-winning productions and memorable events
            </p>
          </div>
          <div className="portfolio-grid">
            {portfolioItems.map((item, index) => (
              <div key={index} className="portfolio-item animate-on-scroll">
                <div className="portfolio-image">
                  <img src={item.image} alt={item.title} />
                  <div className="portfolio-overlay">
                    <div className="portfolio-content">
                      <div className="portfolio-category">{item.category}</div>
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                      <button className="portfolio-btn">View Details</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <div className="container">
          <div className="contact-content animate-on-scroll">
            <div className="contact-info animate-on-scroll">
              <div className="section-badge">Get In Touch</div>
              <h2 className="section-title">
                Let's Create Something <span className="title-highlight">Extraordinary</span>
              </h2>
              <p className="contact-description">
                Ready to bring your vision to life? Our team of creative professionals 
                is here to turn your ideas into captivating entertainment experiences.
              </p>
              <div className="contact-details">
                <div className="contact-item">
                  <div className="contact-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.89 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                    </svg>
                  </div>
                  <div className="contact-text">
                    <h4>Email Us</h4>
                    <p>info@teenscreations.com</p>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="contact-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                    </svg>
                  </div>
                  <div className="contact-text">
                    <h4>Call Us</h4>
                    <p>8125544545</p>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="contact-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                  </div>
                  <div className="contact-text">
                    <h4>Visit Us</h4>
                    <p>Madapur, Hyderabad, India</p>
                  </div>
                </div>
              </div>
              <div className="social-links">
                {/* <a href="https://facebook.com/teenscreations" target="_blank" rel="noopener noreferrer" className="social-link facebook">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a> */}
                <a href="https://www.instagram.com/teensss_creations/" target="_blank" rel="noopener noreferrer" className="social-link instagram">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a href="https://x.com/TeensT76472" target="_blank" rel="noopener noreferrer" className="social-link twitter">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                {/* <a href="https://youtube.com/teenscreations" target="_blank" rel="noopener noreferrer" className="social-link youtube">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a> */}
                <a href="https://www.linkedin.com/in/teensss-creations-0883593a5/" target="_blank" rel="noopener noreferrer" className="social-link linkedin">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>
            <div className="contact-form-container animate-on-scroll">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <div className="footer-logo">
                <div className="logo-icon">🎬</div>
                <div className="logo-text">
                  <h3>Teens Creations</h3>
                  <span>Productions</span>
                </div>
              </div>
              <p>Creating exceptional entertainment experiences that captivate global audiences and set new industry standards.</p>
            </div>
            <div className="footer-section">
              <h4>Services</h4>
              <ul>
                <li>Film Production</li>
                <li>Television & Digital</li>
                <li>Event Management</li>
                <li>Talent Management</li>
                <li>Marketing & Publicity</li>
                <li>Financing & Distribution</li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Company</h4>
              <ul>
                <li>About Us</li>
                <li>Our Team</li>
                <li>Careers</li>
                <li>Press</li>
                <li>Awards</li>
                <li>Contact</li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Connect</h4>
              <div className="footer-social">
                {/* <a href="https://facebook.com/teenscreations" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a> */}
                <a href="https://instagram.com/teenscreations" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a href="https://twitter.com/teenscreations" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                {/* <a href="https://youtube.com/teenscreations" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a> */}
                <a href="https://linkedin.com/company/teenscreations" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
              {/* <div className="newsletter">
                <h5>Newsletter</h5>
                <div className="newsletter-form">
                  <input type="email" placeholder="Your email" />
                  <button type="submit">→</button>
                </div>
              </div> */}
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 Teens Creations Productions. All rights reserved.</p>
            <div className="footer-links">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Sitemap</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;