const express = require('express')
const app = express()
const PORT = 3001



let persons = [
    {
        id: "1",
        name: "Arto Hellas",
        number: "040-123456"
    }, {
        id: "2",
        name: "Ada Lovelace",
        number: "39-44-532523"
    }, {
        id: "3",
        name: "Dan Abramov",
        number: "12-43-123345"
    },
    {
        id: "4",
        name: "Mary Pppendieck",
        number: "39,23,6423122"
    }







]


app.get('/api/persons', (req, res) => {

    res.json(persons)

})

app.get('/api/info', (req, res) => {
    const date = new Date()
    const info = `
    <p>Phonebook has info for ${persons.length} people</p> 
    <p>${date}</p>
    `
    res.send(info)

})



app.listen(PORT, () => {
    console.log(`Server is runing on port ${PORT}`)
})

