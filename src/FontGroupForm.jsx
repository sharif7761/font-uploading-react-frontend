import React, { useState, useEffect } from 'react';

const FontGroupForm = () => {
    const [fonts, setFonts] = useState([]);
    const [rows, setRows] = useState([{ selectedFont: '' }]); // Initial state with one row
    const [groupName, setGroupName] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Fetch fonts on component mount
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

    // Handle font selection for each row
    const handleFontSelect = (index, fontId) => {
        const newRows = [...rows];
        newRows[index].selectedFont = fontId;
        setRows(newRows);
    };

    // Add a new row
    const handleAddRow = () => {
        setRows([...rows, { selectedFont: '' }]); // Add a new empty row
    };

    // Remove a row by its index
    const handleRemoveRow = (index) => {
        const newRows = rows.filter((_, i) => i !== index); // Remove the row at the specified index
        setRows(newRows);
    };

    const handleSubmit = async () => {
        const selectedFonts = rows.map((row) => row.selectedFont).filter((font) => font); // Filter out empty selections

        if (selectedFonts.length < 2) {
            setMessage('You must select at least two fonts.');
            return;
        }

        // Submit the group with the selected fonts
        try {
            const response = await fetch('http://localhost/zepto-font-group-backend/create-font-group.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ groupName, fontIds: selectedFonts }),
            });
            const result = await response.json();
            setMessage(result.message || 'Group creation failed');
        } catch (error) {
            setMessage('An error occurred during group creation.');
        }
    };

    return (
        <div className="centered-container">
            <div className="centered-content">
                <h2>Create Font Group</h2>
                <input
                    type="text"
                    value={groupName}
                    onChange={handleGroupNameChange}
                    placeholder="Group Name"
                />

                {rows.map((row, index) => (
                    <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                        <select
                            value={row.selectedFont}
                            onChange={(e) => handleFontSelect(index, e.target.value)}
                            style={{ marginRight: '10px' }}
                        >
                            <option value="">Select a Font</option>
                            {fonts.map((font) => (
                                <option key={font.id} value={font.id}>
                                    {font.font_name}
                                </option>
                            ))}
                        </select>
                        {/* Add a cross (✖) button to remove the row */}
                        <button onClick={() => handleRemoveRow(index)} style={{ background: 'red', color: 'white', border: 'none', cursor: 'pointer' }}>
                            ✖
                        </button>
                    </div>
                ))}

                <button onClick={handleAddRow} style={{ marginRight: '10px' }}>Add Row</button>
                <button onClick={handleSubmit}>Create Group</button>

                {message && <p>{message}</p>}
            </div>
        </div>
    );
};

export default FontGroupForm;