import React, { useState } from "react";
import "./SignUp.css"; // Import the CSS file
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import logo from "../logo/WhatsApp Image 2023-07-12 at 9.58.35 AM.png";

const SignUpPage = () => {
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [baseAirfield, setBaseAirfield] = useState("");
    const [licenseNo, setLicenseNo] = useState("");
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

        // Address validatio
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
            //   // Form is valid, proceed with signup logic
            //   // For example, make an API call to register the user
            //   console.log("Signup successful!");
            // }
            const userData = {
                first_name: name,
                address: address,
                baseAirfield: baseAirfield,
                licenseNo: licenseNo,
                email: email,
                password: password,
            };

            axios
                .post("http://13.127.37.70:5000/api/v1/register", userData)
                .then((response) => {
                    // Handle the successful response from the API
                    console.log("Signup successful!");
                    navigate("/login");

                    console.log(response.data); /// // You may log the response or perform other actions as needed
                })
                .catch((error) => {
                    // Handle errors that occur during the API call
                    console.error("Error signing up:", error);
                });
        }
    };
    return (
        <>

            <div className="signup-container">
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

                    <button className="submit" type="submit">
                        Sign Up
                    </button>
                    <p className="signin-message">
                        Already signed up? <Link to="/">Log in here</Link>
                    </p>
                </form>
            </div>
        </>
    );
};

export default SignUpPage;