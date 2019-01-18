'use strict'

const db = require('../server/db')
const {User, Grow} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', name:'Cody Pup', password: '123', ethAddress: '0x67fd37f1078fDCB5FF9D85BacDb8a61aB9f89956'}),
    User.create({email: 'murphy@email.com', name: 'Murphy Doggo', password: '123', ethAddress: '0xfFda394ec4485BfE9849679666A1aca10A42eD30'})
  ])

  const growItems = await Promise.all([ 
    Grow.create({item: 'tomato', quantity: 15, price: 89, userId: 1}), 
    Grow.create({item: 'bell pepper', quantity: 12, price: 99, userId: 2})
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${growItems.length} growItems`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
