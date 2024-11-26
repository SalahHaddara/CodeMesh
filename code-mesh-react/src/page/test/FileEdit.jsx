import React, { useState, useEffect } from 'react';
import { requestAPI } from '../../utlis/request.js'

const FileEdit = () => {
    const [content, setContent] = useState('');
    const getFileData = async () => {
        try {
          const result = await requestAPI({
            route: "get_file",
            method: "POST",
            body: { file_path: filePath },
          });
    
          console.log("Fetched file data:", result);
          if (result.success) {
            setContent(result.data.content);
          } else {
            console.error("Error fetching file content:", result.message);
          }
        } catch (error) {
          console.error("Error in getFileData:", error);
        }
      };
    
    return (
        <div>
        <h2>Editing: {filePath}</h2>
        <textarea
           value={content}

          
          style={{ width: '100%', height: '300px' }}
        />
      </div>
    );
}
export default FileEdit;
