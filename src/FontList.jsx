import React, { useState, useEffect } from 'react';
import {apiUrl} from "./config.js";

const FontList = () => {
    const [fonts, setFonts] = useState([]);
    const [message, setMessage] = useState('');
    const [previewFont, setPreviewFont] = useState(null); // Store the font URL for preview

    const handlePreview = (fontFilePath) => {
        setPreviewFont(fontFilePath);
    };

    // Fetch fonts when the component mounts
    useEffect(() => {
        const fetchFonts = async () => {
            try {
                const response = await fetch(`${apiUrl}/get-fonts.php`);
                const result = await response.json();
                setFonts(result.fonts || []);
            } catch (error) {
                console.error('Failed to fetch fonts:', error);
            }
        };
        fetchFonts();
    }, []);

    const handleDeleteFont = async (fontId) => {
        if (window.confirm('Are you sure you want to delete this font?')) {
            try {
                const response = await fetch(`${apiUrl}/delete-font.php`, {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ font_id: fontId })
                });

                const result = await response.json();
                setMessage(result.message || 'An error occurred while deleting the font');
                if (result.status) {
                    setFonts(fonts.filter((font) => font.id !== fontId));
                }
            } catch (error) {
                setMessage('An error occurred while deleting the font.');
            }
        }
    };

    return (
        <div className="centered-container">
            <div className="centered-content">
                <h2>Uploaded Fonts</h2>
                {message && <p>{message}</p>}

                {previewFont && (
                    <style>
                        {`
                    @font-face {
                        font-family: 'UploadedFont';
                        src: url('${previewFont}');
                    }
                    .preview-text {
                        font-family: 'UploadedFont';
                        font-size: 24px;
                        font-weight: bold;
                    }
                `}
                    </style>
                )}


                <table>
                    <tr>
                        <th>Font Name</th>
                        <th>Preview</th>
                        <th></th>
                    </tr>
                    {fonts.map((font) => (
                        <tr key={font.id}>
                            <td>{font.font_name}</td>
                            <td>
                                <button onClick={() => handlePreview(font.font_path)}>Preview</button>
                            </td>
                            <td>
                                <button
                                    onClick={() => handleDeleteFont(font.id)}
                                    style={{background: 'red', color: 'white', border: 'none', cursor: 'pointer'}}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </table>
                {previewFont && (
                    <div>
                        <h4>Example Style:</h4>
                        <p className="preview-text">The quick brown fox jumps over the lazy dog</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FontList;