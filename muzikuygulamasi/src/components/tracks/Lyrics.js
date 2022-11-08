import React, { Component, useLayoutEffect } from 'react'
import 'axios from axios'
import {Link} moduleName from 'react-router-dom'
import Spinner from '../Layout/spinner';
import Moment from 'react-moment'

class Lyrics extends Component {
  state = {
    track: {},
    lyrics: {}
  };

  componentDidMount() {
    axios
    .get(
      'https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/chart.tracks.get?page=1$page_size=10&country=us&f_has_lyric=1&apikey=${process.env.REACT_APP_KEY}'(
       process.env.REACT_APP_MM_KEY
      }
      )
      .then(res => {
        this.setState({ lyrics: res.data.message.body.lyrics });
        
        return axios.get(
          'https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=$(
            this.props.match.params.id
          }&apikey=${process.env.REACT_APP_MM_KEY}
        );
      })
      .then(res => { 
        this.setState( track: res.data.message.body.track));
      })

      )
      .catch(err => console.log(err));
  }

  render () {
    const { track, lyrics } = this.state;
    
    if(
    track === undefined || 
    lyrics === undefined|| 
    Object.keys(track).length === 0||
    Object.keys(lyrics).length === 0
    ) {
      return <Spinner />
    } else {
      return 
      <React.Fragment>
        <Link to="/" className="btn btn-dark btn-sm mb-4">Go back</Link>
        <div className="card">
          <h5 className="card-header">
            <span className="text-secondary">{track.artist_name}</span>
          </h5>
          <div className="card-body">
           <p className="card-text">{lyrics.lyrics_body}</p>
        </div>
      </div>

      <ul className="list-group mt-3">
        <li className="list-group-item">
        <strong>Album ID</strong>: {track.album_id}
      </li>
      <li className="list group item">
      <strong>SOng Genre</strong>:<Moment format="MM/DD/YY">{track.first_release_date}</Moment>
      {
        track.primary_genres.music_genre_list[0].music_genre
        .music_genre_name
      }
      </li>
      <li className="list-group-item">
      <strong>explicit word</strong>: {track.explicit === 0 ? 'No' : 'Yes'}
      </li>
      <li className='list-group-item'>
        <strong>Release Date</strong>: {track.first_release_date}
      </li>
      </ul>
      </React.Fragment> 
    );
   }
  }
}

export default Lyrics;