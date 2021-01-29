const mongoose = require('mongoose')

const conn_args =   { 
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}

function makeURL(pw) {
  const dbType = 'mongodb'
  const driver = 'srv'
  const db = 'fullstack'
  const host = 'cluster0.vomdc.mongodb.net'
  const table = 'phonebook-app'
  const db_args = 'retryWrites=true&w=majority'
  const url = `${dbType}+${driver}://${db}:${pw}@${host}/${table}?${db_args}`
  return url
}

function addPerson(pw, name, number) {
  const url = makeURL(pw)

  mongoose.connect(url, conn_args)
  
  const personSchema = new mongoose.Schema({
    name: String,
    number: String
  })
  
  const Person = mongoose.model('Person', personSchema)

  const person = new Person({
    name: name,
    number: number
  })
  
  person.save().then(result => {
    console.log('Person saved!')
    mongoose.connection.close()
  })
}

function getAllPersons(pw) {
  const url = makeURL(pw)

  mongoose.connect(url, conn_args)

  const personSchema = new mongoose.Schema({
    name: String,
    number: String
  })
  
  const Person = mongoose.model('Person', personSchema)

  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person)
    })
    mongoose.connection.close()
  })
}

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}
else if (process.argv.length === 3) {
  const pw = process.argv[2]
  getAllPersons(pw)
}
else if (process.argv.length === 4) {
  console.log('Need name and number for push.')
  process.exit(1)
}
else if (process.argv.length === 5) {
  const pw = process.argv[2]
  const name = process.argv[3]
  const number = process.argv[4]
  addPerson(pw, name, number)
}
else if (process.argv.length > 5) {
  console.log('Too many arguments')
  process.exit(1)
}
