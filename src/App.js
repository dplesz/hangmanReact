import React, { Component } from 'react';
import './App.css';
import wordlist from './wordlist.json';
//import submitLetterForm from './submitLetterForm.js';
var hangmanImage = [];
for (let i=0;i<11;i++) {
  hangmanImage[i] = require('./hangman'+ i +'.png');
}

class App extends Component {
  constructor(props) {
    super(props);
    this.theWord = wordlist[Math.floor(Math.random()*wordlist.length)];
    this.state = {wins:0,loses:0,letters:[],hangmanNumber:0,letter:''};
    this.handleGuess = this.handleGuess.bind(this);
    this.handleChange =  this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange (event) {
    this.setState({letter:event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.handleGuess();
  }


  handleGuess () {
    console.log('handleGuess Called!');
    const theLetter = this.state.letter.toString().toLowerCase();
    const regexp = /^[a-z]$/;
    let letters = this.state.letters;
    console.log(this.state.letters);
    console.log(theLetter);
    if ((theLetter.match(regexp)) &&
        (letters.indexOf(theLetter) === -1)){
        letters.concat([theLetter]);
        console.log('this point has been reached');
        this.setState({letters:letters});
        this.setState({letter:''});
        this.setState({hangmanNumber:this.state.hangmanNumber+1});
      }
  }


// calculate the number of incorrectly guessed letters.
// we want to store as little
// data on the server as possible.
getNumWrong(word,letters){
	var wordArray = word.split('').sort();
	var numWrong = 0;
	for (var i = 0; i < letters.length; i++) {
		if ( wordArray.indexOf(letters[i]) === -1) {
			numWrong++;
		}
	}
	return numWrong;
}

// outputs the word in " _ _ a _ " format.
// this is all the client gets to see, to prevent cheating.
displayWord(word,letters){
	let dWord = '';
	for(let i=0; i< word.length; i++){
		if (letters.indexOf(word[i]) === -1) {
			dWord = dWord + '_';
		} else {
			dWord = dWord + '' + word[i];
		}
	}
	return dWord;
}

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={hangmanImage[this.state.hangmanNumber]} alt=''/>
          <p>{this.displayWord(this.theWord,this.state.letters)}</p>
          <p> word = {this.theWord}, letters = {this.state.letters}</p>
          <form>
            Letter:
            <input type='text' id='letter' maxLength='1' defaultValue='' onChange={this.handleChange} autoFocus='autoFocus'/>
            <input type='button' value='guess' onClick={this.handleGuess}/>
          </form>
        </header>
      </div>
    );
  }
}

export default App;
