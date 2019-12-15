import express = require('express')
import groupsRoute = require('./routes/groupsRoute')
import billsRoute = require('./routes/billsRoute')
import middleware = require('./middlewares/errorMiddleware')
import validator = require('express-validator')

const app = express()
app.use(express.json())
app.use(groupsRoute)
app.use(billsRoute)
app.use(middleware)

const PORT = process.env.PORT || 8040

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
})

export default app