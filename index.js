const express = require('express')
const app = express()
const port = 5000

// mongodb+srv://jay311311:<password>@cluster0.49l1z.gcp.mongodb.net/<dbname>?retryWrites=true&w=majority

const mongoose = require('mongoose')
mongoose.connect(`mongodb+srv://jay311311:Kje45419503!@cluster0.49l1z.gcp.mongodb.net/test?retryWrites=true&w=majority`,{
  useNewUrlParser:true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify:false
}).then(()=>console.log(`MongoDB connected`))
.catch(err=>console.log(err))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
