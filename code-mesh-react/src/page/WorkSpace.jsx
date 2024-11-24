import React, {useState} from 'react';
import './../styles/pages/workspace.css';

const WorkspaceScreen = () => {
    const [files, setFiles] = useState([
        {id: 1, name: 'main.js', content: '// Your code here', language: 'javascript'},
        {id: 2, name: 'styles.css', content: '/* Your styles here */', language: 'css'},
    ]);
    const [activeFile, setActiveFile] = useState(files[0]);

    const createNewFile = () => {
        const newFile = {
            id: Date.now(),
            name: `untitled-${files.length + 1}.js`,
            content: '',
            language: 'javascript'
        };
        setFiles([...files, newFile]);
        setActiveFile(newFile);
    };

    return (
        <div className="workspace">
            {/* Top Navigation */}
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
                {/* Files */}
                <div className="file-explorer">
                    <div className="file-explorer-content">
                        <div className="file-explorer-header">
                            <span className="section-title">Files</span>
                            <button className={"new-file-button"} onClick={createNewFile}>+</button>

                        </div>
                        {files.map(file => (
                            <div
                                key={file.id}
                                onClick={() =>
                                    setActiveFile(file)
                                }
                                className={`file-item ${activeFile?.id === file.id ? 'active' : ''}`}
                            >
                                {file.name}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Code Editor Area */}
                <div className="editor-area">
                    <textarea
                        value={activeFile?.content}
                        onChange={(e) => {
                            const newFiles = files.map(f =>
                                f.id === activeFile.id
                                    ? {...f, content: e.target.value}
                                    : f
                            );
                            setFiles(newFiles);
                            setActiveFile({...activeFile, content: e.target.value});
                        }}
                        className="code-editor"
                        placeholder="Start coding..."
                    />
                </div>
            </div>
        </div>
    );
};

export default WorkspaceScreen;