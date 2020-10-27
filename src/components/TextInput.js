import { TextField, withStyles } from "@material-ui/core";

const TextInput = withStyles({
	root: {
		"& label": {
			color: "#dddddd",
		},
		"& label.Mui-focused": {
			color: "#009C07",
		},
		"& .MuiInput-underline:after": {
			borderBottomColor: "#009C07",
		},
		"& .MuiInputBase-input": {
			color: "#333333 !important",
		},
		"& .MuiOutlinedInput-root": {
			"& fieldset": {
				borderColor: "#dddddd",
				borderRadius: "25px",
			},
			"&:hover fieldset": {
				borderColor: "#009C07",
			},
			"&.Mui-focused fieldset": {
				borderColor: "#009C07",
			},
		},
	},
})(TextField);

export default TextInput;
