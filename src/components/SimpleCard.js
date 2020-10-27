import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, CardContent, Card } from '@material-ui/core';
import './SimpleCard.css'

const useStyles = makeStyles({
  content: {
    padding: 0
  },
  title: {
    display: 'block',
  },
  pos: {
    marginBottom: 12,
  },
  img: {
    objectFit: 'cover',
    width: '100%',
    height: 200
  }
});

export default function SimpleCard(props) {
  const classes = useStyles();
  return (
    <Card className="card-item-fp" style={props.style}>
      <CardContent className={classes.content}>
        <img className={classes.img} src={props.imageSource} alt={props.title} />
        <div className="img-overlay">
          <Typography variant="h5" className={classes.title}>
            {props.title}
          </Typography>
        </div>
        <Typography variant="h4" className={classes.pos} >
          ₹{props.cost}
        </Typography>
      </CardContent>
    </Card>
  );
}
