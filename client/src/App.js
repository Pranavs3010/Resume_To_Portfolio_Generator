// client/src/App.js

import React, { useState } from "react";
import FileUpload from "./components/FileUpload";
import Portfolio from "./components/Portfolio";
import "./App.css"; // We will keep the main CSS file

function App() {
  // State to hold the data extracted from the resume
  const [portfolioData, setPortfolioData] = useState(null);

  // This function is called by FileUpload when data is successfully fetched
  const handleDataReceived = (data) => {
    setPortfolioData(data);
  };

  return (
    <div className="App">
      {/* --- THIS IS THE KEY CHANGE --- */}
      {/* We now check if portfolioData exists. If it DOESN'T, we show the FileUpload page. */}
      {/* If it DOES, we show the Portfolio page. */}

      {!portfolioData ? (
        // --- UPLOAD PAGE ---
        // The header and the FileUpload component are shown together
        <>
          <header className="App-header">
            <h1>AI Portfolio Generator</h1>
            <p>Create a professional portfolio from your resume in seconds.</p>
          </header>
          <main>
            <FileUpload onDataReceived={handleDataReceived} />
          </main>
        </>
      ) : (
        // --- PORTFOLIO PAGE ---
        // We ONLY render the Portfolio component, with no extra header.
        <Portfolio data={portfolioData} />
      )}
    </div>
  );
}

export default App;
