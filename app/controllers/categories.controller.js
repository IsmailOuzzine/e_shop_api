const db = require('../models/index');

const Category = db.categories;
const Op = db.Sequelize.Op;

const create = (req, res) => {
    // verifying
    if (!req.body.id || !req.body.name || !req.body.description) {
        const message = 'Values caonnot be empty!';
        console.error(message);
        res.json({
            message,
            result : false
        });
        return ;
    }
    // creating 
    const category = {
        id : req.body.id,
        name : req.body.name,
        description : req.body.description
    };
    console.log(category);
    Category.create(category)
        .then(() => {
            const message = 'New category added.';
            console.log(message);
            res.json({
                message,
                result : true
            });
        })
        .catch((err) => {
            const message = 'Cannot add new category. Error : ' + err;
            console.error(message);
            res.json({
                message,
                result : false
            });
        });
};

const findAll = (req, res) => {
    const sql = 'select categories.id, name, description, ('
        +'select count(id) from products where promotion = 1 and categoryId = categories.id'
        +') as promotion from categories;'
    db.sequelize.query(sql)
        .then(data => {
            data[0].forEach(element => {
                element.promotion = element.promotion != 0;
            });
            console.log(data[0]);
            res.json(data[0]);
        })
        .catch(err => {
            console.error('Cannot get Categories. Error :', err);
            res.status(500).json({});
        });
};

const deleteById = (req, res) => {
    const id = req.params.id;
    if(!id) {
        const message = 'Id caonnot be empty!';
        console.error(message);
        res.json({
            message,
            result : false
        });
        return ;
    }
    // deleting
    Category.destroy({ where: { id : id } })
        .then(num => {
            if (num == 1) {
                const message = `Category with id = ${id} is deleted successfully.`;
                console.error(message);
                res.json({
                    message,
                    result : true
                });
            } else {
                const message = `Cannot delete category with id = ${id}. num : ${num}`;
                console.error(message);
                res.json({
                    message,
                    result : false
                });
            }
        })
        .catch(err => {
            const message = `Cannot delete category with id = ${id}. Error : ${err}`;
            console.error(message);
            res.json({
                message,
                result : false
            });
        })
};

const updateById = (req, res) => {
    const id = req.params.id;

    // verifying
    if (!req.body.id || !req.body.name || !req.body.description) {
        const message = 'Values caonnot be empty!';
        console.error(message);
        res.json({
            message,
            result : false
        });
        return ;
    }

    // updating 
    Category.update({id : id, name : req.body.name, description : req.body.description}, { where : { id : id } })
        .then(num => {
            if (num == 1) {
                const message = `Category with id = ${id} is updated successfully.`;
                console.error(message);
                res.json({
                    message,
                    result : true
                });
            } else {
                const message = `Cannot update category with id = ${id}. num : ${num}`;
                console.error(message);
                res.json({
                    message,
                    result : false
                });
            }
        })
        .catch(err => {
            const message = `Cannot update category with id = ${id}. Error : ${err}`;
            console.error(message);
            res.json({
                message,
                result : false
            });
        })
};

module.exports = {
    create,
    findAll,
    deleteById,
    updateById
}