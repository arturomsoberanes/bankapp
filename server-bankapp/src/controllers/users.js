const { client, dbName } = require('../bd-connection')
const { 
  createMovement,
  deleteMovements
} = require('./movements')

const db = client.db(dbName)

const collection = db.collection('users')

async function createUser( req, res ) {
  try {
    const { name, email, password } = req.params
    const user = await collection 
      .find({ email })
      .toArray()
    if (!user.length > 0) {
      const doc = {name, email, password, balance: 0};
      const insertUser = await collection.insertOne(doc);
      res.send(insertUser);
    } else {
      res.send('The user already exists!!')
    }
  } catch (e) {
    console.error(e)
    res.send(e)
  }
}

async function allUser( req, res ) {
  try {
    const users = await collection 
      .find({})
      .toArray()
    res.send(users)
  } catch (e) {
    console.error(e)
    res.send(e)
  }
}

async function searchUser( req, res ) {
  try {
    const { email } = req.params
    const user = await collection 
      .find({ email })
      .toArray()
    res.send(user)
  } catch (e) {
    console.error(e)
    res.send(e)
  }
}

async function updateBalanceUser( req, res ) {
  try {
    let { email, balance, type, date } = req.params
    balance = Number(balance)
    const user = await collection 
      .updateOne({ email },
        { $set: { balance } })
    const movement = await createMovement(email,balance,type,date)
    const result = { user, movement } 

    res.send(result)
  } catch (e) {
    console.error(e)
    res.send(e)
  }
}

async function deleteUser( req, res ) {
  try {
    const { email } = req.params
    const user = await collection 
      .deleteOne({ email })
    const delMove = await deleteMovements( email )
    const result = { user, delMove }
    res.send(result)
  } catch (e) {
    console.error(e)
    res.send(e)
  }
}

module.exports = {
  createUser,
  allUser,
  searchUser,
  updateBalanceUser,
  deleteUser
}

