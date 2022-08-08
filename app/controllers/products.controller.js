const db = require('../models/index');
const Product = db.products;

const create = (req, res) => {
    console.log({
        name : req.body.name,
        price : req.body.price,
        stock : req.body.stock,
        infos : req.body.infos,
        category : req.body.category,
        promotion : req.body.promotion,
    })
    if (!req.body.name || !req.body.price || !req.body.stock || !req.body.infos || !req.body.category) {
        let message = 'Values connot be empty!';
        res.json({
            message,
            result : false
        });
        return ;
    }
    // creating
    let product = {
        name : req.body.name,
        price : req.body.price,
        stock : req.body.stock,
        infos : req.body.infos,
        promotion : req.body.promotion,
        categoryId : req.body.category.id
    }
    Product.create(product)
        .then((data) => {
            // console.log(`data.id : ${data.id}`);
            let message = 'Product added successfully! ';
            console.log(message);
            res.json({
                id : data.id,
                message,
                result : true
            });
        }
        )
        .catch(err => {
            let message = `Cannot add the new product. Error : ${err}`;
            console.error(message);
            res.json({
                message,
                result : false
            });
        });
}

const findAll = (req, res) => {
    Product.findAll({
        include: { model: db.categories, as: 'category' }
      }) 
        .then(data => {
            let message = 'Getting all products';
            console.log(message);
            res.json(data);
        })
        .catch(err => {
            let message = `Cannot get products. Error : ${err}`;
            console.error(message);
            res.status(500).json({});
        });
}

const updateById = (req, res) => {
    const id = req.params.id;
    if (!req.body.name || !req.body.price || !req.body.stock ||  !req.body.category.id) {
        let message = 'Values connot be empty!';
        console.log({
            id : req.body.id,
            name : req.body.name,
            price : req.body.price,
            stock : req.body.stock,
            infos : req.body.infos,
            promotion : req.body.promotion,
            categoryId : req.body.category.id
        });
        console.log(message);
        res.json({
            message,
            result : false
        });
        return ;
    }
    // updating
    let product = {
        id : req.body.id,
        name : req.body.name,
        price : req.body.price,
        stock : req.body.stock,
        infos : req.body.infos,
        promotion : req.body.promotion,
        categoryId : req.body.category.id
    }
    Product.update(product, { where : { id : id }})
        .then(() => {
            let message = 'Product updated successfully! ';
            console.log(message);
            res.json({
                message,
                result : true
            });
            return ;
        }
        )
        .catch((err) => {
            let message = `Cannot update the product with id : ${id}. Error : ${err}`;
            console.error(message);
            res.json({
                message,
                result : false
            });
        });
}

const deleteById = (req, res) => {
    const id = req.params.id;
    Product.destroy({ where : { id : id }})
    .then(() => {
        let message = 'Product deleted successfully! ';
        console.log(message);
        res.json({
            message,
            result : true
        })
    }
    )
    .catch(err => {
        let message = `Cannot delete the product with id : ${id}. Error : ${err}`;
        console.error(message);
        res.json({
            message,
            result : false
        });
    });
}

module.exports = {
    findAll,
    create,
    deleteById,
    updateById,
}