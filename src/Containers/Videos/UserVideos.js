import { Component } from 'react';
import { connect } from 'react-redux';
import VideoList from '../../Components/Videos/VideoList';
import VideoViewer from '../../Components/Videos/VideoViewer';
import { Route } from 'react-router-dom';
import { getVideos } from '../../Reducers/manageVideos'

class UserVideos extends Component{
    componentDidMount(){
        if(this.props.videos.length === 0){
            this.props.getVideos();
        }
    }
    render(){
        let myVids = this.props.videos.videos.filter(video => video.user_id === this.props.user.id);
        
        return(
            <div>
                <VideoList videos={myVids} />
                <Route path={`videos/:videoId`} render={(routerProps) => 
                    <VideoViewer video={myVids.filter(video => video.uid === routerProps.match.params.videoId)} />}
                />
            </div>
        )
    }
};

const mapStateToProps = (state) => ({
  videos: state.videos  
})


export default connect(mapStateToProps, {getVideos})(UserVideos);