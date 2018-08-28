// load HistoryOf_FamousPeople server using express somehow...
const express = require('express')
const fampeople = express()
const morgan = require ('morgan') // To read the requests from where it's coming from.
const mysql = require('mysql')

//famPeople.use(express.static('./public'))  // Connect with public directory

fampeople.use(morgan('short'))

fampeople.get('/FamousPeople/:Personality_Color', (req, res) => {
  console.log("Fetching FamousPeople with Personality_Color: " + req.params.Personality_Color)
  
  const connection = mysql.createConnection({
    host:'localhost',
    user: 'root',    
    password: 'Chaula2018',
    database: 'HistoryOf_FamousPeople'
  })

  const Personality_Color = req.params.Personality_Color
  const queryString = "SELECT * FROM FamousPeople WHERE Personality_Color = ?"
  connection.query(queryString, [Personality_Color], (err, rows, fields) => {
    if (err) {
      console.log("Failed to query for users: " + err)
      res.sendStatus(500)
      return
    }

    console.log("I think we fetched FamousPeople list successfully")

    res.json(rows)
  })
  //res.end()
})

fampeople.get("/", (req, res) => {
  console.log("Responding to root route")
  res.send("History of Famous People")
})

fampeople.get ("/FamousPeople", (req, res) => {
   res.send("Nodemon auto updates when I save this file")
})


// localhost:3000
fampeople.listen(3000, () => {
  console.log("Server is up and listening on port 3000...")
})