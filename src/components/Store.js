import React from "react";
import  '../styles/Store.css'

export default function Store() {
  return (
    <div className="link-container">
      <button className="app-link">
        <img src="/App_Store.svg" alt="App Store" className="playstore-icon" />
      </button>
      <button className="play-link">
        <img src="/playstore1.png" alt="Play Store" className="playstore-icon" />
      </button>
    </div>
  );
}

