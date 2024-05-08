const customer = require("../Modal/Customer")

exports.addcust = (req,res) => {
    const cust = new customer({
        CustomerName: req.body.cname,
        MobileNo: req.body.mobno,
        Address: req.body.address
    })

cust.save()
        .then((insertedcustomer) => {
            res.status(200).json(insertedcustomer)
        })
        .catch((err) => {
            res.status(500).json(err)
        });
}
exports.allcust = (req,res) => {
    customer.find()
      .then((allcust) => {
        res.status(200).json(allcust)
        }).catch((err) => {
           res.status(500).json(err)
        });
      
}
exports.custById = (req,res) => {
    customer.findById(req.body.id)
    .then((custData) => {
        res.status(200).json(custData)
        }).catch((err) => {
           res.status(500).json(err)
        });
    
}