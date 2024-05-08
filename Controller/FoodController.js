const foods = require("../Modal/Food")

exports.addfood = (req,res) => {
    const food = new foods({
    FoodName: req.body.fname,
    FoodType: req.body.ftype,
    FoodCategory: req.body.fcategory,
    FoodPrice: req.body.fprice,
    FoodImage: req.body.fimage,
    FoodIsAvailable:req.body.fisavailable
    })

food.save()
        .then((insertedfood) => {
            res.status(200).json(insertedfood)
        })
        .catch((err) => {
            res.status(500).json(err)
        });
}
exports.allfood = (req,res) => {
    foods.find()
      .then((allfood) => {
        res.status(200).json(allfood)
        }).catch((err) => {
           res.status(500).json(err)
        });
}
exports.getfoodByCategory = (req,res) => {
    foods
    .where('FoodCategory')
    .equals('Fast food')
    .then((fooddata) => {
        res.status(200).json(fooddata)
        }).catch((err) => {
           res.status(500).json(err)
        });
}
exports.getfoodByType = (req,res) => {
    foods
    .where('FoodType')
    .equals('veg & spices')
    .then((fooddata) => {
        res.status(200).json(fooddata)
        }).catch((err) => {
           res.status(500).json(err)
        });
}
exports.deletefood = (req, res) => {
    foods.findByIdAndDelete(req.body.id)
        .then((foodData) => {
            res.status(200).json(foodData)
        }).catch((err) => {
            res.status(500).send(err)
        });
}
exports.updatefood = (req, res) => {
    foods.findOneAndUpdate({ _id: req.body.id },
        { FoodPrice: req.body.fprice}, { new: true })
        .then((updatefood) => {
            res.status(200).json(updatefood)
        }).catch((err) => {
            res.status(500).send(err)
        });
}
