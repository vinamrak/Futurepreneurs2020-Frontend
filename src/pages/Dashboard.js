import React from "react";
import MenuBar from '../components/MenuBar';

import './Dashboard.css';

export default function Dashboard() {
    return (
        <div className="page-container">
            <div className="inner-data">
                <img src="future.png" width="400" className="future-logo" alt="Welcome to Quizzie"></img>
                <MenuBar />
            </div>
        </div >
    );
}