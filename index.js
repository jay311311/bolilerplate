const express = require('express')
const app = express()
const port = 5000
const bodyParser = require(`body-parser`); // client에서 오는 정보를 서버에서 분석해서 가져올수 있게 함
const {User} = require("./models/User");

const config = require(`./config/key`)

//application/x-www-from-urlencoded 이렇게 생긴 데이터를 가져와서 분석 할수 있게 함
app.use(bodyParser.urlencoded({extended : true}))
// application/json 이렇게 생긴 데이터를 가져와서 분석 할수 있게 함
app.use(bodyParser.json());

// mongodb+srv://jay311311:<password>@cluster0.49l1z.gcp.mongodb.net/<dbname>?retryWrites=true&w=majority

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI,{
  useNewUrlParser:true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify:false
}).then(()=>console.log(`MongoDB connected`))
.catch(err=>console.log(err))


//회원가입을 위한 라우트
app.get('/', (req, res) => {
  res.send('Hello World!')
})

  //회원가입할 떄 필요한 정보들을 client에서 가져오면 
  //그것들을 데이터 베이스에 넣어준다

app.post(`/register`, (req,res)=>{
  const user = new User(req.body);// body는 bodyParser을 이용해 데이터를 객체로 정리된 내용
  
  user.save((err,userInfo)=>{
    if (err) return res.json({success: false, err})
    return res.status(200).json({
      success : true
    })
  })
//status(200)은 성공(error가 없음)을 의미

})



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
