import {
    Typography,
    CircularProgress,
    List, Grid,
    ListItem, ListItemText
} from "@material-ui/core";
import ActionButton from '../components/ActionButton';
import React, { useState, useContext, useEffect } from "react";
import InfoContext from "../context/InfoContext";
import { Redirect } from "react-router-dom";
import axios from "axios";

function NotSub() {
    const [redirect, setRedirect] = useState(false);
    const [notAmenities, setNotAmenities] = useState([]);
    const [notCampaign, setNotCampaign] = useState([]);

    const [isLoadingA, setLoadingA] = useState(false);
    const [isLoadingC, setLoadingC] = useState(false);
    const backend = process.env.REACT_APP_BACKEND_URL;

    const { isLoggedIn } = useContext(
        InfoContext
    );

    const getAmenities = async () => {
        const url = `${backend}/admin/getNotAmenities`;
        setLoadingA(true);
        try {
            await axios.get(url, {
                headers: {
                    "auth-token": localStorage.getItem("authToken")
                }
            })
                .then((res) => {
                    console.log(res);
                    if (res.status === 200) {
                        setNotAmenities([...res.data.result])
                    }
                    else {
                        setNotAmenities([{ code: res.data.message }]);
                    }
                });
        }
        catch (error) {
            console.log(error);
        }
        setLoadingA(false);
    }

    const getCampaign = async () => {
        const url = `${backend}/admin/getNotCampaign`;
        setLoadingC(true);
        try {
            await axios.get(url, {
                headers: {
                    "auth-token": localStorage.getItem("authToken")
                }
            })
                .then((res) => {
                    console.log(res);
                    if (res.status === 200) {
                        setNotCampaign([...res.data.result]);
                    }
                    else {
                        setNotCampaign([{ code: res.data.message }]);
                    }
                });
        }
        catch (error) {
            console.log(error);
        }
        setLoadingC(false);
    }

    useEffect(() => {
        let isAdmin = localStorage.getItem("userType");
        if (isAdmin !== "A") {
            setRedirect(true);
        }
    }, [isLoggedIn]);

    if (redirect) {
        return <Redirect to="/" />;
    }

    return (
        <div className="amenities-page-container">
            <div className="inner-data">
                <Grid container spacing={4} >
                    <Grid item xs={12} md={6} justify="center">
                        <Typography >Amenities Form</Typography>
                        <ActionButton
                            className="login-btn"
                            onClick={getAmenities}
                            disabled={isLoadingA ? true : false}
                            children={!isLoadingA ? (
                                "Get latest Data"
                            ) : (
                                    <CircularProgress
                                        color="secondary"
                                        size={20}
                                        thickness={5}
                                    />
                                )}
                        />
                        <List>
                            {(notAmenities).map((amen) => <ListItem>
                                <ListItemText primary={amen.code} />
                            </ListItem>)}
                        </List>
                    </Grid>
                    <Grid item xs={12} md={6} justify="center">
                        <Typography >Campaign Form</Typography>
                        <ActionButton
                            className="login-btn"
                            onClick={getCampaign}
                            disabled={isLoadingC ? true : false}
                            children={!isLoadingC ? (
                                "Get latest Data"
                            ) : (
                                    <CircularProgress
                                        color="secondary"
                                        size={20}
                                        thickness={5}
                                    />
                                )}
                        />
                        <List>
                            {(notCampaign).map((amen) => <ListItem>
                                <ListItemText primary={amen.code} />
                            </ListItem>)}
                        </List>
                    </Grid>
                </Grid>
            </div>
        </div >
    );
}

export default NotSub;