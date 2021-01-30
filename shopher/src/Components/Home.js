import women from '../util/women.jpg';
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import BusinessCard from './BusinessCard';
import Menu from './Menu';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';


const styles = ({
    img: {
        width: '100%',
        opacity: '0.84',
    },
    imageText: {
        position: 'absolute',
        top: '10%',
        left: '2%',
        color: 'rgb(96,94,94)',
        fontWeight: 'normal',
        fontSize: '50px',
        textAlign: 'left', fontFamily: [
            'PT Sans',
            'sans-serif',
        ].join(',')
    }
})

class Home extends Component {
    render() {
        const { classes } = this.props;
        return (
            <Router>
            <div style = {{paddingTop: '65px'}}>
                <img className={classes.img} src={women} />
                <h1 className={classes.imageText}>Help women succeed</h1>
                <div style = {{position: 'relative', marginBottom: '100px'}}>
                <Menu />
                    <Route exact path = "/businessCard" component = {BusinessCard}/>
                </div>
            </div>
            </Router>
        );
    }
}

export default withStyles(styles)(Home);