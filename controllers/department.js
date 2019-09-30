const Department = require('../models/Department')

// Получить все;
module.exports.getAll = async function(req, res) {
    try {
        const department = await Department.findAll()
        res.status(200).json(department)
    } catch (e) {
        console.log(e)
       // errorHandler(res, e)
    }
}

// Получить по ID;
module.exports.getById = async(req, res) => {
    try {
        const department = await Department.findByPk(req.params.id)
        res.status(200).json(department)
    } catch (e) {
        console.log(e)
        // errorHandler(res, e)
    }
}

// Добавить;
module.exports.create = async (req, res) => {

    try {

        if(req.body.name && req.body.description) {
            const department = await Department.create({
                name: req.body.name,
                description: req.body.description
            });
            res.status(201).json(department)
        }else{
            console.log(req.body);
            res.status(301).json({'message':'Пустой пост'})
        }
    } catch (e) {
        console.log(e)
        // errorHandler(res, e)
    }
}

// Обновить;
module.exports.update = async(req, res) => {
    try {
       await Department.update(
            {
                name:  req.body.name,
                description: req.body.description
            }, {
            where: {
                id: req.params.id
            }
        })
        res.status(200).json({id: req.params.id})
    } catch (e) {
        console.log(e)
        // errorHandler(res, e)
    }
}

// Удалить;
module.exports.remove = async(req, res) => {
    try {
       await Department.destroy({
            where: {
                    id: req.params.id
                }
            })
        res.status(200).json({message: 'Department удалена.'})
    } catch (e) {
        console.log(e)
        // errorHandler(res, e)
    }
}