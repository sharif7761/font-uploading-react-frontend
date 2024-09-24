import { useState } from 'react';
import {apiUrl} from "./config.js";

const FontUpload = () => {
    const [fontFile, setFontFile] = useState(null);
    const [message, setMessage] = useState('');

    const handleFileChange = (e) => {
        setFontFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        const formData = new FormData();
        formData.append('fontFile', fontFile);

        try {
            const response = await fetch(`${apiUrl}/upload.php`, {
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
        <div className="centered-container">
            <div className="centered-content">
                <input type="file" accept=".ttf" onChange={handleFileChange} />
                <button onClick={handleUpload}>Upload Font</button>
                {message && <p>{message}</p>}
            </div>
        </div>
    );
};

export default FontUpload;