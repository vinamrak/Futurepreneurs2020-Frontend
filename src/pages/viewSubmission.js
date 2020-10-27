import {
    Typography,
    CircularProgress,
    Card, CardContent,
    List, ListSubheader,
    ListItem, ListItemText,
    Grid, CardMedia
} from "@material-ui/core";
import React, { useState, useContext, useEffect } from "react";
import InfoContext from "../context/InfoContext";
import { Redirect } from "react-router-dom";
import axios from "axios";

function ViewSub() {
    const [redirect, setRedirect] = useState(false);
    const [amenities, setAmenities] = useState(false);
    const [amenitiesCost, setAmenitiesCost] = useState(0);
    const [amenitiesPremium, setAmenitiesPremium] = useState([]);
    const [amenitiesEconomy, setAmenitiesEconomy] = useState([]);
    const [messageA, setMessageA] = useState("");
    const [campaign, setCampaign] = useState(false);
    const [campaignDesc, setCampaignDesc] = useState("");
    const [campaignImage, setCampaignImage] = useState("");
    const [campaignTitle, setCampaignTitle] = useState("");
    const [campaignTagline, setCampaignTagline] = useState("");
    const [messageC, setMessageC] = useState("");

    const [isLoading, setLoading] = useState(false);
    const backend = process.env.REACT_APP_BACKEND_URL;

    const { isLoggedIn } = useContext(
        InfoContext
    );

    const getAmenities = async () => {
        const url = `${backend}/amenities/get`;
        setLoading(true);
        try {
            await axios.get(url, {
                headers: {
                    "auth-token": localStorage.getItem("authToken")
                }
            })
                .then((res) => {
                    console.log(res);
                    if (res.status === 200) {
                        setAmenitiesCost(res.data.amenities[0].totalCost)
                        setAmenitiesPremium(res.data.amenities[0].premium)
                        setAmenitiesEconomy(res.data.amenities[0].standard)
                        setAmenities(true);
                    }
                    else {
                        setMessageA(res.data.message);
                    }
                });
        }
        catch (error) {
            console.log(error);
            // setRedirect(true);
        }
        setLoading(false);
    }

    const getCampaign = async () => {
        const url = `${backend}/campaign/get`;
        setLoading(true);
        try {
            await axios.get(url, {
                headers: {
                    "auth-token": localStorage.getItem("authToken")
                }
            })
                .then((res) => {
                    console.log(res);
                    if (res.status === 200) {
                        setCampaignDesc(res.data.campaign[0].description);
                        setCampaignImage(res.data.campaign[0].imageUrl);
                        setCampaignTagline(res.data.campaign[0].tagline);
                        setCampaignTitle(res.data.campaign[0].hotelName);
                        setCampaign(true);
                    }
                    else {
                        setMessageC(res.data.message);
                    }
                });
        }
        catch (error) {
            console.log(error);
            // setRedirect(true);
        }
        setLoading(false);
    }

    useEffect(() => {
        if (localStorage.getItem('authToken') === null) {
            setRedirect(true);
        }
        getAmenities();
        getCampaign();
    }, [isLoggedIn]);

    if (redirect) {
        return <Redirect to="/" />;
    }

    return (
        <div className="amenities-page-container">
            {isLoading ? <div className="inner-data"><CircularProgress /></div>
                : <div className="inner-data">
                    <Typography variant="h3" color="primary" className="login-head">
                        Amenities
                    </Typography>
                    {amenities
                        ? <>
                            <Typography variant="h4" >Total Cost: {amenitiesCost}</Typography>
                            <Grid container spacing={5}>
                                <Grid item xs={12} md={6} justify="center">
                                    <Typography variant="h4" >Premium Rooms</Typography>
                                    <Typography variant="h6" >Cost per Room: {amenitiesPremium.cpr === null ? 0 : amenitiesPremium.cpr}</Typography>
                                    <Typography variant="h6" >Number of Room: {amenitiesPremium.number === null ? 2 : amenitiesPremium.number}</Typography>
                                    <List subheader={<ListSubheader>Amenities</ListSubheader>} dense="true">
                                        {(amenitiesPremium.amenities).map((amen) => <ListItem key={amen.cost}>
                                            <ListItemText primary={amen.title} secondary={'₹' + amen.cost} />
                                        </ListItem>)}
                                    </List>
                                    <List subheader={<ListSubheader>Marketing</ListSubheader>}>
                                        <ListItem key={(amenitiesPremium.marketing).cost}>
                                            <ListItemText primary={(amenitiesPremium.marketing).title} secondary={'₹' + (amenitiesPremium.marketing).cost} />
                                        </ListItem>
                                    </List>
                                </Grid>
                                <Grid item xs={12} md={6} justify="center">
                                    <Typography variant="h4" >Standard Rooms</Typography>
                                    <Typography variant="h6" >Cost per Room: {amenitiesEconomy.cpr === null ? 0 : amenitiesEconomy.cpr}</Typography>
                                    <Typography variant="h6" >Number of Room: {amenitiesEconomy.number === null ? 0 : amenitiesEconomy.number}</Typography>
                                    <List subheader={<ListSubheader>Amenities</ListSubheader>} dense="true">
                                        {(amenitiesEconomy.amenities).map((amen) => <ListItem key={amen.cost}>
                                            <ListItemText primary={amen.title} secondary={'₹' + amen.cost} />
                                        </ListItem>)}
                                    </List>
                                    <List subheader={<ListSubheader>Marketing</ListSubheader>}>
                                        <ListItem key={(amenitiesEconomy.marketing).cost}>
                                            <ListItemText primary={(amenitiesEconomy.marketing).title} secondary={'₹' + (amenitiesEconomy.marketing).cost} />
                                        </ListItem>
                                    </List>
                                </Grid>
                            </Grid>
                        </>
                        : <Typography variant="h5">{messageA}</Typography>
                    }
                    <br />
                    <Typography variant="h3" color="primary" className="login-head">
                        Campaign
                    </Typography>
                    {campaign
                        ?
                        <Card style={{ minWidth: 300, maxWidth: '40%', margin: '40px auto' }}>
                            <CardMedia
                                style={{ paddingTop: 300 }}
                                image={campaignImage}
                                title="Marketing"
                            />
                            <CardContent>
                                <Typography variant="h4" color="primary">{campaignTitle}</Typography>
                                <Typography variant="h6" color="secondary">{campaignTagline}</Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    {campaignDesc}
                                </Typography>
                            </CardContent>
                        </Card>
                        : <Typography variant="h5">{messageC}</Typography>
                    }
                </div>
            }
        </div >
    );
}

export default ViewSub;