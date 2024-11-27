import React, { useState } from "react";
import axios from "axios";

const Mailer = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSendEmail = async () => {
        if (!email) {
            setMessage("Please enter a valid email address.");
            return;
        }

        try {
            const response = await axios.post("http://127.0.0.1:8000/api/invite", {
                email: email,
            });
            setMessage(response.data.message);
        } catch (error) {
            console.error(error);
            setMessage("Failed to send the invitation. Please try again.");
        }
        
    };

    return (
        <div>
            <h1>Send Invitation</h1>
            <input
                type="email"
                placeholder="Enter the invited email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={handleSendEmail}>Send Invitation</button>
            <p>{message}</p>
        </div>
    );
};

export default Mailer;
