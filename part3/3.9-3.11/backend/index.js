const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const PORT = process.env.PORT || 3001
app.use(cors())
app.use(express.static('dist'))


morgan.token('body', (req, res) => {
    if (req.method === 'POST' || req.method === 'PUT') {
        return JSON.stringify(req.body)
    }
    return ''
})

const logger = morgan(function (tokens, req, res) {
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms',
        tokens.body(req, res)
    ].join(' ')
})

app.use(express.json())
app.use(logger)





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
const generateId = () => {
    const maximumId = 10000000
    const id = Math.floor(Math.random() * maximumId)
    return String(id)
}

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

app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id
    const person = persons.find((p) => p.id === id)
    if (!person) {
        return res.status(404).end()
    }
    res.json(person)
})

app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id
    persons = persons.filter((p) => p.id !== id)
    res.status(204).end()
})

app.post('/api/persons', (req, res) => {

    const body = req.body
    console.log(body)

    if (!body.name || !body.number) {
        return res.status(400).json({
            error: "name or number missing"
        })
    }

    const personExists = persons.some((p) => p.name.toLowerCase() === body.name.toLowerCase())

    if (personExists) {
        return res.status(400).json({
            error: "name must be unique"
        })
    }

    const newPerson = {
        id: generateId(),
        name: body.name,
        number: body.number
    }

    persons = persons.concat(newPerson)
    res.json(newPerson)


})

app.put('/api/persons/:id', (req, res) => {

    const id = req.params.id
    const body = req.body

    if (!body.name && !body.number) {
        return res.status(400).json({ error: 'content missing' })
    }
    const idExists = persons.some(p => p.id === id)
    if (!idExists) {
        return res.status(400).json({error: "no such id"})
    }

    persons = persons.map(p => {
        if (p.id === id) {
            return {
                ...p,
                name: body.name || p.name,
                number: body.number || p.number
            }
        }
        return p
    })

    const updatedPerson = persons.find(p => p.id === id)

    console.log("updated in api" + updatedPerson)
    res.json(updatedPerson)
})
app.listen(PORT, () => {
    console.log(`Server is runing on port ${PORT}`)
})

