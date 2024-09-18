import React, { useState, useEffect } from 'react';

const FontUpload = () => {
    const [fontFile, setFontFile] = useState(null);
    const [groupName, setGroupName] = useState('');
    const [message, setMessage] = useState('');

    const handleFileChange = (e) => {
        setFontFile(e.target.files[0]);
    };

    const handleGroupNameChange = (e) => {
        setGroupName(e.target.value);
    };

    const handleUpload = async () => {
        const formData = new FormData();
        formData.append('fontFile', fontFile);
        formData.append('groupName', groupName);

        try {
            const response = await fetch('http://localhost/zepto-font-group-backend/upload.php', {
                method: 'POST',
                body: formData,
            });
            const result = await response.json();
            setMessage(result.message || 'Upload failed');
        } catch (error) {
            setMessage('An error occurred.');
        }
    };

    return (
        <div>
            <input type="text" value={groupName} onChange={handleGroupNameChange} placeholder="Group Name" />
            <input type="file" accept=".ttf" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload Font</button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default FontUpload;