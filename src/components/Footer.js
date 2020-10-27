import React from "react";
import { AppBar } from "@material-ui/core";
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import './Footer.css'

function Footer() {
	return (
		<AppBar position="static" className="footer" color="secondary" elevation={0}>
			<img src="./assets/ecell-white.png" alt="E-cell VIT" width="180" height="auto" style={{margin:'auto'}}/>
			<span className="iia">IDEATE. INNOVATE. ACTUATE.</span>
			<a href="mailto:helloecellvit@gmail.com">helloecellvit@gmail.com</a>
			<a href="tel:+919971523455">+919971523455</a>
			<div className="bottom">
				<a href="https://twitter.com/ecell_vit"><TwitterIcon /></a>
				<a href="https://www.facebook.com/ecellvit"><FacebookIcon /></a>
				<a href="https://www.linkedin.com/company/ecellvitvellore"><LinkedInIcon /></a>
				<a href="https://www.instagram.com/ecell_vit"><InstagramIcon /></a>
				<a href="https://medium.com/e-cell-vit" ><img src="./assets/mediumLogo.svg" alt="Medium" height="22"/></a>
			</div>
		</AppBar>
	);
}

export default Footer;
