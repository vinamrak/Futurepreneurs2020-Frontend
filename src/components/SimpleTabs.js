import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import SimpleCard from './SimpleCard';
import './SimpleTabs.css';
import {
  PremiumAmenities, EconomyAmenities,
  Marketing,
} from './Data'

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function SimpleTabs(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const togglePremium = (pre) => {
    const premium = props.selectedPremium;
    if (premium.length <= 5) {
      const index = premium.indexOf(pre);
      if (index === -1 && premium.length !== 5)
        premium.push(pre);
      else if (index !== -1)
        premium.splice(index, 1);
      props.setPremium([...premium]);
    }
  }

  const togglePremiumM = (pre) => {
    props.setSelectedPM(pre);
  }

  const toggleEconomyM = (pre) => {
    props.setSelectedEM(pre);
  }

  const toggleEconomy = (pre) => {
    const premium = props.selectedEconomy;
    if (premium.length <= 5) {
      const index = premium.indexOf(pre);
      if (index === -1 && premium.length !== 5)
        premium.push(pre);
      else if (index !== -1)
        premium.splice(index, 1);
      props.setEconomy([...premium]);
    }
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} className="tabs">
          <Tab label="Premium Rooms" {...a11yProps(0)} />
          <Tab label="Standard Rooms" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0} className="scroll">
        <Typography variant="h4" color="primary" className="marketing">
          Amenities {props.selectedPremium.length}/5
          </Typography>
        <Grid container spacing={3} justify="center">
          {PremiumAmenities.map(pre => (
            <Grid item xs={12} md={6} lg={3} onClick={() => togglePremium(pre)} >
              <SimpleCard
                title={pre.title}
                cost={pre.cost}
                imageSource={pre.src}
                style={
                  {
                    border: props.selectedPremium.indexOf(pre) !== -1
                      ? "3px #009C07 solid" : "3px transparent solid",
                    backgroundColor: props.selectedPremium.indexOf(pre) !== -1
                      ? "#009C07" : "#FFFFFF",
                    color: props.selectedPremium.indexOf(pre) !== -1
                      ? "#FFFFFF" : "#000000"
                  }
                } />
            </Grid>
          ))}
        </Grid>
        <br />
        <Typography variant="h4" color="primary" className="marketing">
          Method of Marketing {props.selectedPM === null ? 0 : 1}/1
        </Typography>
        <br />
        <Grid container spacing={3} justify="center">
          {Marketing.map(pre => (
            <Grid item xs={12} md={6} lg={3} onClick={() => togglePremiumM(pre)} >
              <SimpleCard
                title={pre.title}
                cost={pre.cost}
                imageSource={pre.src}
                style={
                  {
                    border: props.selectedPM === pre
                      ? "3px #009C07 solid" : "3px transparent solid",
                    backgroundColor: props.selectedPM === pre
                      ? "#009C07" : "#FFFFFF",
                    color: props.selectedPM === pre
                      ? "#FFFFFF" : "#000000"
                  }
                } />
            </Grid>
          ))}
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={1} className="scroll">
        <Typography variant="h4" color="primary" className="marketing">
          Amenities {props.selectedEconomy.length}/5
          </Typography>
        <Grid container spacing={3} justify="center">
          {EconomyAmenities.map(eco => (
            <Grid item xs={12} md={6} lg={3} onClick={() => toggleEconomy(eco)} >
              <SimpleCard
                title={eco.title}
                cost={eco.cost}
                imageSource={eco.src}
                style={
                  {
                    border: props.selectedEconomy.indexOf(eco) !== -1
                      ? "3px #009C07 solid" : "3px transparent solid",
                    backgroundColor: props.selectedEconomy.indexOf(eco) !== -1
                      ? "#009C07" : "#FFFFFF",
                    color: props.selectedEconomy.indexOf(eco) !== -1
                      ? "#FFFFFF" : "#000000"
                  }
                } />
            </Grid>
          ))}
        </Grid>
        <br />
        <Typography variant="h4" color="primary" className="marketing">
          Method of Marketing {props.selectedEM === null ? 0 : 1}/1
        </Typography>
        <br />
        <Grid container spacing={3} justify="center">
          {Marketing.map(pre => (
            <Grid item xs={12} md={6} lg={3} onClick={() => toggleEconomyM(pre)} >
              <SimpleCard
                title={pre.title}
                cost={pre.cost}
                imageSource={pre.src}
                style={
                  {
                    border: props.selectedEM === pre
                      ? "3px #009C07 solid" : "3px transparent solid",
                    backgroundColor: props.selectedEM === pre
                      ? "#009C07" : "#FFFFFF",
                    color: props.selectedEM === pre
                      ? "#FFFFFF" : "#000000"
                  }
                } />
            </Grid>
          ))}
        </Grid>
      </TabPanel>
    </div>
  );
}
