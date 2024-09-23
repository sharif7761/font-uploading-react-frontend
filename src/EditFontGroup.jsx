import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditFontGroup = () => {
    const { groupId } = useParams();  // Get the groupId from the URL
    const navigate = useNavigate();   // To navigate back to the list after editing
    const [groupName, setGroupName] = useState('');
    const [selectedFonts, setSelectedFonts] = useState([]);
    const [allFonts, setAllFonts] = useState([]);

    useEffect(() => {
        fetchGroupDetails();
        fetchFonts();
    }, [groupId]);

    const fetchGroupDetails = async () => {
        try {
            const response = await fetch(`http://localhost/zepto-font-group-backend/get-font-group.php?group_id=${groupId}`);
            const data = await response.json();
            setGroupName(data.group_name);
            setSelectedFonts(data.fonts.map(font => font.id));
        } catch (error) {
            console.error('Error fetching group details:', error);
        }
    };

    const fetchFonts = async () => {
        try {
            const response = await fetch('http://localhost/zepto-font-group-backend/get-fonts.php');
            const fonts = await response.json();
            setAllFonts(fonts);
        } catch (error) {
            console.error('Error fetching fonts:', error);
        }
    };

    const handleUpdateGroup = async (e) => {
        e.preventDefault();
        const payload = { group_id: groupId, group_name: groupName, fonts: selectedFonts };

        try {
            const response = await fetch('http://localhost/zepto-font-group-backend/update-font-group.php', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            const result = await response.json();
            if (response.ok) {
                console.log(result.message);
                navigate('/'); // Go back to the font group list after successful edit
            } else {
                console.error('Error updating group:', result.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <h3>Edit Font Group</h3>
            <form onSubmit={handleUpdateGroup}>
                <div>
                    <label>Group Name:</label>
                    <input
                        type="text"
                        value={groupName}
                        onChange={(e) => setGroupName(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <h4>Select Fonts</h4>
                    {allFonts.map((font) => (
                        <div key={font.id}>
                            <input
                                type="checkbox"
                                value={font.id}
                                checked={selectedFonts.includes(font.id)}
                                onChange={(e) => {
                                    const fontId = parseInt(e.target.value);
                                    if (e.target.checked) {
                                        setSelectedFonts([...selectedFonts, fontId]);
                                    } else {
                                        setSelectedFonts(selectedFonts.filter(id => id !== fontId));
                                    }
                                }}
                            />
                            <label>{font.font_name}</label>
                        </div>
                    ))}
                </div>

                <button type="submit">Update Group</button>
            </form>
        </div>
    );
};

export default EditFontGroup;