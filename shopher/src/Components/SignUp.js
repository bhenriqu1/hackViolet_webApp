import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

//MUI Imports
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AuthContext from './AuthContext';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';


const styles = ({
  h2: {
    textAlign: 'center',
    fontWeight: 'normal',
    paddingTop: '1%'
  },
  box: {
    height: '7px',
    marginTop: '-10px',
    width: '300px',
    marginLeft: '39%',
    backgroundImage: 'linear-gradient(to right, black , white)',
  },
  h4: {
    textAlign: 'center',
    fontWeight: 'normal',
    fontSize: '15px',
    marginTop: '40px'
  },
  button: {
    marginTop: '30px',
    position: 'realitve',
    backgroundImage: 'linear-gradient(to right, black , white)',
    width: '100%'
  },
  small: {
    position: 'relative',
    top: '20px',
    marginLeft: '18%',
  },
  formControl: {
    minWidth: 120
  }
})

class SignUp extends Component {
  static contextType = AuthContext;
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      category: '',
      website: '',
      errors: {},
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const userData = {
      email: this.state.email,
      username: this.state.name,
      confirmPassword: this.state.confirmPassword,
      password: this.state.password,
      category: this.state.category,
      website: this.state.website,
      imageUrl: 'https://cdn.shopify.com/s/files/1/0510/5657/files/whats_up_1024x1024.png?v=1610559022'
    }
    axios.post('/signup', userData).then(res => {
      const FBIdToken = `Bearer ${res.data.token}`;
      localStorage.setItem('FBIdToken', FBIdToken);
      axios.defaults.headers.common['Authorization'] = FBIdToken;
      console.log(res);
      axios.post('/editProfile', { category: this.state.category }, { headers: { 'Authorization': `${localStorage.getItem("FBIdToken")}` } })
        .then(res => {
          console.log(res);
          this.context.setLoggedIn(true);
        })
      this.props.history.push('/profile');
    })
      .catch((error) => {
        console.log(error.response)
        this.setState({
          errors: error.response.data
        })
      })
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }


  render() {
    const { classes } = this.props;

    return (
      <div style={{ paddingTop: '90px', paddingBottom: '100px' }}>
        <h1 className={classes.h2}>Sign Up</h1>
        <div className={classes.box}></div>
        <h4 className={classes.h4} >Welcome! Start Creating your Account!</h4>
        <Grid container justify="center">
          <Grid item xs={3}>
            <form style={{ alignItems: 'center' }} noValidate onSubmit={this.handleSubmit}>
              <TextField id="name" name="name" type="text" label="Business Name" value={this.state.name} onChange={this.handleChange} helperText={this.state.errors.username} error={this.state.errors.username ? true : false} fullWidth></TextField>
              <TextField id="email" name="email" type="email" label="Email" value={this.state.email} onChange={this.handleChange} helperText={this.state.errors.email} error={this.state.errors.email ? true : false} fullWidth></TextField>
              <TextField id="password" name="password" type="password" label="Password" helperText={this.state.errors.password} error={this.state.errors.password ? true : false} fullWidth value={this.state.password} onChange={this.handleChange} fullWidth></TextField>
              <TextField id="confirmPassword" name="confirmPassword" type="password" label="Confirm Password" value={this.state.confirmPassword} onChange={this.handleChange} helperText={this.state.errors.confirmPassword} error={this.state.errors.confirmPassword ? true : false} fullWidth></TextField>
              <TextField id="website" name="website" type="text" label="Website" value={this.state.website} onChange={this.handleChange} helperText={this.state.errors.website} error={this.state.errors.website ? true : false} fullWidth></TextField>
              <FormControl className={classes.formControl} fullWidth>
                <InputLabel> Category </InputLabel>
                <Select name="category" value={this.state.category} onChange={this.handleChange} helperText={this.state.errors.category} error={this.state.errors.category ? true : false}>
                  <MenuItem value={"Clothing, Shoes, & Jewelry"}>Clothing, Shoes, & Jewelry</MenuItem>
                  <MenuItem value={"Movies, Music & Games"}>Movies, Music & Games</MenuItem>
                  <MenuItem value={"Electronics"}>Electronics</MenuItem>
                  <MenuItem value={"Home, Garden & Tools"}>Home, Garden & Tools</MenuItem>
                  <MenuItem value={"Pet Supplies"}>Pet Supplies</MenuItem>
                  <MenuItem value={"Food & Grocery"}>Food & Grocery</MenuItem>
                  <MenuItem value={"Beauty & Health"}>Beauty & Health</MenuItem>
                  <MenuItem value={"Toys, Kids & Baby"}>Toys, Kids & Baby</MenuItem>
                  <MenuItem value={"Handmade"}>Handmade</MenuItem>
                </Select>
              </FormControl>
              <Button
                className={classes.button}
                type="submit"
                variant="contained"
                color="primary"
              >Submit
                </Button>
              <br />
              <small className={classes.small}>Already have an account? Login <Link to="/login">here</Link></small>
            </form>
          </Grid>
        </Grid>
      </div>

    );
  }
}

export default withStyles(styles)(SignUp);