import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {apiUrl} from "./config.js";

const FontGroupList = () => {
    const [fontGroups, setFontGroups] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFontGroups = async () => {
            try {
                const response = await fetch(`${apiUrl}/get-font-groups.php`);
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
                const response = await fetch(`${apiUrl}/delete-font-group.php`, {
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

    const handleEdit = (groupId) => {
        // Navigate to the edit page with the selected group ID
        navigate(`/font-group-edit/${groupId}`);
    };

    return (
        <div className="centered-container">
            <div className="centered-content">
                <h2>Font Groups</h2>
                <table>
                    <tr>
                        <th>Name</th>
                        <th>Fonts</th>
                        <th>Count</th>
                        <th></th>
                    </tr>
                    {fontGroups.map((group) => (
                        <tr key={group.id}>
                            <td>{group.group_name}</td>
                            <td>{group.fonts.map(u => u.font_name).join(', ')}</td>
                            <td>{group.fonts.length}</td>
                            <td>
                                <button onClick={() => handleDelete(group.id)}>Delete</button>
                                {/*<button onClick={() => handleEdit(group.id)}>Edit</button>*/}
                            </td>
                        </tr>
                        ))}
                </table>
            </div>
        </div>
    );
};

export default FontGroupList;