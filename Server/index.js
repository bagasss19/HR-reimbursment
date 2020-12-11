const express = require('express')
const app = express()
const port = 3000
const employee = require('./routes/employee')
const reimbursment = require('./routes/reimbursment')
const admin = require('./routes/admin')
const cors = require('cors')
const err = require('./middleware/err')

app.use(cors())
app.use(express.urlencoded({ extended:true}))
app.use(express.json())

app.use('/', employee)
app.use('/admin', admin)
app.use('/reimbursment', reimbursment)
app.use(err)

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})