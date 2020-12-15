import { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { login } from '../../Reducers/user';

//Component & Container Imports
import UnauthNavBar from '../../Components/Display/UnauthNavBar';
import Home from '../../Components/Display/Home';
import AllUsers from '../Users/AllUsers';
import User from '../../Components/Users/User';
import AllVideos from '../../Components/Videos/AllVideos';
import VideoViewer from '../../Components/Videos/VideoViewer';
import NoMatch from '../../Components/Display/NoMatch';
import Footer from '../../Components/Display/Footer'; 
import Login from './Login';
import { getUsers } from '../../Reducers/manageUsers';
import { getVideos } from '../../Reducers/manageVideos';
import VideoSearch from '../../Components/Videos/VideoSearch';
 class UnauthApp extends Component{
  componentDidMount(){
    this.props.getUsers();
    this.props.getVideos();
  }

  render(){
      let { users } = this.props;
      let { videos } = this.props;
      return(
          <div className="unauth-app">
          <UnauthNavBar login={this.props.login} />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>

            <Route path="/users">
              <div id="unauth-users">
                <AllUsers users={this.props.users} />
                <Route exact path="/users/:userId" >
                  <User users={users} />
                </Route>
              </div>
            </Route>
            
            <Route exact path="/users/:userId" >
              <User users={users} />
            </Route>

            <Route path={`/videos`} >
              <AllVideos videos={videos} />
            </Route>

            <Route exact path="/videos/:video">
              <VideoViewer videos={videos} />
            </Route>

            <Route path={'/search'}>
              <VideoSearch videos={videos}/>
            </Route>

            <Route exact path='/login'>
                <Login />
            </Route>

            <Route>
              <NoMatch />
            </Route>
          </Switch>
          <Footer />
        </div>
      )
    }
  }

const mapStateToProps = (state) => ({
    videos: state.videos,
    users: state.users
})
export default connect(mapStateToProps,{login, getUsers, getVideos})(UnauthApp)