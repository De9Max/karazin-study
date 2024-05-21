import React from 'react';
import Navbar from "../Multi/Navbar.jsx";
import {CastForEducation, Home, TableView} from "@mui/icons-material";

function DashboardTemplate(props) {
    const nav_items = [
        {title: "Головна", icon: Home, link: "/dashboard"},
        {title: "Мої курси", icon: CastForEducation, link: "/dashboard/courses"},
        "divide",
    ];

    return (
        <div>
            <Navbar items={nav_items} element={props.children}/>
        </div>

    )
}

export default DashboardTemplate;
