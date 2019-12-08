import express = require('express')
import ApplicationApi = require('./routes/application-api')
import ReportingApi = require('./routes/report-api')

const app = express()
app.use(express.json())
app.use('/application', ApplicationApi)
app.use('/reporting', ReportingApi)

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
})

export default app