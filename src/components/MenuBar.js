import { Grid } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import ActionButton from './ActionButton';

import './MenuBar.css';

export default function MenuBar() {
    const userType = localStorage.getItem("userType");
    switch (userType) {
        case "A":
            return (
                <Grid container spacing={2} className="menubar">
                    <Grid item>
                        <Link to="/signup">
                            <ActionButton variant="contained" color="primary" disableElevation children="Register a Team" />
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link to="/notSubmit">
                            <ActionButton variant="contained" color="primary" disableElevation children="Check who hasn't submitted" />
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link to="/viewSub">
                            <ActionButton variant="contained" color="primary" disableElevation children="Submissions of a Team" />
                        </Link>
                    </Grid>
                </Grid>
            );
        case "L":
        case "S":
            return (
                <Grid container spacing={2} className="menubar">
                    <Grid item>
                        <Link to="/amenities">
                            <ActionButton variant="contained" color="primary" disableElevation
                                children={userType === "L" ? "Fill Amenities" : "View Amenities"}
                            />
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link to="/campaign">
                            <ActionButton variant="contained" color="primary"
                                children={userType === "L" ? "Fill Marketing Campaign" : "View Marketing Campaign"}
                                disableElevation
                            />
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link to="/submission">
                            <ActionButton variant="contained" color="primary"
                                children="View Submissions"
                                disableElevation
                            />
                        </Link>
                    </Grid>
                </Grid>
            )
        default:
            return (
                <Grid container spacing={2} className="menubar">
                    <Grid item>
                        <Link to="/login">
                            <ActionButton variant="contained" color="primary" children="Login" disableElevation />
                        </Link>
                    </Grid>
                </Grid>
            )
    }
}