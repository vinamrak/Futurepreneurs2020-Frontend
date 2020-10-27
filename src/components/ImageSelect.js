import { Grid } from "@material-ui/core";
import React from "react";
import "./ImageSelect.css";

function ImageSelect({selected, setSelected, images}) {
	return (
		<div className="image-select">
			<Grid container spacing={3} justify="center">
				{images.map(image => (
					<Grid item xs={6}  md={4} className="img-container" style={{border: selected === image.key?"2px #009C07 solid": null}} onClick={() => setSelected(image.key)}>
						<img src={image.src} alt={image.name} className="img-preview" />
					</Grid>
				))}
			</Grid>
		</div>
	)
}

export default ImageSelect;