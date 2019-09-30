const Department = require('../models/Department')
const Employee = require('../models/Employee')

Employee.hasOne(Department, {foreignKey: 'id', sourceKey: 'department_id'});
Department.belongsTo(Employee, {foreignKey: 'id', sourceKey: 'department_id'});

// Получить все;
module.exports.getAll = async function(req, res) {
    try {
        const employee = await Employee.findAll({
            include: [{
                model: Department,
            }]
        })
        res.status(200).json(employee)
    } catch (e) {
        console.log(e)
       // errorHandler(res, e)
    }
}

// Получить по ID;
module.exports.getById = async(req, res) => {
    try {
        const employee = await Employee.findByPk(req.params.id)
        res.status(200).json(employee)
    } catch (e) {
        console.log(e)
        // errorHandler(res, e)
    }
}

// Добавить;
module.exports.create = async (req, res) => {

    try {

        if(req.body.department_id && req.body.firstName && req.body.lastName) {
            const employee = await Employee.create({
                department_id: req.body.department_id,
                firstName: req.body.firstName,
                lastName: req.body.lastName
            });
            res.status(201).json(employee)
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
       await Employee.update(
            {
                department_id: req.body.department_id,
                firstName: req.body.firstName,
                lastName: req.body.lastName
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
       await Employee.destroy({
            where: {
                    id: req.params.id
                }
            })
        res.status(200).json({message: 'Employee удалена.'})
    } catch (e) {
        console.log(e)
        // errorHandler(res, e)
    }
}