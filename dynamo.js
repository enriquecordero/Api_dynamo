const AWS = require("aws-sdk");
require("dotenv").config();

AWS.config.update({
  region: "us-east-1",
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const dynamoClient = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = "harrypoter-api";

const getCharacter = async () => {
  const params = {
    TableName: TABLE_NAME,
  };

  const characters = await dynamoClient.scan(params).promise();
  console.log(characters);
  return characters;
};
const addOrUpdateCharacter = async (character) => {
  const params = {
    TableName: TABLE_NAME,
    Item: character,
  };
  return await dynamoClient.put(params).promise();
};
const getCharacterById = async (id) => {
    const params = {
      TableName: TABLE_NAME,
      Key: {
          id,
      },
    }
    const character = await dynamoClient.get(params).promise();
     console.log(character);
    return character
};
const delCharacterById = async (id) => {
    const params = {
      TableName: TABLE_NAME,
      Key: {
          id,
      },
    }
    const character = await dynamoClient.delete(params).promise();
     console.log(`El siguiente character: ${character} fue eliminado`);
    return character
};


const harryPotter = {
  id: "0",
  name: "Harry Potter",
  alternate_names: [],
  species: "human",
  gender: "male",
  house: "Gryffindor",
  dateOfBirth: "31-07-1980",
  yearOfBirth: 1980,
  wizard: true,
  ancestry: "half-blood",
  eyeColour: "green",
  hairColour: "black",
  wand: {
    wood: "holly",
    core: "phoenix feather",
    length: 11,
  },
};

module.exports = {
    dynamoClient,
    getCharacter,
    getCharacterById,
    delCharacterById,
    addOrUpdateCharacter
}

//addOrUpdateCharacter(harryPotter);
//getCharacter();
//getCharacterById("0")


