import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav style={navStyle}>
            <ul style={ulStyle}>
                <li style={liStyle}>
                    <Link to="/" style={linkStyle}>Upload Font</Link>
                </li>
                <li style={liStyle}>
                    <Link to="/fonts" style={linkStyle}>Font List</Link>
                </li>
                <li style={liStyle}>
                    <Link to="/font-groups" style={linkStyle}>Font Groups</Link>
                </li>
                <li style={liStyle}>
                    <Link to="/font-group-create" style={linkStyle}>Create Font Groups</Link>
                </li>
            </ul>
        </nav>
    );
};

// Styling for the Navbar
const navStyle = {
    position: 'fixed', // Make the navbar fixed
    top: 0,
    width: '100%',
    background: '#333',
    padding: '10px',
    zIndex: 1000, // Ensure it stays on top of other elements
};

const ulStyle = {
    listStyle: 'none',
    display: 'flex',
    justifyContent: 'space-around',
    margin: 0,
    padding: 0,
};

const liStyle = {
    color: '#fff',
    textDecoration: 'none',
};

const linkStyle = {
    color: '#fff',
    textDecoration: 'none',
};

export default Navbar;