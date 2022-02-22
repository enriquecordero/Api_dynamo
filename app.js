const express = require('express');
const { getCharacter, getCharacterById, addOrUpdateCharacter,delCharacterById } = require('./dynamo');
const app = express();

app.use(express.json());

app.get('/',(req,res)=>{
    res.send('hello word')
})

app.get('/characters', async(req,res)=>{
    try {
        const characters = await getCharacter();
        res.json(characters)
    } catch (error) {
        console.log(err)
        res.status(500).json({err:"Algo mal"})
    }
})

app.get('/characters/:id', async(req,res)=>{
    const id = req.params.id
    try {
        const characters = await getCharacterById(id);
        res.json(characters)
    } catch (error) {
        console.log(err)
        res.status(500).json({err:"Algo mal"})
    }
})

app.post('/characters', async(req,res)=>{
    const character = req.body
    


    try {
        const newCharacters = await addOrUpdateCharacter(character);
        res.json(newCharacters)
    } catch (error) {
        console.log(err)
        res.status(500).json({err:"Algo mal"})
    }
})

app.put('/characters/:id', async(req,res)=>{
    const character = req.body;
    const {id} = req.params;
    character.id = id;

    try {
        const updateCharacters = await addOrUpdateCharacter(character);
        res.json(updateCharacters)
    } catch (error) {
        console.log(err)
        res.status(500).json({err:"Algo mal"})
    }
})

app.delete('/characters/:id', async(req,res)=>{
    
    const id = req.params.id


    try {
        const delCharacters = await delCharacterById(id);
        res.json(delCharacters)
    } catch (error) {
        console.log(err)
        res.status(500).json({err:"Algo mal"})
    }
})




const port = process.env.PORT || 3000;

app.listen(port, ()=> {
    console.log(`Listen on port : ${port}`)
})