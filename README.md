# Pokemon Challenge

This is the solution for the challenge "Apprenticeship Developer - Coding
Challenge"

The Challenge
To demonstrate your ability to work well within Subvisual’s usual tech stack,
please write a new React or Phoenix application that performs the following
tasks:

1. Have a web page that allows a user to enter a Pokémon name;
2. When submitting, query https://pokeapi.co and display the given
Pokémon (at least name, number, and sprite), or an error message if no
match is found;
3. Provide “Previous” & “Next” buttons, that switch to the previous/next
Pokémon, based on their id number;

4. Provide a text-based search feature, where inputting a name or partial
name should look for a matching Pokémon and show it
5. Have at least two automated tests, for the two features above.
6. (Optional) Build a caching mechanism to prevent making a request to
https://pokeapi.co each time we search for a Pokémon

## Solution

Technologies:
- React
- HTML
- CSS
- JavaScript

This solution was implmented with only one component "PokemonSearch".

My interpretation of the problem lead me to create a text input where when typed part of the pokemon name it appears a list of all pokemons that have partially the same words.

when the name is typed and the search button is clicked if it is correctly typed the pokemon stats will appear ( Name, number and sprite).

By clicking on the next and previous button it will display the pokemon with the number (ID) one higher or one lower respectively.

By default the one displayed is number 1.

This is a simple solution and could be prettier but I had some problems on github configuration and had to create a new repository.
