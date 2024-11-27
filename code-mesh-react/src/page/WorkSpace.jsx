import React, { useState, useEffect } from 'react';
import './../styles/pages/workspace.css';
import {Editor} from "@monaco-editor/react";
import {useFiles} from "../hooks/FileContext.jsx";
import Pusher from 'pusher-js';

const WorkspaceScreen = () => {
    const [content, setContent] = useState('');

    const {
        files,
        activeFile,
        loading,
        error,
        setActiveFileWithContent,
        fetchFiles,
        createFile,
        deleteFile,
        updateFileContent,
        clearError
    } = useFiles();

    useEffect(() => {
        fetchFiles();
    }, [fetchFiles]);
    useEffect(() => {
        if(activeFile){
            setContent(activeFile.content || '');
            const pusher = new Pusher('221829f3a57f7bf42126', {
            cluster: 'eu',
            encrypted: true,
            });
            
            const channel = pusher.subscribe(`file.${activeFile.id}`);
            channel.bind('EditFile', (data) => {
            setContent(data.content);
            });
         
            return () => {
            channel.unbind_all();
            channel.unsubscribe();
            };
        }
    



    }, [activeFile]);

    const handleCreateNewFile = async () => {
        const newFileName = `untitled-${files.length + 1}.js`;
        await createFile(newFileName, 'javascript');
    };

    const handleDeleteFile = async (fileId, e) => {
        if (e) {
            e.stopPropagation();
        }
        await deleteFile(fileId);
    };

    const handleUpdateContent = async (content) => {
        if (activeFile) {
            await updateFileContent(activeFile.id, content);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    // const startRenaming = (file, e) => {
    //     e.stopPropagation();
    //     setEditingFileId(file.id);
    //     setEditingFileName(file.name);
    // };
    //
    // const handleRename = (e) => {
    //     if (e.key === 'Enter') {
    //         const updatedFiles = files.map(f =>
    //             f.id === editingFileId ? {...f, name: editingFileName} : f
    //         );
    //         setFiles(updatedFiles);
    //         if (activeFile?.id === editingFileId) {
    //             setActiveFile({...activeFile, name: editingFileName});
    //         }
    //         setEditingFileId(null);
    //     } else if (e.key === 'Escape') {
    //         setEditingFileId(null);
    //     }
    // };

    return (
        <div className="workspace">
            {error && (
                <div className="error-banner" onClick={clearError}>
                    {error}
                </div>
            )}
            <nav className="nav-bar">
                <div className="nav-left">
                    <span className="nav-title">Code Editor</span>
                    <span className="active-filename">{activeFile?.name}</span>
                </div>
                <div className="nav-right">
                    <button className="nav-button">▶</button>
                    <button className="nav-button">👤</button>
                </div>
            </nav>

            <div className="main-content">
                <div className="file-explorer">
                    <div className="file-explorer-content">
                        <div className="file-explorer-header">
                            <span className="section-title">Files</span>
                            <button className="new-file-button" onClick={handleCreateNewFile}>+</button>
                        </div>
                        {files.map(file => (
                            <div
                                key={file.id}
                                onClick={() => setActiveFileWithContent(file)}
                                className={`file-item ${activeFile?.id === file.id ? 'active' : ''}`}
                            >
                                <div className="file-item-content">
                                    <span className="file-icon">📄</span>
                                    <span className="file-name">{file.name}</span>
                                </div>
                                <button
                                    onClick={(e) => handleDeleteFile(file.id, e)}
                                    className="delete-file-button"
                                >
                                    ×
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="editor-area">
                    <Editor
                        height="90vh"
                        language={activeFile?.language}
                        value={content}
                        onChange={handleUpdateContent}
                        theme="vs-light"
                        options={{
                            fontSize: 14,
                            automaticLayout: true,
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default WorkspaceScreen;