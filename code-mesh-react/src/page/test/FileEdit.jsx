import React, { useState, useEffect } from 'react';
import { requestAPI } from '../../utlis/request.js'
import Pusher from 'pusher-js';

const FileEdit = () => {
    const fileId = '398756639';
    const filePath = 'yousif_mohammed_dahabra398756639/file.txt';
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
      useEffect(() => {

        getFileData();
        Pusher.logToConsole = true;//
        const pusher = new Pusher('', {
          cluster: '',
          encrypted: true,
        });
      
        const channel = pusher.subscribe(`file.${fileId}`);
        channel.bind('', (data) => {
          console.log('Received event data:', data);
          setContent(data.content);
        });
      
        return () => {
          channel.unbind_all();
          channel.unsubscribe();
        };
      
    
      }, [filePath]);
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
