import React from 'react';
import FontUpload from './FontUpload';
import FontGroupForm from './FontGroupForm';
import FontGroupList from './FontGroupList';

function App() {
    return (
        <div>
            <h1>Font Group System</h1>
            <FontUpload />
            <FontGroupForm />
            <FontGroupList />
        </div>
    );
}

export default App;