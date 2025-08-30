const express = require('express');
const app = express();

const persons = [
    { id: 1, name: 'Arto Hellas', number: '040-123456' },
    { id: 2, name: 'Ada Lovelace', number: '39-44-5323523' },
    { id: 3, name: 'Dan Abramov', number: '12-43-234345' },
    { id: 4, name: 'Mary Poppendieck', number: '39-23-6423122' }
];

app.get('/', (req, res) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (req, res) => {
    res.json(persons);
});

app.get('/info',(req,res)=>{
    res.send(`Phonebook has info for ${persons.length} people <br> ${new Date()}`)
})

app.get('/api/persons/:id', (req, res) => {
    const personId = +req.params.id
    const person = persons.find(p=>p.id === personId)
    if(person){
        res.send(person)
    } else {
        res
            .send(`<h1>404</h1> <p>person with id: ${personId} is not found</p>`).status(404).end()
    }
});

app.listen(3001, () => {
    console.log('Server is running on http://localhost:3000');
});
