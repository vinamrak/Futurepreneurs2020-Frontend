import React, { useContext, useEffect } from "react";
import { AppBar, Toolbar } from "@material-ui/core";
import "./Navbar.css";
import { Link } from "react-router-dom";
import ActionButton from "./ActionButton";
import InfoContext from "../context/InfoContext";

function Navbar() {
	const { isLoggedIn, setLoggedIn, setAuthToken, setUserType, setTeamCode, teamCode } = useContext(InfoContext);
	const logout = () => {
		localStorage.clear();
		setLoggedIn(false);
		setAuthToken(null);
		setUserType(null);
		setTeamCode(null);
	}

	useEffect(() => {
		let loggedin = localStorage.getItem("authToken");
		if (loggedin !== null) {
			setLoggedIn(true);
			setTeamCode(localStorage.getItem("teamCode"));
			setAuthToken(loggedin);
			setUserType(localStorage.getItem("userType"));
		} else {
			setLoggedIn(false);
			setAuthToken(null);
			setUserType(null);
			setTeamCode(null);
		}
	})

	return (
		<AppBar position="fixed" className="navbar" elevation={0}>
			<Toolbar className="nav-toolbar">
				<Link to="/" className="nav-links">
					<img
						src="./favicon.png"
						alt="brand logo"
						className="nav-logo"
					/>
					<div className="nav-text"><div>FUTUREP<span>₹</span>ENEURS</div></div>
				</Link>
				<div className="nav-hello"><div>{teamCode}</div></div>
				{isLoggedIn ? <ActionButton onClick={logout} children="Log Out" /> : null}
			</Toolbar>
		</AppBar>
	);
}

export default Navbar;
