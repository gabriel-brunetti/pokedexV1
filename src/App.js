import React, { Component } from "react";

import "./App.css";
import Pokemon from './components/Pokemon'

class App extends Component {
  constructor() {
    super();
    this.state = {
      pokemons: [],
      pokemonsDetails: [],
      offset: 0,
      loadNumber: 6,
    };
    this.handleMoreClick = this.handleMoreClick.bind(this);
  }

  getNextOffset() {
    return this.state.offset+this.state.loadNumber
  }

  handleMoreClick(event) {
    const newOffset = this.getNextOffset();
    this.setState({offset: newOffset}, ()=> {
      console.log("Offset: " + this.state.offset)
      this.getMorePokemon()
    })
  }

  componentDidMount() {
    this.getMorePokemon();
  }

  getMorePokemon() {
    let url ="https://pokeapi.co/api/v2/pokemon?offset=" + this.state.offset +"&limit=" + this.state.loadNumber;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          this.setState({ pokemons: data.results })
          
          this.state.pokemons.map((pokemon) => {
            fetch(pokemon.url)
              .then((response) => response.json())
              .then((data) => {
                if (data) {
                  let temp = this.state.pokemonsDetails;
                  temp.push(data);
                  this.setState({ pokemonsDetails: temp });
                }
              })
              .catch(console.log);
          });
        };
      })
      .catch(console.log);
    }

  render() {
    const { pokemonsDetails } = this.state;

    const renderedPokemonList = pokemonsDetails.map((pokemon, index) => {
      return (<Pokemon pokemon={pokemon} />);
    });

    return (
      <div className="container">
        <div className="card-columns">{renderedPokemonList}</div>
        <button 
          type="button" 
          className="btn btn-secondary btn-block" 
          key="more-button" 
          onClick={this.handleMoreClick}>
            Carregar Mais
          </button>
      </div>
    );
  }
}

export default App;
