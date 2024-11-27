import React, { useState } from "react";
import axios from "axios";

const CodeValidator = () => {
  const [code, setCode] = useState(""); 
  const [language, setLanguage] = useState("python"); 
  const [analysis, setAnalysis] = useState(null);
  const [error, setError] = useState(""); 

  const handleValidate = async () => {
    setError(""); 
    setAnalysis(null); 

    if (!code) {
      setError("Code is required.");
      return;
    }

    try {

      const response = await axios.post("http://127.0.0.1:8000/api/analyse", {
        code,
        language, 
      });

      setAnalysis(response.data);
    } catch (err) {
    
      setError(err.response?.data?.error || "An unexpected error occurred.");
    }
  };

  return (
    <div style={{ margin: "20px" }}>
      <h1>Code Validator</h1>

      <textarea
        rows="10"
        cols="50"
        placeholder="Write your code here..."
        value={code}
        onChange={(e) => setCode(e.target.value)}
      ></textarea>
      <br />

      <label htmlFor="language">Select Language: </label>
      <select
        id="language"
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        style={{ marginTop: "10px" }}
      >
        <option value="python">Python</option>
        <option value="javascript">JavaScript</option>
        <option value="cpp">C++</option>
        <option value="java">Java</option>
        <option value="ruby">Ruby</option>
      </select>
      <br />

      <button onClick={handleValidate} style={{ marginTop: "10px" }}>
        Validate Code
      </button>

      <div style={{ marginTop: "20px" }}>
        {error && <p style={{ color: "red" }}>Error: {error}</p>}

        {analysis && (
          <div>
            <h2>Analysis Result</h2>
            <p>
              <strong>Result:</strong> {analysis.result || "N/A"}
            </p>
            <p>
              <strong>Status:</strong> {analysis.status || "N/A"}
            </p>
            <p>
              <strong>Error:</strong> {analysis.error || "None"}
            </p>
            <p>
              <strong>Coordinates:</strong>{" "}
              {analysis.coordinates ? `(${analysis.coordinates[0]}, ${analysis.coordinates[1]})` : "N/A"}
            </p>
            <p>
              <strong>Solution:</strong> {analysis.solution || "None"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CodeValidator;
