const { client, dbName } = require('../bd-connection')

const db = client.db(dbName)

const collection = db.collection('movements')

async function createMovement(email,balance,type,date) {
  try {
    const doc = {email, balance, type, date}
    const newMove = await collection.insertOne(doc)
    return newMove
  } catch(e) {
    console.error(e)
  }
}

async function deleteMovements( email ) {
  try {
    const movementsDeleted = await collection
      .deleteMany({ email })
    return movementsDeleted
  } catch(e) {
    console.error(e)
  }
}

async function getMovements(req, res){
  try{
    const { email } = req.params
    const movements = await collection 
      .find({ email })
      .toArray()
    res.send(movements)
  } catch(e){
    console.error(e)
  }
}

module.exports = {
  getMovements,
  createMovement,
  deleteMovements
}
