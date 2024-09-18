import React, { useState, useEffect } from 'react';

const FontUpload = () => {
    const [groupName, setGroupName] = useState('');
    const [fontFile, setFontFile] = useState(null);
    const [message, setMessage] = useState('');
    const [fontGroups, setFontGroups] = useState([]);

    // Fetch font groups from the server
    useEffect(() => {
        fetch('http://localhost/zepto-font-group-backend/get-fonts.php')
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setFontGroups(data.fonts);
                } else {
                    setMessage(data.error);
                }
            });
    }, []);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.name.endsWith('.ttf')) {
            setFontFile(file);
            setMessage('');
        } else {
            setMessage('Please upload a valid .ttf font file.');
            setFontFile(null);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!fontFile || !groupName) {
            setMessage('Please provide a font file and group name.');
            return;
        }

        const formData = new FormData();
        formData.append('groupName', groupName);
        formData.append('fontFile', fontFile);

        try {
            const response = await fetch('http://localhost/zepto-font-group-backend/index.php', {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();
            if (result.success) {
                setMessage(result.message);
                // Reload font groups after successful upload
                fetch('http://localhost/zepto-font-group-backend/get-fonts.php')
                    .then((res) => res.json())
                    .then((data) => {
                        setFontGroups(data.fonts);
                    });
            } else {
                setMessage(result.error || 'Failed to upload font.');
            }
        } catch (error) {
            setMessage('An error occurred. Please try again.');
        }
    };

    return (
        <div>
            <h2>Upload a Font to a Group</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Font Group Name:
                    <input
                        type="text"
                        value={groupName}
                        onChange={(e) => setGroupName(e.target.value)}
                        required
                    />
                </label>
                <br />
                <label>
                    Font File (.ttf only):
                    <input type="file" accept=".ttf" onChange={handleFileChange} />
                </label>
                <br />
                <button type="submit">Upload Font</button>
            </form>
            {message && <p>{message}</p>}

            <h3>Uploaded Font Groups</h3>
            <ul>
                {fontGroups.map((font) => (
                    <li key={font.id}>
                        {font.group_name} - {font.font_name} <a href={font.font_path}>Download</a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FontUpload;