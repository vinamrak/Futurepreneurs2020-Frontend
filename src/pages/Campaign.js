import {
    Typography,
    CircularProgress,
} from "@material-ui/core";
import React, { useState, useContext, useEffect } from "react";
import InfoContext from "../context/InfoContext";
import { Redirect } from "react-router-dom";
import TextInput from "../components/TextInput";
import ActionButton from "../components/ActionButton";
import axios from "axios";
import ImageSelect from "../components/ImageSelect";

function Campaign() {
    const [desc, changeDesc] = useState("");
    const [tag, changeTag] = useState("");
    const [HotelName, changeHotelName] = useState("");
    const [image, setImage] = useState(0);
    const [Message, setMessage] = useState("");
    const images = [
        {
            key: 0,
            src: "./assets/hotel1.jpg"
        },
        {
            key: 1,
            src: "./assets/hotel4.jpg"
        },
        {
            key: 2,
            src: "./assets/hotel3.jpg"
        },

    ]

    const { isLoggedIn } = useContext(
        InfoContext
      );

    const [isLoading, setLoading] = useState(false);
    const [redirect, setRedirect] = useState(false);

    const backend = process.env.REACT_APP_BACKEND_URL;

    const handleDescChange = (event) => {
        changeDesc(event.target.value);
    };
    const handleChangeTag = (event) => {
        changeTag(event.target.value);
    };
    const handleChangeHotelName = (event) => {
        changeHotelName(event.target.value);
    };

    const handleSubmit = async () => {
        setMessage("");
        const url = `${backend}/campaign/add`;
        setLoading(true);
        if (desc.trim() === "") {
            setMessage("Please add description to your Advertisement")
        } else {
            const data = {
                description: desc,
                tagline: tag,
                hotelName: HotelName,
                imageUrl: images[image].src
            };
            console.log(url, data);
            if (localStorage.getItem("userType") === "L") {
                try {
                    await axios.post(url, data, {
                        headers: {
                            "auth-token": localStorage.getItem("authToken")
                        }
                    })
                        .then((res) => {
                            console.log(res);
                            setMessage(res.data.message);
                            if (res.status === 200) {
                                setRedirect(true);
                            }
                        });
                } catch (error) {
                    console.log(error);
                }
            } else {
                setMessage("You are not authorised as Team Leader")
            }
        }
        setLoading(false);
    };

    useEffect(() => {
        if (localStorage.getItem('authToken')===null) {
          setRedirect(true);
        }
      }, [isLoggedIn]);

    if (redirect) {
        return <Redirect to="/" />
    }

    return (
        <div className="page-container">
            <div className="inner-data">
                <Typography variant="h3" color="primary" className="login-head">
                    Market Your Hotel Room
                </Typography>
                <br />
                <ImageSelect images={images} selected={image} setSelected={setImage} />
                <form className="form">
                    <TextInput
                        id="HotelName"
                        label="Hotel Name"
                        type="text"
                        className="form-input"
                        variant="outlined"
                        multiline
                        rows={1}
                        value={HotelName}
                        onChange={handleChangeHotelName}
                    />
                    <br />
                    <TextInput
                        id="tagline"
                        label="Tagline"
                        type="text"
                        className="form-input"
                        variant="outlined"
                        multiline
                        rows={1}
                        value={tag}
                        onChange={handleChangeTag}
                    />
                    <br />
                    <TextInput
                        id="desc"
                        label="Description"
                        type="text"
                        className="form-input"
                        variant="outlined"
                        multiline
                        rows={4}
                        value={desc}
                        onChange={handleDescChange}
                    />
                </form>
                <br />
                <Typography variant="h5" color="secondary">
                    {Message}
                </Typography>
                
                <div className="login-btn-div">
                    <ActionButton
                        className="login-btn"
                        onClick={handleSubmit}
                        disabled={isLoading ? true : false}
                        children={!isLoading ? (
                            "Submit"
                        ) : (
                                <CircularProgress
                                    color="secondary"
                                    size={20}
                                    thickness={5}
                                />
                            )}
                    />
                </div>
            </div>
        </div>
    );
}

export default Campaign;