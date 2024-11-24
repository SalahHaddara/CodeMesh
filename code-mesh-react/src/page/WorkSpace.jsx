import './../styles/pages/workspace.css';

const WorkspaceScreen = () => {

    return (
        <div className="workspace">
            <nav className="nav-bar">
                <div className="nav-left">
                    <span className="nav-title">Code Editor</span>
                    <span className="active-filename">filename</span>
                </div>
                <div className="nav-right">
                    <button className="nav-button">▶</button>
                    <button className="nav-button">👤</button>
                </div>
            </nav>
        </div>
    );
};

export default WorkspaceScreen;