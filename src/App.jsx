import React, {Component} from 'react';
import './App.css';
import {FormGroup, FormControl, InputGroup, Glyphicon } from 'react-bootstrap';
import Profile from './Profile';
import Gallery from './Gallery';

class App extends Component {

constructor(props){
  super(props);
  this.state={
    query:'',
    artist:null,
    tracks:[]
  }
}

search(){

  const BASE_URL='https://api.spotify.com/v1/search?';
  let FETCH_URL =BASE_URL+'q='+this.state.query
  +'&type=artist&limit=1';
  const ALBUM_URL = 'https://api.spotify.com/v1/artists/';
 const auth_token = 'Bearer BQAf-jvxLT4sTl5ODfpPWxr0TkfTiPn7tO-mWiFuC9JZYlUZlmdQ_Hq9PjeBMrvCDDWmcJDSqohCWai9jA2MjMkVyp9-XzScywR3M4sROgafamSeLv0YD8c9Cl00XPR-rJaXPFJ4VBo0ZVtrIM3j7FzGc0N8sXevPwe4fAwTq1IjijMANQ&refresh_token=AQCe1_FJMajjfpblQ2s74KUZOKj678CFsa6mg9ffSQGJSWu6FwUq2lI_xALJpOoMJhr61-DXTmum-M8wkShH38grzqIpNpwuAmwobBISIZFWB1yWLGCDU7r0srsPyLBT95A';


  fetch(FETCH_URL,{
    method:'GET',
    headers: {
      'Content-Type' :'application/json',
      'Authorization': auth_token,
      },
    mode: 'cors',
    cache:'default'
  })

  .then(response =>
      Promise.resolve({
      data:response.json(),
      status: response.status
    })
    .then(post => post.data)
    .then(json =>json.artists)
    .then(items =>{
      console.log(items);
        const artist=items.items[0];
          this.setState(artist);
          FETCH_URL = `${ALBUM_URL}${artist.id}/top-tracks?country=US&`
          fetch(FETCH_URL,{
            method:'GET',
            headers: {
              'Content-Type' :'application/json',
              'Authorization': auth_token,
              },
          })
          .then(response =>response.json())
          .then(json => {
            console.log('artist',json);
            const tracks=json.tracks;
            this.setState({tracks});
          })

  })
  );

}


render(){
      return (
        <div className="App-out">
          <div className="App-title"> React-Spotify</div>
          <FormGroup>
            <InputGroup>
              <FormControl
                type="text"
                placeholder="Search music"
                value ={this.state.query}
                onChange={event =>{this.setState({query:event.target.value})}}
                onKeyPress={event=>{
                  if(event.key==='Enter')
                    this.search();

                }}
              />

        <InputGroup.Addon onClick={()=>this.search()}>
          <Glyphicon glyph="search"></Glyphicon>
        </InputGroup.Addon>
        </InputGroup>
      </FormGroup>
      {
        this.state !==null
        ?
          <div>
            <Profile
              artist={this.state}
          />
          <Gallery
            tracks={this.state.tracks}
          />
          </div>
     :<div></div>
  }
  </div>
)

}

}
export default App;
