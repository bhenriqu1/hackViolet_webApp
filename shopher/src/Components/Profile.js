import React, { Component } from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
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
    height: '200px',
    cursor: 'pointer'
  },
  IG: {
    width: "42px",
    height: "42px",
    "&:hover": {
      opacity: '0.7'
    }
  }
})

class Profile extends Component {
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
      category: '',
      openEdit: false,
      imageLoading: false
    }
  }

  handleOpenEdit = () => {
    this.setState({ openEdit: true });
  }

  handleCloseEdit = () => {
    this.setState({ openEdit: false });
  }

  handleSubmitEdit = () => {
    axios.post('/editProfile',
      { bio: this.state.bio, socialMedia: this.state.socialMedia}, { headers: { 'Authorization': `${localStorage.getItem("FBIdToken")}` } }).then(res => {
        console.log(res);
      }).catch(err => console.log(err.response));
    
    axios.post('/editProfile',
      { place: this.state.place, story: this.state.story }, { headers: { 'Authorization': `${localStorage.getItem("FBIdToken")}` } }).then(res => {
        console.log(res);
      }).catch(err => console.log(err.response));
    this.setState({ openEdit: false });
  }

  componentDidMount() {
    axios.get('/userInfo', { headers: { 'Authorization': `${localStorage.getItem("FBIdToken")}` } }).then(res => {
      console.log(res.data);
      this.setState({
        name: res.data.username,
        email: res.data.email,
        place: res.data.place,
        bio: res.data.bio,
        story: res.data.story,
        website: res.data.website,
        socialMedia: res.data.socialMedia,
        imageUrl: res.data.imageUrl,
        category: res.data.category
      })
    }).catch(err => console.log(err.response))
  }

  handleImageUpload = (event) => {
    this.setState({ imageLoading: true });
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append('image', image, image.name);
    axios.post('/uploadImage', formData, { headers: { 'Authorization': `${localStorage.getItem("FBIdToken")}` } }).then(res => {
      axios.get('/userInfo', { headers: { 'Authorization': `${localStorage.getItem("FBIdToken")}` } }).then(res => {
        this.setState({
          imageUrl: res.data.imageUrl,
        })
      }).catch(err => console.log(err.response))
    }).catch(err => console.log(err.response))
    this.setState({ imageLoading: false });
  }

  handleEditPicture = () => {
    const fileInput = document.getElementById('imageInput');
    fileInput.click();
  }

  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };


  render() {
    const { classes } = this.props;
    return (
      <div className="profileLeft" style={{ padding: '80px 80px 100px 80px' }}>
        <Grid container spacing={24}>
          <Grid item xs={12} sm={4}>
            <Tooltip title="Upload Image" placement="bottom-start">
              <Grid >
                <img onClick={this.handleEditPicture} className={classes.img} src={this.state.imageUrl} alt={this.state.name}></img>
                <input type="file" id="imageInput" hidden='hidden' onChange={this.handleImageUpload} />
              </Grid>
            </Tooltip>
            <h1>{this.state.name}</h1>
            <h2 style={{ color: 'gray' }}>{this.state.category}</h2>
            <a href={this.state.website}>{this.state.name} Website</a>
            <p>Location:  {this.state.place}</p>
            <a href={"https://www.instagram.com/" + this.state.socialMedia}><img className={classes.IG} title="Instagram" src={IG_icon} onClick={"https://www.instagram.com/" + this.state.socialMedia} /></a>
            <div style={{marginTop: '32px'}}>
              <Button onClick={this.handleOpenEdit} className={classes.button}>Edit Profile</Button>
            </div>
            <Dialog open={this.state.openEdit} onClose={this.handleCloseEdit} fullWidth maxWidth='sm'>
              <DialogTitle>Edit Your Profile</DialogTitle>
              <DialogContent>
                <form>
                  <TextField name='bio' type='text' label='Bio' value={this.state.bio} onChange={this.onChange} fullWidth></TextField>
                  <TextField name='place' type='text' label='Location' value={this.state.place} onChange={this.onChange} fullWidth></TextField>
                  <TextField name='socialMedia' type='text' label='Instagram Handle' value={this.state.socialMedia} onChange={this.onChange} fullWidth></TextField>
                  <TextField name='story' type='text' label='How you began' value={this.state.story} onChange={this.onChange} fullWidth></TextField>
                </form>
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleCloseEdit} color="primary">Cancel</Button>
                <Button onClick={this.handleSubmitEdit} color="primary">Submit</Button>
              </DialogActions>
            </Dialog>
          </Grid>
          <Grid item xs={12} sm={8} style={{ marginTop: '50px' }}>
            <Paper elevation={3} style={{ margin: '40px' }}>
              <div style={{ padding: '32px' }}>
                <h2>About {this.state.name}</h2>
                <p>{this.state.bio}</p>
              </div></Paper>
            <Paper elevation={3} style={{ margin: '40px' }}>
              <div style={{ padding: '32px' }}>
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

export default withStyles(styles)(Profile);