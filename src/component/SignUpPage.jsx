import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./SignUp.css"; // Import the CSS file

const SignUpPage = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const validateForm = () => {
        let isValid = true;
        const errors = {};

        // Name validation
        if (!name) {
            isValid = false;
            errors.name = "Name is required";
        }

        // Email validation
        if (!email) {
            isValid = false;
            errors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            isValid = false;
            errors.email = "Email is invalid";
        }

        // Password validation
        if (!password) {
            isValid = false;
            errors.password = "Password is required";
        } else if (password.length < 6) {
            isValid = false;
            errors.password = "Password must be at least 6 characters long";
        }

        // Confirm password validation
        if (!confirmPassword) {
            isValid = false;
            errors.confirmPassword = "Confirm Password is required";
        } else if (confirmPassword !== password) {
            isValid = false;
            errors.confirmPassword = "Passwords do not match";
        }

        setErrors(errors);
        return isValid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            const userData = {
                name: name,
                email: email,
                password: password,
            };

            axios
                .post("https://moengage-two.vercel.app/api/v1/users/register", userData)
                .then((response) => {
                    console.log("Signup successful!");
                    navigate("/");
                    console.log(response.data); // You may log the response or perform other actions as needed
                })
                .catch((error) => {
                    console.error("Error signing up:", error);
                });
        }
    };

    return (
        <div className="signup-container" style={{ paddingTop: "5rem", height: 'auto' }}>
            <form className="signup-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>
                        Name:<span className="mandatory">*</span>
                    </label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    {errors.name && <span className="error">{errors.name}</span>}
                </div>

                <div className="form-group">
                    <label>
                        Email:<span className="mandatory">*</span>
                    </label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.email && <span className="error">{errors.email}</span>}
                </div>

                <div className="form-group">
                    <label>
                        Password:<span className="mandatory">*</span>
                    </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {errors.password && (
                        <span className="error">{errors.password}</span>
                    )}
                </div>

                <div className="form-group">
                    <label>
                        Confirm Password:<span className="mandatory">*</span>
                    </label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    {errors.confirmPassword && (
                        <span className="error">{errors.confirmPassword}</span>
                    )}
                </div>

                <button className="submit" type="submit">
                    Sign Up
                </button>
                <p className="signin-message">
                    Already signed up? <Link to="/">Log in here</Link>
                </p>
            </form>
        </div>
    );
};

export default SignUpPage;
