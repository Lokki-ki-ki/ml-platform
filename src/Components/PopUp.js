import React from "react";
import "./PopUp.css";

const PopUp = ({ showPage, onClose }) => {
    if (!showPage) {
        return null;
    }

    return (
        <div className="popup-backdrop">
            <div className="popup-content">
                <button className="popup-close-button" onClick={onClose}>x</button>
                <form className="signup-form">
                    <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" placeholder="Pick a username" />
                    </div>
                    <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input type="email" id="email" placeholder="Enter email" />
                    <small>We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" placeholder="Password" />
                    </div>
                    <div className="form-check">
                    <input type="checkbox" id="terms" />
                    <label htmlFor="terms">I agree to the Terms & Conditions</label>
                    </div>
                    <button type="submit" className="btn-signup">Sign up for Wingman</button>
                </form>
            </div>
      </div>
    );
}

export default PopUp;