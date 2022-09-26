const mongoose = require('mongoose')

const args = process.argv.length

// only cases with 3 or 5 parameters accepted

if (args < 3) {
  console.log('give password as argument')
  process.exit(1)
} else if (args === 4) {
  console.log('name or password missing')
  process.exit(1)
} else if (args > 5) {
  console.log('too many parameters')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://fullstack-joel:${password}@cluster0.77hqscl.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (args === 3) {
  console.log('phonebook:')
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  })
} else {
  const personName = process.argv[3]
  const personNumber = process.argv[4]
  const person = new Person({
    name: personName,
    number: personNumber,
  })
  person.save().then(() => {
    console.log(`added ${personName} number ${personNumber} to phonebook`)
    mongoose.connection.close()
  })
}
