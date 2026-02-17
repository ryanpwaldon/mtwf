// Hardcoded question pool — will be replaced with LLM generation later.
export const QUESTION_POOL = [
  {
    text: "Which film won the first-ever Academy Award for Best Picture?",
    choices: [
      { label: "A", text: "Wings" },
      { label: "B", text: "Sunrise" },
      { label: "C", text: "The Jazz Singer" },
      { label: "D", text: "Ben-Hur" },
    ],
    correctLabel: "A",
  },
  {
    text: "What is the highest-grossing film of all time (not adjusted for inflation)?",
    choices: [
      { label: "A", text: "Titanic" },
      { label: "B", text: "Avatar" },
      { label: "C", text: "Avengers: Endgame" },
      { label: "D", text: "Star Wars: The Force Awakens" },
    ],
    correctLabel: "B",
  },
  {
    text: "Who directed 'Schindler's List'?",
    choices: [
      { label: "A", text: "Martin Scorsese" },
      { label: "B", text: "Steven Spielberg" },
      { label: "C", text: "Francis Ford Coppola" },
      { label: "D", text: "Ridley Scott" },
    ],
    correctLabel: "B",
  },
  {
    text: "In 'The Wizard of Oz', what colour are Dorothy's slippers?",
    choices: [
      { label: "A", text: "Silver" },
      { label: "B", text: "Gold" },
      { label: "C", text: "Ruby red" },
      { label: "D", text: "Blue" },
    ],
    correctLabel: "C",
  },
  {
    text: "Which actor played the Joker in 'The Dark Knight'?",
    choices: [
      { label: "A", text: "Jack Nicholson" },
      { label: "B", text: "Jared Leto" },
      { label: "C", text: "Joaquin Phoenix" },
      { label: "D", text: "Heath Ledger" },
    ],
    correctLabel: "D",
  },
  {
    text: "What year was the original 'Jurassic Park' released?",
    choices: [
      { label: "A", text: "1991" },
      { label: "B", text: "1993" },
      { label: "C", text: "1995" },
      { label: "D", text: "1997" },
    ],
    correctLabel: "B",
  },
  {
    text: "Which film features the quote 'Here's looking at you, kid'?",
    choices: [
      { label: "A", text: "Gone with the Wind" },
      { label: "B", text: "The Maltese Falcon" },
      { label: "C", text: "Casablanca" },
      { label: "D", text: "Citizen Kane" },
    ],
    correctLabel: "C",
  },
  {
    text: "Who directed 'Pulp Fiction'?",
    choices: [
      { label: "A", text: "Quentin Tarantino" },
      { label: "B", text: "David Fincher" },
      { label: "C", text: "Coen Brothers" },
      { label: "D", text: "Guy Ritchie" },
    ],
    correctLabel: "A",
  },
  {
    text: "What is the name of the fictional African country in 'Black Panther'?",
    choices: [
      { label: "A", text: "Zamunda" },
      { label: "B", text: "Wakanda" },
      { label: "C", text: "Genovia" },
      { label: "D", text: "Latveria" },
    ],
    correctLabel: "B",
  },
  {
    text: "Which animated film features a character named 'Buzz Lightyear'?",
    choices: [
      { label: "A", text: "Finding Nemo" },
      { label: "B", text: "Monsters, Inc." },
      { label: "C", text: "Toy Story" },
      { label: "D", text: "The Incredibles" },
    ],
    correctLabel: "C",
  },
  {
    text: "In 'The Matrix', what colour pill does Neo take?",
    choices: [
      { label: "A", text: "Blue" },
      { label: "B", text: "Green" },
      { label: "C", text: "Yellow" },
      { label: "D", text: "Red" },
    ],
    correctLabel: "D",
  },
  {
    text: "Which film has the famous line 'I'll be back'?",
    choices: [
      { label: "A", text: "The Terminator" },
      { label: "B", text: "Predator" },
      { label: "C", text: "Total Recall" },
      { label: "D", text: "Commando" },
    ],
    correctLabel: "A",
  },
  {
    text: "What type of animal is Simba in 'The Lion King'?",
    choices: [
      { label: "A", text: "Tiger" },
      { label: "B", text: "Leopard" },
      { label: "C", text: "Lion" },
      { label: "D", text: "Cheetah" },
    ],
    correctLabel: "C",
  },
  {
    text: "Who played Forrest Gump in the 1994 film?",
    choices: [
      { label: "A", text: "Tom Hanks" },
      { label: "B", text: "Robin Williams" },
      { label: "C", text: "Bill Murray" },
      { label: "D", text: "Kevin Costner" },
    ],
    correctLabel: "A",
  },
  {
    text: "What is Indiana Jones' weapon of choice?",
    choices: [
      { label: "A", text: "Sword" },
      { label: "B", text: "Whip" },
      { label: "C", text: "Boomerang" },
      { label: "D", text: "Crossbow" },
    ],
    correctLabel: "B",
  },
  {
    text: "Which 1997 film was the first to gross over $1 billion worldwide?",
    choices: [
      { label: "A", text: "Jurassic Park" },
      { label: "B", text: "Star Wars: A New Hope" },
      { label: "C", text: "Titanic" },
      { label: "D", text: "The Lion King" },
    ],
    correctLabel: "C",
  },
  {
    text: "In 'The Shawshank Redemption', what does Andy Dufresne use to escape?",
    choices: [
      { label: "A", text: "A spoon" },
      { label: "B", text: "A rock hammer" },
      { label: "C", text: "A pickaxe" },
      { label: "D", text: "A crowbar" },
    ],
    correctLabel: "B",
  },
  {
    text: "Who directed 'Inception'?",
    choices: [
      { label: "A", text: "Denis Villeneuve" },
      { label: "B", text: "Ridley Scott" },
      { label: "C", text: "Christopher Nolan" },
      { label: "D", text: "James Cameron" },
    ],
    correctLabel: "C",
  },
  {
    text: "What is the name of the ship in 'Alien'?",
    choices: [
      { label: "A", text: "Nostromo" },
      { label: "B", text: "Sulaco" },
      { label: "C", text: "Prometheus" },
      { label: "D", text: "Enterprise" },
    ],
    correctLabel: "A",
  },
  {
    text: "Which actor has won the most Academy Awards for Best Actor?",
    choices: [
      { label: "A", text: "Jack Nicholson" },
      { label: "B", text: "Daniel Day-Lewis" },
      { label: "C", text: "Tom Hanks" },
      { label: "D", text: "Marlon Brando" },
    ],
    correctLabel: "B",
  },
  {
    text: "In which film does the character Tyler Durden appear?",
    choices: [
      { label: "A", text: "American Psycho" },
      { label: "B", text: "Fight Club" },
      { label: "C", text: "Se7en" },
      { label: "D", text: "Memento" },
    ],
    correctLabel: "B",
  },
  {
    text: "What is the name of the planet in 'Avatar'?",
    choices: [
      { label: "A", text: "Pandora" },
      { label: "B", text: "Endor" },
      { label: "C", text: "Arrakis" },
      { label: "D", text: "Tatooine" },
    ],
    correctLabel: "A",
  },
  {
    text: "Which studio produced 'Spirited Away'?",
    choices: [
      { label: "A", text: "Pixar" },
      { label: "B", text: "Studio Ghibli" },
      { label: "C", text: "Toei Animation" },
      { label: "D", text: "DreamWorks" },
    ],
    correctLabel: "B",
  },
  {
    text: "What is Darth Vader's real name?",
    choices: [
      { label: "A", text: "Luke Skywalker" },
      { label: "B", text: "Obi-Wan Kenobi" },
      { label: "C", text: "Anakin Skywalker" },
      { label: "D", text: "Han Solo" },
    ],
    correctLabel: "C",
  },
  {
    text: "In 'Jaws', what type of shark terrorises the town?",
    choices: [
      { label: "A", text: "Hammerhead" },
      { label: "B", text: "Tiger shark" },
      { label: "C", text: "Bull shark" },
      { label: "D", text: "Great white" },
    ],
    correctLabel: "D",
  },
  {
    text: "Who composed the music for 'The Lord of the Rings' trilogy?",
    choices: [
      { label: "A", text: "Hans Zimmer" },
      { label: "B", text: "John Williams" },
      { label: "C", text: "Howard Shore" },
      { label: "D", text: "James Horner" },
    ],
    correctLabel: "C",
  },
  {
    text: "What year was 'The Godfather' released?",
    choices: [
      { label: "A", text: "1970" },
      { label: "B", text: "1972" },
      { label: "C", text: "1974" },
      { label: "D", text: "1976" },
    ],
    correctLabel: "B",
  },
  {
    text: "In 'E.T. the Extra-Terrestrial', what candy does Elliott use to lure E.T.?",
    choices: [
      { label: "A", text: "Skittles" },
      { label: "B", text: "M&M's" },
      { label: "C", text: "Reese's Pieces" },
      { label: "D", text: "Jelly beans" },
    ],
    correctLabel: "C",
  },
  {
    text: "Which Pixar film features the emotion characters Joy and Sadness?",
    choices: [
      { label: "A", text: "Up" },
      { label: "B", text: "Inside Out" },
      { label: "C", text: "Soul" },
      { label: "D", text: "Coco" },
    ],
    correctLabel: "B",
  },
  {
    text: "Who played Jack Sparrow in 'Pirates of the Caribbean'?",
    choices: [
      { label: "A", text: "Orlando Bloom" },
      { label: "B", text: "Johnny Depp" },
      { label: "C", text: "Geoffrey Rush" },
      { label: "D", text: "Javier Bardem" },
    ],
    correctLabel: "B",
  },
];
