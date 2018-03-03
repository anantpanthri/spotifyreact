import React , {Component} from 'react';
import './App.css';
class Profile extends Component{
render(){


let artist1 ={name:'', followers:{href:'',total:''},images:[{url:''}], genres:[]};
if(this.props.artist.followers != null){
  artist1 = this.props.artist;

}
  return (
    <div className="profile">
      <img
        alt="Profile"
        className="profile-img"
        src={artist1.images[0].url}
      />
      <div className="profile-info">
    <div className="profile-name">Artist Name: {artist1.name}</div>
    <div className="profile-total">Artist Followers: {artist1.followers.total}</div>
    <div className="profile-popularity">Artist Popularity: {artist1.popularity}</div>
    <div className="profile-genres">
    {

        artist1.genres.map((genre, k)=>{
          genre = genre !== artist1.genres[artist1.genres.length-1]
          ? `${genre},`
          : `&${genre}`

          return (
            <span key={k} > {genre} </span>
          )
        })
    }
    </div>
    </div>
    </div>
  )
}



}

export default Profile;
