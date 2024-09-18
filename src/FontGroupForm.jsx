import React, { useState, useEffect } from 'react';

const FontGroupForm = () => {
    const [fonts, setFonts] = useState([]);
    const [selectedFonts, setSelectedFonts] = useState([]);
    const [groupName, setGroupName] = useState('');
    const [message, setMessage] = useState('');

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

    const handleGroupNameChange = (e) => {
        setGroupName(e.target.value);
    };

    const handleFontSelect = (fontId) => {
        setSelectedFonts((prev) =>
            prev.includes(fontId) ? prev.filter((id) => id !== fontId) : [...prev, fontId]
        );
    };

    const handleAddRow = () => {
        // This functionality will be handled in the form
    };

    const handleSubmit = async () => {
        if (selectedFonts.length < 2) {
            setMessage('You must select at least two fonts.');
            return;
        }

        const response = await fetch('http://localhost/zepto-font-group-backend/create-font-group.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ groupName, fontIds: selectedFonts }),
        });

        const result = await response.json();
        setMessage(result.message || 'Group creation failed');
    };

    return (
        <div>
            <input type="text" value={groupName} onChange={handleGroupNameChange} placeholder="Group Name" />
            {fonts.map((font) => (
                <div key={font.id}>
                    <input
                        type="checkbox"
                        checked={selectedFonts.includes(font.id)}
                        onChange={() => handleFontSelect(font.id)}
                    />
                    <span>{font.font_name}</span>
                    <br />
                    <span style={{ fontFamily: `url(${font.font_path})` }}>Example Style</span>
                </div>
            ))}
            <button onClick={handleAddRow}>Add Row</button>
            <button onClick={handleSubmit}>Create Group</button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default FontGroupForm;