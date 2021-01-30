import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import Dialog from '@material-ui/core/Dialog';
import ProfileView from './ProfileView';
const styles = ({
  root: {
    maxWidth: 500,
    alignSelf: 'center'
  },
});

class BusinessCard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      users: [],
      open: false,
      userClicked: {}
    }
    this.openDialog=this.openDialog.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
  }

  openDialog = (props) => {
    this.setState({userClicked: props})
    this.setState({ open: true });
  }

  closeDialog = () => {
    this.setState({ open: false });
  }

  componentWillReceiveProps(newProps) {
    let category = newProps.location.state.category.replace('&amp;', '&');
    axios.post('/category', { category: category }).then(res => {
      this.setState({
        users: res.data
      })
    }).catch(err => console.log(err.response))
  }

  componentDidMount() {
    axios.get('/users').then(res => {
      this.setState({
        users: res.data
      });
    }).catch(err => {
      console.log(err)
      console.log(err.response)
    })
  }

  render() {
    const classes = this.props;
    return (
      <Grid
        container
        direction="row"
        alignItems="center"
        justify="center"
        style={{ paddingTop: '40px' }}
      >
        {this.state.users !== undefined &&
          this.state.users.map((user) => {
            return (
              <Grid item xs={3} style={{ margin: '3%' }}>
                <Card className={classes.root}>
                  <CardActionArea onClick={() => this.openDialog(user)}>
                    <CardMedia
                      component="img"
                      alt={user.username}
                      height="240"
                      image={user.imageUrl}
                      title={user.username}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        {user.username}
                      </Typography>
                      <Typography variant="body2" color="textSecondary" component="p">
                        {user.bio}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
          <Dialog open={this.state.open} onClose={this.closeDialog} fullWidth maxWidth='md'>
             <ProfileView user = {this.state.userClicked}/>
          </Dialog>
      </Grid>
    );
  }
}

export default withStyles(styles)(BusinessCard);