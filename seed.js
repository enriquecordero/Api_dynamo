const axios = require("axios");
const {addOrUpdateCharacter} = require('./dynamo')

const seedData = async () => {
  const url = 'http://hp-api.herokuapp.com/api/characters';

  try {
    const { data:characters } = await axios.get(url);

    const characterPromise = characters.map((character, i) =>
      addOrUpdateCharacter({ ...character, id: i + '' })
   
      );
    await Promise.all(characterPromise);
  } catch (err) {
    console.error(err);
    console.log("ERROR SEED");
  }
};

seedData();
