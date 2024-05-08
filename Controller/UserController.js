const bcrypt = require("bcryptjs")
const auth = require("../Modal/User")
const jwt = require("jsonwebtoken")
const config = require("../Config/Config")
const { json } = require("body-parser")
exports.register = async (req, res) => {
    const salt = await bcrypt.genSalt(10)
    const hashpass = await bcrypt.hash(req.body.pass, salt)
    const user = new auth({
        name: req.body.name,
        Email: req.body.email,
        User_type_id: req.body.utid,
        Password: hashpass
    })

    user.save().then((registerduser) => {
        let payload = { id: registerduser._id , utid:req.body.utid || 0}
        const token = jwt.sign(payload, config.TOKEN_SECRET)
        console.log("token generated")
        console.log()
        res.status(200).json({ token })
      }).catch((err) => {
        res.status(500).json(err)
      })
}

exports.all = (req, res) => {
  auth.find().then((all) => {
    res.status(200).json(all)
  }).catch((err) => {
    res.status(500).json(err)
  })  
}

exports.login = (req, res) => {
    auth.findOne({ Email: req.body.email })
    .then((user) => {
        if (!user) {
            return res.status(401).send("Invalid email/mobile");
        }

        bcrypt.compare(req.body.pass, user.Password)
         .then((validPass) => {
            if (!validPass) {
                return res.status(401).send("Mobile/Email or Password is wrong");
            }

            let payload = { id: user._id, utid: user.User_type_id };
            const token = jwt.sign(payload, config.TOKEN_SECRET);
           
  
            res.status(200).header("auth-token", token).send({ "token": token });
            res.status(200).send(user)
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  exports.userEvent = (req, res) => {
    let events = [
      {
        "_id": "1",
        "name": "Auto Expo",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      },
      {
        "_id": "2",
        "name": "Auto Expo",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      },
      {
        "_id": "3",
        "name": "Auto Expo",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      }
    ]
    res.json(events)
    return("..return succefully")
  };
  
  exports.adminEvent = (req, res) => {
    let specialEvents = [
      {
        "_id": "1",
        "name": "Auto Expo Special",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      },
      {
        "_id": "2",
        "name": "Auto Expo Special",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      },
      {
        "_id": "3",
        "name": "Auto Expo Special",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      },
      {
        "_id": "4",
        "name": "Auto Expo Special",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      },
      {
        "_id": "5",
        "name": "Auto Expo Special",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      },
      {
        "_id": "6",
        "name": "Auto Expo Special",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      }
    ]
    res.json(specialEvents)
  
  }
  
  