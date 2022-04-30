const User = require('../models/UserModel');
Product = require('../models/ProductsModels');

exports.index = (req, res) => {
    Product.find({ _idOwner: req.userId }, function (err, product) {
        if (err) {
            res.json({
                status: 'err',
                code: 500,
                message: err
            });
        }

        res.json(product)
    })
}

//create function for new product
exports.new = function (req, res) {

    let product = new Product()
    product.name = req.body.name
    product.price = req.body.price
    product._idOwner = req.userId
    product.save(function (err) {
        if (err) {
            res.json({
                status: 'err',
                code: 500,
                message: err
            })
        }
        res.json({
            status: 'success',
            code: 200,
            message: 'Register save',
            data: product
        })
    })
}

//create fucntion view products
exports.view = function (req, res) {

    Product.find({ _id: req.params.id, _idOwner: req.userId }, function (err, product) {
        if (err) {
            res.json({
                status: 'err',
                code: 500,
                message: err
            })
        }
        res.json({
            status: 'success',
            code: 200,
            message: 'Registros encontrados',
            data: product
        })
    });

}

exports.update = function (req, res) {
    Product.findById(req.params.id, function (err, product) {
        if (err)
            res.json({
                status: 'err',
                code: 500,
                message: err
            })
        product.name = req.body.name
        product.price = req.body.price
        product._idOwner = req.userId
        product.save(function (err) {
            if (err)
                res.json({
                    status: 'err',
                    code: 500,
                    message: err
                })
            res.json({
                status: 'success',
                code: 200,
                message: 'Registro actualizado',
                data: product
            })
        })
    })
}


exports.delete = function (req, res) {
    Product.remove({
        _id: req.params.id
    }, function (err) {
        if (err)
            res.json({
                status: 'err',
                code: 500,
                message: err
            })
        res.json({
            status: 'success',
            code: 200,
            message: 'Registros eliminado'
        })
    })
}