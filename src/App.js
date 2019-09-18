import React, { Component } from 'react';
import data from "./mix.json"
import Albums from './components/Albums/Albums.js';
import Artists from './components/Artists/Artists.js';
import Header from './components/Header/Header.js';
import "./App.css"
import End from './components/End/End.js';

class App extends Component {

  constructor() {
    super();
    this.state = {
      data: data.results,
      correctItem: "",
      randomArtists: [],
      round: 1,
      score: 0,
      try: 0,
      sequence: 0,
      komboWin: 1,
      preventDuplicates: [],
      superStars: ["Beyoncé", "Christina Aguilera", "Dave Matthews Band", "Alicia Keys", "The Goo Goo Dolls"]
    }
  }

  allAlbum = () => {
    let mapData = this.state.data.map(function (a) {
      return { img: a.artworkUrl100, artist: a.artistName, id: a.collectionId }
    })
    return mapData
  }


  // **********need to fix to 100% prevent Duplicates album**********
  randomAlbum = () => {
    let arr = this.allAlbum()
    let randomItem = arr[Math.floor(Math.random() * arr.length)]
    if (this.state.preventDuplicates) {
      for (let album of this.state.preventDuplicates) {
        if (album.img === randomItem.img) {
          arr = arr.filter(a=> a !== album )
          randomItem = arr[Math.floor(Math.random() * arr.length)]
        }
      }
    }
    this.setState({
      correctItem: randomItem,
      preventDuplicates: [randomItem, ...this.state.preventDuplicates]
    })
  }

  //random Artists ======================================

  randomArtists = () => {
    let ArtistArr = []
    let unique = []
    ArtistArr.push(this.state.correctItem)
    let arr = this.allAlbum()

    while (unique.length < 5) {
      let randomItem = arr[Math.floor(Math.random() * arr.length)]
      if (ArtistArr[ArtistArr.length - 1].id !== randomItem.id) {
        ArtistArr.push(randomItem)
      }
      unique = [...new Map(ArtistArr.map(obj => [JSON.stringify(obj), obj])).values()];
    }
    return unique
  }

  shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }

    this.setState({
      randomArtists: a
    })
  }


  random = () => {
    this.shuffle(this.randomArtists())
  }

  componentDidMount = async () => {
    await this.randomAlbum()
    await this.random()
  }

  newGame = async () => {
    await this.randomAlbum()
    await this.random()
    await this.setState({
      round: 1,
      score: 0,
      try: 0,
      sequence: 0,
      komboWin: 1
    })
  }

  checkStarts = (artist) => {
   if(this.state.superStars.find(s=> s === artist && s === this.state.correctItem.artist)){
     alert("You've earned 5 bonus points!")
     return 5
   } else{
     return 0
   }
  }

  // guess Answear ========================

  guessAnswer = async (artist) => {

    await this.setState({
      try: this.state.try + 1
    })

    if (this.state.try === 1 && artist === this.state.correctItem.artist && this.state.sequence === 2 && this.state.komboWin >= 2) {
      this.setState({
        score: this.state.score + 10 + Math.pow(10, this.state.komboWin) + this.checkStarts(artist),
        round: this.state.round + 1,
        try: 0,
        sequence: 0,
        komboWin: this.state.komboWin + 1
      })
      await this.randomAlbum()
      await this.random()

    } else if (this.state.try === 1 && artist === this.state.correctItem.artist && this.state.sequence === 2 && this.state.komboWin === 1) {
      this.setState({
        score: this.state.score + 20,
        round: this.state.round + 1,
        try: 0,
        sequence: 0,
        komboWin: this.state.komboWin + 1
      })


      await this.randomAlbum()
      await this.random()

    } else if (this.state.try === 1 && artist === this.state.correctItem.artist) {
      this.setState({
        score: this.state.score + 10 + this.checkStarts(artist),
        round: this.state.round + 1,
        try: 0,
        sequence: this.state.sequence + 1
      })
      await this.randomAlbum()
      await this.random()

    } else if (this.state.try === 2 && artist === this.state.correctItem.artist) {
      this.setState({
        score: this.state.score + 5 + this.checkStarts(artist),
        round: this.state.round + 1,
        try: 0,
        sequence: 0,
        komboWin: 0
      })
      await this.randomAlbum()
      await this.random()

    } else if (this.state.try === 3 && artist === this.state.correctItem.artist) {
      this.setState({
        score: this.state.score + 2 + this.checkStarts(artist),
        round: this.state.round + 1,
        try: 0,
        sequence: 0
      })
      await this.randomAlbum()
      await this.random()

    } else if (this.state.try === 3 && artist !== this.state.correctItem.artist) {
      this.setState({
        score: this.state.score - 5,
        round: this.state.round + 1,
        try: 0,
        sequence: 0
      })
      await this.randomAlbum()
      await this.random()

    }
  }


  render() {
    return (
      <div className="App">
        {this.state.round === 11 ?
          <End score={this.state.score} newGame={this.newGame} />
          :
          <div>
            <Header round={this.state.round} />
            <div className="title">Guess the artist</div>
            <div className="gameSection">
            <Albums correctAns={this.state.correctItem} />
            <Artists randomArtists={this.state.randomArtists} correctAns={this.state.correctItem} guessAnswer={this.guessAnswer} />
            </div>
          </div>
        }
      </div>
    );
  }
}

export default App;
