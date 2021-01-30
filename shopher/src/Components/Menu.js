import React, {useState, useEffect, Component} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';
import {withRouter, Link} from 'react-router-dom'



const styles = ({
    root: {
      display: 'flex',
      flexGrow: 1,
      backgroundColor: 'grey',
      overflowX: 'hidden',
      alignItems: 'center'
    },
    title: {
      flexGrow: 1,
      textDecoration: 'none',
    },
    div: {
      opacity: '3.0',
      filter: 'brightness(70%)',
    },
    button: {
      opacity: '0.8',
      color: 'white',
      marginRight: '10px',
      fontSize: '16px',
      textTransform: 'none'
    }
    
});

class Menu extends Component {
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount(){
    console.log('com');
    this.props.history.push('/businessCard', {category: ''});
  }

  handleClick = (event) => {
    this.props.history.push('/businessCard', {category: event.target.innerHTML});
  }

  render(){
    const classes = this.props.classes;
    return (
      <div>
        <div className = "root">
        <AppBar position="static" className = {classes.root} elevation = {0}>
            <Toolbar>
              <Button id = 'Clothing, Shoes, & Jewelry' className = {classes.button} onClick = {this.handleClick} >Clothing, Shoes, & Jewelry</Button>
              <Button className = {classes.button} onClick = {this.handleClick} >Movies, Music & Games</Button>              
              <Button className = {classes.button} onClick = {this.handleClick} >Electronics</Button>
              <Button className = {classes.button} onClick = {this.handleClick} >Home, Garden & Tools</Button>
              <Button className = {classes.button} onClick = {this.handleClick} >Pet Supplies</Button>
              <Button className = {classes.button} onClick = {this.handleClick} >Food & Grocery</Button>
              <Button className = {classes.button} onClick = {this.handleClick} >Beauty & Health</Button>
              <Button className = {classes.button} onClick = {this.handleClick} >Toys, Kids & Baby</Button>
              <Button className = {classes.button} onClick = {this.handleClick} >Handmade</Button>
            </Toolbar>
          </AppBar>
        </div>      
      </div>
  
    );
  }
  }
  
  export default withRouter(withStyles(styles)(Menu));