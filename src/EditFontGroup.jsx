import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const EditFontGroup = () => {
    const { groupId } = useParams();
    const [groupName, setGroupName] = useState("");           // State to hold group name
    const [selectedFonts, setSelectedFonts] = useState([]);   // State to hold selected fonts
    const [availableFonts, setAvailableFonts] = useState([]); // State to hold all available fonts
    const [message, setMessage] = useState("");               // State for success/error messages

    // Fetch available fonts from the backend
    const fetchAvailableFonts = async () => {
        try {
            const response = await fetch('http://localhost/zepto-font-group-backend/get-fonts.php');
            const data = await response.json();
            setAvailableFonts(data.fonts);
        } catch (error) {
            console.error("Error fetching fonts:", error);
        }
    };

    // Fetch font group details by ID
    const fetchFontGroupDetails = async () => {
        try {
            const response = await fetch(`http://localhost/zepto-font-group-backend/get-font-group.php?group_id=${groupId}`);
            const data = await response.json();
            setGroupName(data.group_name || "");
            setSelectedFonts(data.font_ids || []);
        } catch (error) {
            console.error("Error fetching font group details:", error);
        }
    };

    // Load available fonts and font group details on component mount
    useEffect(() => {
        fetchAvailableFonts();
        fetchFontGroupDetails();
    }, [groupId]);

    // Handle adding a new font row
    const addFontRow = () => {
        setSelectedFonts([...selectedFonts, ""]); // Add an empty font row
    };

    // Handle removing a font row
    const removeFontRow = (index) => {
        const updatedFonts = [...selectedFonts];
        updatedFonts.splice(index, 1);
        setSelectedFonts(updatedFonts);
    };

    // Handle font change for a specific row
    const handleFontChange = (index, value) => {
        const updatedFonts = [...selectedFonts];
        updatedFonts[index] = value;
        setSelectedFonts(updatedFonts);
    };

    // Handle the form submission to update the font group
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (selectedFonts.length < 2) {
            setMessage("You must select at least two fonts.");
            return;
        }

        try {
            const response = await fetch('http://localhost/zepto-font-group-backend/update-font-group.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    group_id: groupId,
                    group_name: groupName,
                    font_ids: selectedFonts,
                }),
            });

            const data = await response.json();
            setMessage(data.message);
        } catch (error) {
            console.error("Error updating font group:", error);
        }
    };

    return (
        <div className="edit-font-group-container">
            <h2>Edit Font Group</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="group-name">Group Name:</label>
                    <input
                        type="text"
                        id="group-name"
                        value={groupName || ""} // Ensure controlled input
                        onChange={(e) => setGroupName(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <h3>Fonts in this Group:</h3>
                    {selectedFonts.map((fontId, index) => (
                        <div key={index} className="font-row">
                            <select
                                value={fontId || ""} // Ensure controlled select input
                                onChange={(e) => handleFontChange(index, e.target.value)}
                                required
                            >
                                <option value="" disabled>Select a font</option>
                                {availableFonts.map((font) => (
                                    <option key={font.id} value={font.id}>
                                        {font.name}
                                    </option>
                                ))}
                            </select>
                            <button type="button" onClick={() => removeFontRow(index)}>Remove</button>
                        </div>
                    ))}
                    <button type="button" onClick={addFontRow}>Add Font</button>
                </div>

                <button type="submit">Update Font Group</button>

                {message && <p>{message}</p>}
            </form>
        </div>
    );
};

export default EditFontGroup;