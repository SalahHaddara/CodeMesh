import React, { useState, useEffect } from 'react';
const FileEdit = () => {

    return (
        <div>
        <h2>Editing: {filePath}</h2>
        <textarea
           
          
          style={{ width: '100%', height: '300px' }}
        />
      </div>
    );
}
export default FileEdit;
