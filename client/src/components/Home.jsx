import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import stockGif from '../assets/stock.gif';
import powerButtonGif from '../assets/power-button.gif';
import digitalCollaborationGif from '../assets/digital-collaboration.gif';

function Home() {
  return (
    <div className="home">
      {/* Main Heading */}
      <div className="home-heading">
        <h1>Welcome to Circuit-Surge!</h1>
      </div>

      {/* First Section */}
      <div className="section">
        <img src={stockGif} alt="Inventory Icon" className="image-left" />
        <div className="text-content">
          <p>
            Welcome to Circuit Surge, your go-to platform for seamless electronic inventory
            management! Designed with small businesses and tech enthusiasts in mind, Circuit Surge
            simplifies managing electronic components, helping you stay organized while saving time.
            Whether you’re working on your next big project or maintaining your inventory for daily
            operations, our system offers the perfect tools for success.
          </p>
        </div>
      </div>

      <hr />

      {/* Second Section */}
      <div className="section">
        <div>
          <h2>Empower Your Electronic Projects</h2>
          <p>
            Say goodbye to scattered spreadsheets and disorganized shelves. Circuit Surge empowers
            users to effortlessly add, track, update, and delete electronic components with just a
            few clicks. With an intuitive interface and robust functionality, our platform ensures
            you can focus more on innovation and less on managing inventory.
          </p>
        </div>
        <img src={powerButtonGif} alt="Electronics Icon" className="image-right" />
      </div>

      <hr />

      {/* Third Section */}
      <div className="section">
        <img src={digitalCollaborationGif} alt="Join Us Icon" className="image-left" />
        <div>
          <h2>Join the Surge</h2>
          <p>
            Discover how Circuit Surge can transform your inventory management process. Whether
            you’re a small business owner or a DIY tech enthusiast, Circuit Surge is here to
            simplify your work and support your creativity. Sign up today and take the first step
            toward smarter inventory management!
          </p>
        </div>
      </div>

      {/* Buttons */}
      <div className="button-container">
        <Link to="/register" className="btn">
          Register
        </Link>
      </div>

      {/* Footer */}
      <div>
        <footer>
          References:
          <p>
            Inventory Icon: <a href="https://www.flaticon.com/free-animated-icons/inventory" title="inventory animated icons">Inventory animated icons created by Freepik - Flaticon</a><br />
            Electronics Icon: <a href="https://www.flaticon.com/free-animated-icons/technology" title="technology animated icons">Technology animated icons created by Freepik - Flaticon</a><br />
            Join Us Icon: <a href="https://www.flaticon.com/free-animated-icons/technology" title="technology animated icons">Technology animated icons created by Freepik - Flaticon</a>
          </p>
        </footer>
      </div>
    </div>
  );
}

export default Home;