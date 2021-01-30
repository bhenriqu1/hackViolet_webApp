import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

//MUI Imports
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import {Link} from 'react-router-dom';
import AuthContext from './AuthContext';

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
  small:{
    position: 'relative',
    top: '20px',
    marginLeft: '18%',
    
  }
})

class Login extends Component {
  static contextType = AuthContext;
  constructor(props){
    super(props);
    this.state = {
        email: '',
        password: '',
        errors: {}
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const userData = {
        email: this.state.email,
        password: this.state.password
    }
    axios.post('/login', userData).then(res => {
        const FBIdToken = `Bearer ${res.data.token}`;
        localStorage.setItem('FBIdToken', FBIdToken);
        axios.defaults.headers.common['Authorization'] = FBIdToken;
        this.props.history.push('/profile');
        this.context.setLoggedIn(true);
    })
    .catch((error)=> {
        console.log(error);
        if (error.response.data.error === 'auth/invalid-email'){
            this.setState({
                errors: {
                    email: "Invalid Email"
                } 
            })
        }
        else if (error.response.data.general !== ''){
            this.setState({
                errors: {
                    password: "Wrong Credentials, Please try again"
                }
            })
        }
    })
}

handleChange = (event) => {
    this.setState({
        [event.target.name]: event.target.value
    });
}


  render() {
    const {classes} = this.props;
    return (
      <div style = {{paddingTop: '90px'}}>
        <h1 className = {classes.h2}>Login</h1>
        <div className = {classes.box}></div>
        <h4 className = {classes.h4} >Welcome! Login to set up and view your profile!</h4>
        <Grid container justify = "center">
          <Grid item xs = {3}>
            <form style = {{alignItems: 'center'}} noValidate onSubmit = {this.handleSubmit}>
            <TextField id = "email" name = "email" type = "email" label = "Email" value = {this.state.email} onChange = {this.handleChange} helperText = {this.state.errors.email} error = {this.state.errors.email ? true: false} fullWidth></TextField>
            <TextField id = "password" name = "password" type = "password" label = "Password" helperText = {this.state.errors.password} error = {this.state.errors.password ? true:false} fullWidth value = {this.state.password} onChange = {this.handleChange} fullWidth></TextField>
            <Button 
                className = {classes.button}
                type = "submit" 
                variant = "contained" 
                color = "primary"
                >Submit
                </Button>
            <br/>
            <small className = {classes.small}>Don't have an account? Sign Up <Link to = "/signup">here</Link></small>
            </form>
          </Grid>
        </Grid>
      </div>
    
    );
  }
}

export default withStyles(styles)(Login);