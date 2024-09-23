import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FontGroupList from './FontGroupList';
import EditFontGroup from './EditFontGroup';
import FontUpload from "./FontUpload.jsx";
import FontGroupForm from "./FontGroupForm.jsx";
import FontList from "./FontList.jsx";
import Navbar from "./components/Navbar.jsx";

const App = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<FontUpload />} />
                <Route path="/fonts" element={<FontList />} />
                <Route path="/font-groups" element={<FontGroupList />} />
                <Route path="/font-group-create" element={<FontGroupForm />} />
                <Route path="/font-group-edit/:groupId" element={<EditFontGroup />} />
            </Routes>
        </Router>
    );
};

export default App;