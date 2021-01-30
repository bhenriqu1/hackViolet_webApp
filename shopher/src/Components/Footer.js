import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = ({
    root: {
        backgroundColor: 'gainsboro',
        overflow: 'hidden',
        alignItems: 'center',
        width: '100%',
        height: '7%',
        position: "fixed",
        bottom: '0px',
    },
    div: {
        opacity: '3.0',
        filter: 'brightness(70%)',
    },

});

const Footer = (props) => {
    const { classes } = props;
    return (
        <div className="root">
            <AppBar  className={classes.root} style={{top: "auto", bottom: '0px'}}>
                <Toolbar>
                    <Typography style = {{color: 'gray', paddingBottom: '12%'}}>
                        ShopHer &copy; {new Date().getFullYear()}
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>

    );
}

export default withStyles(styles)(Footer);