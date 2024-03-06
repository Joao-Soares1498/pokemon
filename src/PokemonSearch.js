import React, { useState, useEffect } from "react";
import "./PokemonSearch.css";

function PokemonSearch() {
  const [pokemonName, setPokemonName] = useState("");
  const [pokemonData, setPokemonData] = useState(null);
  const [error, setError] = useState(null);
  const [currentPokemonId, setCurrentPokemonId] = useState(1);
  const [matchedPokemonNames, setMatchedPokemonNames] = useState([]);

  useEffect(() => {
    fetchPokemon(currentPokemonId);
  }, [currentPokemonId]);

  const fetchPokemon = async (id) => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      if (!response.ok) {
        throw new Error("Pokemon not found!");
      }
      const data = await response.json();
      setPokemonData({
        name: data.name,
        number: data.id,
        sprite: data.sprites.front_default,
      });
      setError(null);
    } catch (error) {
      if (error instanceof Error) {
        setError(error);
      } else {
        setError(new Error("An unknown error occurred"));
      }
      setPokemonData(null);
    }
  };

  const handlePrevious = () => {
    if (currentPokemonId > 1) {
      setCurrentPokemonId(currentPokemonId - 1);
    }
  };

  const handleNext = () => {
    setCurrentPokemonId(currentPokemonId + 1);
  };

  const handleChange = (event) => {
    const inputText = event.target.value;
    setPokemonName(inputText);
    if (inputText.trim() === "") {
      setMatchedPokemonNames([]);
      return;
    }
    const matchedNames = pokemonNames.filter((name) =>
      name.toLowerCase().includes(inputText.toLowerCase())
    );
    setMatchedPokemonNames(matchedNames);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (matchedPokemonNames.length > 0) {
      const firstMatchedPokemonName = matchedPokemonNames[0];
      const matchedPokemon = pokemonList.find(
        (pokemon) => pokemon.name === firstMatchedPokemonName
      );
      if (matchedPokemon) {
        setCurrentPokemonId(matchedPokemon.id);
      }
    }
  };

  useEffect(() => {
    const fetchPokemonNames = async () => {
      try {
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=151"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch Pokemon data");
        }
        const data = await response.json();
        const pokemonList = data.results;
        const names = pokemonList.map((pokemon) => pokemon.name);
        setPokemonNames(names);
      } catch (error) {
        console.error("Error fetching Pokemon names:", error);
      }
    };

    fetchPokemonNames();
  }, []);

  const [pokemonNames, setPokemonNames] = useState([]);
  const [pokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    const list = [];
    pokemonNames.forEach((name, index) => {
      list.push({ name, id: index + 1 });
    });
    setPokemonList(list);
  }, [pokemonNames]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={pokemonName}
          onChange={handleChange}
          placeholder="Enter Pokémon name"
        />
        <button type="submit">Search</button>
      </form>
      {error && <p>{error.message}</p>}
      {matchedPokemonNames.length > 0 && (
        <ul className="match-list">
          <div className="list-title">Matching Names</div>
          {matchedPokemonNames.map((name, index) => (
            <li key={index}>{name}</li>
          ))}
        </ul>
      )}
      {pokemonData && (
        <div>
          <h2 className="pokemon-name">{pokemonData.name}</h2>
          <p>
            Number: <div className="pokemon-number">{pokemonData.number}</div>
          </p>
          <img src={pokemonData.sprite} alt={pokemonData.name} />
        </div>
      )}
      <button type="button" onClick={handlePrevious}>
        Previous
      </button>
      <button type="button" onClick={handleNext}>
        Next
      </button>
    </div>
  );
}

export default PokemonSearch;
