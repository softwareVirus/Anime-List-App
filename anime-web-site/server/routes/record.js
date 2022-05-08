const express = require('express')
const moongose = require('mongoose')
const bcrypt = require('bcryptjs')
const User = require('../models/userModel')
const AnimeCard = require('../models/animeCardModel')
const UserAnimeCard = require('../models/userAnimeCard')
const userAnimeCard = require('../models/userAnimeCard')

const router = express.Router();

router.get('/getAllInfos',async (req,res) => {
  try {
    const allCard = await AnimeCard.find()
    return res.status(200).json(allCard)
  }catch(err) {
    console.log(error)
    return res.status(400).json({message: 'create user error'})
  }
})

router.post('/listMyList',async (req,res) => {
  try {
    const email = req.body.email
    const allCard = await userAnimeCard.findOne({email})
    return res.status(200).json(allCard === null ? [] : allCard.myList)
  }catch(err) {
    console.log(err)
    return res.status(400).json({message: 'create user error'})
  }
})

router.post('/addAnimeCard',async (req,res) => {
  try {
    let {src,alt,name,description,point} = req.body
    if(src === undefined || src === '') {
      src = "https://i.pinimg.com/736x/16/d4/c8/16d4c86031908fb76cad486905218526.jpg"
      alt = "anime"
    }
    const image = {src:src,alt:alt}
    console.log(image)
    const createCard = await AnimeCard.create({
      image: image,
      name,
      description,
      point
    })
    if(await AnimeCard.find({name})) {
      return res.status(400).json({message: 'Anime is already exist'})
    }
    return res.status(200).json(createCard)
  }catch(err) {
    console.log(err)
    return res.status(400).json({message: 'create user error'})
  }
})

router.post('/updateProfile',async (req,res) => {
  try {
    const {img,name,surname,old_email,email,password} = req.body;
    console.log(img,name,surname,email,password)
    const new_password = await bcrypt.hash(password,10)
    await User.updateOne({email:old_email},{image:img,name:name,surname:surname,email:email,password:new_password})
    const data = await User.findOne({email:email})
    console.log(data)
    await userAnimeCard.updateOne({email:old_email},{name:name,surname:surname,email:email})
    return res.status(200).json(data)
  }catch(error) {
    console.log(error)
    return res.status(400).json({message: 'update user error'})
  } 
})

router.post('/signup',async (req,res) => {
  try {
    console.log(req.body)
    const {img,name,surname,email,password} = req.body;
    let tmp = {src:"https://i.pinimg.com/736x/16/d4/c8/16d4c86031908fb76cad486905218526.jpg",alt:"anime"};
    if(await User.findOne({email})) {
      return res.status(400).json({message: 'email is already exist'})
    }
    const hashed_password = await bcrypt.hash(password,10)
    const createToDo = await User.create({
      image: img == null ? tmp: img,
      name,
      surname,
      email,
      password: hashed_password
    })
    return res.status(200).json(createToDo)
  } catch(error) { 
    return res.status(400).json({message: 'create user error'})
  } 
})

router.post('/login',async (req,res) => {
  try {
    const {email,password} = req.body;
    const founded_email = await User.findOne({email})
    console.log(req.body)
    if(!founded_email) {
      return res.status(400).json({message: 'email or password is not matching'})
    }
    if(!(await bcrypt.compare(password,founded_email.password))) {
      return res.status(400).json({message: 'email or password is not matching'})
    }
    return res.status(200).json({src:founded_email.image.src,alt:founded_email.image.alt,name:founded_email.name,surname:founded_email.surname,email:founded_email.email})
  } catch(error) {
    console.log(error)
    return res.status(400).json({message: 'Login user error'})
  }
})

router.post('/addAnimeToMyList',async (req,res) => {
  try {
    const {user,_id,image,name,description,point} = req.body
    console.log(req.body)
    if(user == null)
      return;
    const email = user.email
    const user_db = await userAnimeCard.findOne({email})
    if(user_db) {
      console.log([...user_db.myList,{image,name,description,point}])
      console.log(user_db.myList.filter(item => item.name === name))
      if(user_db.myList.filter(item => item.name === name).length != 0) 
        return res.status(400).json({message: ' Anime error exist'})
      await userAnimeCard.updateOne({email:email},{myList:[...user_db.myList,{image:image,name:name,description:description,point:point}]})
    } else {
      const uname = user.name,usurname = user.surname,uemail = user.email
      await userAnimeCard.create({
        name:uname,
        surname:usurname,
        email:uemail,
        myList: [
          {
            image: image,
            name:name,
            description:description,
            point:point
          }
        ]
      })
    }
    return res.status(200).json({message: 'OKİ'})
  }catch(err) {
    console.log(err)
    return res.status(400).json({message: 'aDelete Anime error'})
  }
})


router.delete('/deleteAnimeToMyList',async (req,res) => {
  try {
    const {e_mail,name} = req.headers
    console.log(name,e_mail)
    if(e_mail == null)
      return;
    const email = e_mail
    const user_db = await userAnimeCard.findOne({email})
    const list = user_db.myList
    console.log(list.filter(item => {
      return item.name != name
    }))
    console.log(list)
    if(user_db) {
      const new_list = user_db.myList.filter(item => {
        return item.name != name
      })
      await userAnimeCard.updateOne({email},{myList:new_list})
      return res.status(200).json({list:new_list})
    } else {
      return res.status(400).json({message: 'Delete Anime error'})
    }
  }catch(err) {
    console.log(err)
    return res.status(400).json({message: 'Delete Anime error'})
  }
})

module.exports = router;