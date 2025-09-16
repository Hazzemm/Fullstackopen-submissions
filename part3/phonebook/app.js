const express = require('express');
const app = express();
const port = 3001;
const morgan = require('morgan');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

morgan.token('body', (req) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

const persons = [
    { id: 1, name: 'Arto Hellas', number: '040-123456' },
    { id: 2, name: 'Ada Lovelace', number: '39-44-5323523' },
    { id: 3, name: 'Dan Abramov', number: '12-43-234345' },
    { id: 4, name: 'Mary Poppendieck', number: '39-23-6423122' }
];

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (req, res) => {
    res.status(200).json(persons);
});

app.get('/info',(req,res)=>{
    res.send(`Phonebook has info for ${persons.length} people <br> ${new Date()}`)
})

app.get('/api/persons/:id', (req, res) => {
    const personId = +req.params.id
    const person = persons.find(p=>p.id === personId)
    if(person){
        res.status(200).send(person)
    } else {
        res.status(404).send(`<h1>404</h1> <p>person with id: ${personId} is not found</p>`)
    }
});

app.delete('/api/persons/:id',(req,res)=>{
    const personId = +req.params.id
    const personIndex = persons.findIndex(p=>p.id === personId)
    if(personIndex !== -1){
        persons.splice(personIndex,1)
        res.status(204).end()
    } else {
        res.status(404).send(`<h1>404</h1> <p>person with id: ${personId} is not found</p>`)
    }
})

app.post('/api/persons',(req,res)=>{
    const body = req.body
    if(!body.name || !body.number){
        return res.status(400).json({
            error: 'name or number is missing'
        })
    }
    if(persons.find(p=>p.name === body.name)){
        return res.status(400).json({
            error: 'name must be unique'
        })
    }
    const newPerson = {
        id: Math.floor(Math.random()*10000),
        name: body.name,
        number: body.number
    }
    persons.push(newPerson)
    res.status(201).send(newPerson)
})

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

app.listen(port, () => {
    console.log(`Server is running on localhost:${port}`);
});


