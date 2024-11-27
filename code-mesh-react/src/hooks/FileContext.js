import React, {createContext, useCallback, useState} from 'react';
import {requestAPI} from "../utlis/request.js";

const FileContext = createContext();

export const FileProvider = ({children}) => {
    const [files, setFiles] = useState([]);
    const [activeFile, setActiveFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchFiles = useCallback(async () => {
        setLoading(true);
        try {
            const response = await requestAPI({
                route: 'files',
                method: 'GET'
            });

            if (response.success) {
                // Transform the files into our expected format
                const formattedFiles = response.data.files.map(file => ({
                    id: file.id,
                    name: file.name,
                    language: file.language,
                    path: file.file_path
                }));
                setFiles(formattedFiles);

                // If we have files but no active file, set the first one
                if (formattedFiles.length > 0 && !activeFile) {
                    const firstFileContent = await fetchFileContent(formattedFiles[0].id);
                    setActiveFile({...formattedFiles[0], content: firstFileContent});
                }
            }
        } catch (err) {
            setError(`Failed to fetch files: ${err}`);
        } finally {
            setLoading(false);
        }
    }, [activeFile]);
}