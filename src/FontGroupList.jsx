import React, { useState, useEffect } from 'react';

const FontGroupList = () => {
    const [fontGroups, setFontGroups] = useState([]);

    useEffect(() => {
        const fetchFontGroups = async () => {
            try {
                const response = await fetch('http://localhost/zepto-font-group-backend/get-font-groups.php');
                const result = await response.json();
                setFontGroups(result.groups || []);
            } catch (error) {
                console.error('Failed to fetch font groups:', error);
            }
        };
        fetchFontGroups();
    }, []);

    const handleDelete = async (groupId) => {
        if (window.confirm('Are you sure you want to delete this group?')) {
            try {
                const response = await fetch('http://localhost/zepto-font-group-backend/delete-font-group.php', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ groupId }),
                });
                const result = await response.json();
                if (result.success) {
                    setFontGroups(fontGroups.filter((group) => group.id !== groupId));
                } else {
                    alert(result.error || 'Failed to delete group');
                }
            } catch (error) {
                alert('An error occurred while deleting the group.');
            }
        }
    };

    return (
        <div>
            <h2>Font Groups</h2>
            <ul>
                {fontGroups.map((group) => (
                    <li key={group.id}>
                        <h3>{group.group_name}</h3>
                        <button onClick={() => handleDelete(group.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FontGroupList;