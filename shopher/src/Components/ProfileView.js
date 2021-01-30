import React, { Component } from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import IG_icon from '../util/IG_icon.png';


const styles = ({
  button: {
    background: 'gainsboro',
    width: '50%',
  },
  h1: {
    fontWeight: 'normal',
  },
  box: {
    height: '10px',
    width: '900px',
    marginLeft: '17%',
    backgroundImage: 'linear-gradient(to right, black , white)',
  },
  h3: {
    fontWeight: 'normal',
    display: 'inline-block',
    paddingTop: '5px',
    paddingLeft: '30%'
  },
  h32: {
    fontWeight: 'normal',
    display: 'inline-block',
    paddingTop: '5px',
    paddingLeft: '20%',
    textAlign: 'center',
    maxWidth: '400px'
  },
  img: {
    display: 'block',
    paddingTop: '30px',
    width: '200px',
    height: '200px'
  },
  IG: {
    width: "42px",
    height: "42px",
    "&:hover": {
      opacity: '0.7'
    }
  }
})

class ProfileView extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      place: '',
      bio: '',
      story: '',
      website: '',
      socialMedia: '',
      imageUrl: '',
      category: ''
    }
  }
  

  componentDidMount(){
    console.log(this.props.user);
    this.setState({
      name: this.props.user.username,
      email: this.props.user.email,
      place: this.props.user.place,
      bio: this.props.user.bio,
      story: this.props.user.story,
      website: this.props.user.website,
      socialMedia: this.props.user.socialMedia,
      imageUrl: this.props.user.imageUrl,
      category: this.props.user.category

    })
  }


  render() {
    const { classes } = this.props;
    return (
      <div className="profileLeft" style={{ padding: '32px' }}>
        <Grid container spacing={24}>
          <Grid item xs={12} sm={4}>
            <img className={classes.img} src={this.state.imageUrl} alt={this.state.name}></img>
            <h1>{this.state.name}</h1>
            <h2 style={{ color: 'gray' }}>{this.state.category}</h2>
            <a href={this.state.website}>{this.state.name} Website</a>
            <p>Location:  {this.state.place}</p>
            <a href={"https://www.instagram.com/" + this.state.socialMedia}><img className={classes.IG} title="Instagram" src={IG_icon} onClick={"https://www.instagram.com/" + this.state.socialMedia} /></a>
          </Grid>
          <Grid item xs={12} sm={8} style={{ marginTop: '50px' }}>
            <Paper elevation={3} style={{ marginBottom: '20px' }}>
              <div style={{ padding: '20px' }}>
                <h2>About {this.state.name}</h2>
                <p>{this.state.bio}</p>
              </div></Paper>
            <Paper elevation={3} style={{ marginBottom: '20px' }}>
              <div style={{ padding: '20px' }}>
                <h2>How we began...</h2>
                <p>{this.state.story}</p>
              </div>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(ProfileView);