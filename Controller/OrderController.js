const order = require("../Modal/Order")

exports.addord = (req,res) => {
    const ord = new order({
        OrderDate:req.body.orddate,
        OrderAmount:req.body.ordamt,
        ItemNo:req.body.itemno,
        OrderItems:req.body.orditems,
        OrderStatus:req.body.ordstatus,
        CustId:req.body.cid
    })
ord.save()
   .then((insertedorder) => {
      res.status(200).json(insertedorder)
    })
    .catch((err) => {
       res.status(500).json(err)
    });
}

exports.allorder = (req,res) => {
    order.find()
      .then((allorder) => {
        res.status(200).json(allorder)
        }).catch((err) => {
           res.status(500).json(err)
        });
}
exports.getOrdByStatus = (req,res) => {
    order
    .where('OrderStatus')
    .then((order) => {
        res.status(200).json(order)
    }).catch((err) => {
       res.status(500).json(err)   
    });
}