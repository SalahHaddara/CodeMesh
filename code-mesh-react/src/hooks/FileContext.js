import React, {createContext, useState} from 'react';

const FileContext = createContext();

export const FileProvider = ({children}) => {
    const [files, setFiles] = useState([]);
    const [activeFile, setActiveFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
}