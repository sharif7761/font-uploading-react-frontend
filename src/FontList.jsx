import React, { useState, useEffect } from 'react';

const FontList = () => {
    const [fonts, setFonts] = useState([]);
    const [message, setMessage] = useState('');

    // Fetch fonts when the component mounts
    useEffect(() => {
        const fetchFonts = async () => {
            try {
                const response = await fetch('http://localhost/zepto-font-group-backend/get-fonts.php');
                const result = await response.json();
                setFonts(result.fonts || []);
            } catch (error) {
                console.error('Failed to fetch fonts:', error);
            }
        };
        fetchFonts();
    }, []);

    // Delete font by ID
    const handleDeleteFont = async (fontId) => {
        if (window.confirm('Are you sure you want to delete this font?')) {
            try {
                const response = await fetch(`http://localhost/zepto-font-group-backend/delete-font.php`, {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ font_id: fontId })
                });

                const result = await response.json();
                setMessage(result.message || 'An error occurred while deleting the font');

                // Remove the deleted font from the state
                if (result.message === 'Font deleted successfully') {
                    setFonts(fonts.filter((font) => font.id !== fontId));
                }
            } catch (error) {
                setMessage('An error occurred while deleting the font.');
            }
        }
    };

    return (
        <div>
            <h2>Uploaded Fonts</h2>
            {message && <p>{message}</p>}

            <ul>
                {fonts.map((font) => (
                    <li key={font.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span>{font.font_name}</span>
                        <button
                            onClick={() => handleDeleteFont(font.id)}
                            style={{ background: 'red', color: 'white', border: 'none', cursor: 'pointer' }}
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FontList;