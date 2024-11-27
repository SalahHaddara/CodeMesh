import React, {createContext, useCallback, useContext, useState} from 'react';
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

    const fetchFileContent = async (fileId) => {
        try {
            const response = await requestAPI({
                route: `files/${fileId}`,
                method: 'GET'
            });

            if (response.success) {
                return response.data.content;
            }
            return '';
        } catch (err) {
            console.error(`Failed to fetch file content: ${err}`);
            return '';
        }
    };

    const createFile = async (fileName, language = 'javascript') => {
        setLoading(true);
        try {
            const response = await requestAPI({
                route: 'files',
                method: 'POST',
                body: {
                    name: fileName,
                    content: '',
                    language: language
                }
            });

            if (response.success) {
                const newFile = {
                    id: response.data.file.id,
                    name: response.data.file.name,
                    content: '',
                    language: response.data.file.language,
                    path: response.data.file.file_path
                };
                setFiles(prev => [...prev, newFile]);
                setActiveFile(newFile);
                return newFile;
            } else {
                setError(response.message);
                return null;
            }
        } catch (err) {
            setError(`Failed to create file: ${err}`);
            return null;
        } finally {
            setLoading(false);
        }
    };

    const deleteFile = async (fileId) => {
        setLoading(true);
        try {
            const response = await requestAPI({
                route: `files/${fileId}`,
                method: 'DELETE'
            });

            if (response.success) {
                setFiles(prev => prev.filter(f => f.id !== fileId));
                if (activeFile?.id === fileId) {
                    const remainingFiles = files.filter(f => f.id !== fileId);
                    if (remainingFiles.length > 0) {
                        const firstFile = remainingFiles[0];
                        const content = await fetchFileContent(firstFile.id);
                        setActiveFile({...firstFile, content});
                    } else {
                        setActiveFile(null);
                    }
                }
                return true;
            } else {
                setError(response.message);
                return false;
            }
        } catch (err) {
            setError(`Failed to delete file: ${err}`);
            return false;
        } finally {
            setLoading(false);
        }
    };

    const updateFileContent = async (fileId, content) => {
        try {
            const response = await requestAPI({
                route: `files/${fileId}`,
                method: 'PUT',
                body: {content}
            });

            if (response.success) {
                if (activeFile?.id === fileId) {
                    setActiveFile(prev => ({...prev, content}));
                }
                return true;
            } else {
                setError(response.message);
                return false;
            }
        } catch (err) {
            setError(`Failed to update file: ${err}`);
            return false;
        }
    };

    const setActiveFileWithContent = async (file) => {
        try {
            const content = await fetchFileContent(file.id);
            setActiveFile({...file, content});
        } catch (err) {
            setError(`Failed to fetch file content: ${err}`);
        }
    };

    const value = {
        files,
        activeFile,
        loading,
        error,
        setActiveFileWithContent,
        fetchFiles,
        createFile,
        deleteFile,
        updateFileContent,
        clearError: () => setError(null)
    };

    return (
        <FileContext.Provider value={value}>
            {children}
        </FileContext.Provider>
    );
}

export const useFiles = () => {
    const context = useContext(FileContext);
    if (!context) {
        throw new Error('useFiles must be used within a FileProvider');
    }
    return context;
};