const express = require('express')
const app = express()
app.use(express.json()) //for parse json

posts=[];
app.get('/', function (req, res) {
  res.send('Hello NodeJs')
})

//get posts
app.get('/posts', function (req, res) {
    res.send(posts)
})
//create post
app.post('/posts', function (req, res) {
    const post=req.body
    const is_found=posts.find((x) => x.id===post.id)
    if(is_found){
        res.status(400).send("post already exists")
        return
    }
    posts.push(post)
    res.send("Created!")
})
//delete post
app.delete('/posts/:id',function(req,res){
    const {id}=req.params
    const post=posts.findIndex((x) => x.id===id)
    if(post==-1){
        res.status(400).send("post not found")
        return
    }
    posts.splice(post,1)
    res.send('post deleted successfully')
})
//listen to request
app.listen(3000,()=>{
    console.log("Started NodeJs App on port 3000")
})