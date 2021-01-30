import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import AuthContext from './components/AuthContext';

const styles = ({
  root: {
    display: 'flex',
    flexGrow: 1,
    backgroundColor: 'grey',
    overflowX: 'hidden',
  },
  img: {
    maxWidth: '60px',
    height: 'auto',
    marginRight: '12px'
  },
  title: {
    flexGrow: 1,
    textDecoration: 'none',
    color: "#fff",
    textAlign: 'left',
    fontSize: '36px',
    "&:hover": {
      color: "gainsboro"
    }
  },
  div: {
    opacity: '3.0',
    filter: 'brightness(70%)'
  },
  button: {
    opacity: '0.8',
    color: 'white',
    fontSize: '18px',
    marginRight: '10px',
    textTransform: 'none'
  }

});

const Navbar = (props) => {
  const { classes } = props;
  return (
    <AuthContext.Consumer>
      {({ loggedIn, setLoggedIn }) => (
        <AppBar position="fixed" className={classes.root} elevation={0}>
          <Toolbar>
            <img className={classes.img} src="./../../lotusWhite.png?" alt="ShopHer" />
            <Typography className={classes.title}>ShopHer</Typography>
            <Button className={classes.button} component={Link} to="/">Home</Button>
            {loggedIn ? (
              <div>   
                <Button className={classes.button} component={Link} to="/profile">Profile</Button>
                <Button className={classes.button} component={Link} to="/login"
                  onClick={() => {
                    localStorage.removeItem("FBdDToken");
                    setLoggedIn(false);
                  }}
                >Logout</Button>
              </div>
            ) : (
                <Button className={classes.button} component={Link} to="/login">Login</Button>
              )}
          </Toolbar>
        </AppBar>
      )}
    </AuthContext.Consumer>

  );
}

export default withStyles(styles)(Navbar);