import React, { useState } from 'react';
import axios from 'axios';

const Compiler = () => {
    const [sourceCode, setSourceCode] = useState('');
    const [languageId, setLanguageId] = useState(54); 
    const [stdin, setStdin] = useState('');
    const [output, setOutput] = useState('');

    const handleCompile = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/compile', {
                source_code: sourceCode,
                language_id: languageId,
                stdin: stdin,
            });
            setOutput(response.data.stdout || response.data.stderr || 'No output');
        } catch (error) {
            console.error(error);
            setOutput('Error occurred while compiling code.');
        }
    };

    return (
        <div>
            <h1>Online Code Compiler</h1>
            <textarea
                rows="10"
                cols="50"
                placeholder="Write your code here..."
                value={sourceCode}
                onChange={(e) => setSourceCode(e.target.value)}
            ></textarea>
            <br />
            <select value={languageId} onChange={(e) => setLanguageId(Number(e.target.value))}>
                <option value={54}>C++</option>
                <option value={71}>Python 3</option>
                <option value={62}>Java</option>
                {/* Add more languages as needed */}
            </select>
            <br />
            <textarea
                rows="5"
                cols="50"
                placeholder="Input data (stdin)"
                value={stdin}
                onChange={(e) => setStdin(e.target.value)}
            ></textarea>
            <br />
            <button onClick={handleCompile}>Compile and Run</button>
            <h2>Output:</h2>
            <pre>{output}</pre>
        </div>
    );
};

export default Compiler;
