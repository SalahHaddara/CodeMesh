import React, { useState } from "react";
import axios from "axios";

const Mailer = () => {
    const [email, setEmail] = useState("");

    const handleSendEmail = async () => {
        
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
