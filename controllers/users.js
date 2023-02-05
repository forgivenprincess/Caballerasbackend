const Users = require("../models/users").Users

async function list(req, res, next) {
    try {
        let listado;
        const skip = req.query.skip;
        const limit = req.query.limit;   
        console.log(req.params.id);         
        if (req.params.id) {
            listado = await (Users.lista({_id:req.params.id}));
        } else if (req.query.name || req.query.alias) {
            listado = await (Users.lista({$or:[{name:req.query.name},{alias:req.query.alias}]},skip,limit));
        } else {
            listado = await (Users.lista({},skip,limit));           
        }   
        res.json({listado});
    } catch(error) {
        next(error);
    }
}

async function create(req, res, next) {
    try {
        const new_user = new Users(req.body);      
        /**
         * Se busca si hay un usuario con este alias o este name.
         */
        const listado = await (Users.lista({$or:[{name:new_user.name},{alias:new_user.alias}]}));
        if (listado.length == 0) {
            new_user.save();
            res.json({ result: new_user});
        } else {
            return res.status(409).json( {
                message: 'Usuario existente con este alias o este name'
            })
        }
            
    } catch (err) {
        next(err);
    }
}

async function update(req, res, next) {
    try {
        const current_register = await Users.findById(req.params.id);
        if (current_register == null) {
            return res.status(404).json( {
                message: 'Usuario no existente'
            })
        } else {
            current_register.name = req.body.name;
            current_register.alias = req.body.alias;
            current_register.password = req.body.password;
            
            const postUpdated = await Users.updateOne( { _id: current_register.id}, 
                                                       current_register);
            res.json({ result: current_register });    
        }
    } catch (err) {
        res.status(404).json( {
            message: 'Usuario no existente'
        })
        next(err);
    }
    
}

async function delRegister(req, res, next) {
    try {
        const post = await Users.findById(req.params.id);
        if (post) {        
            await Users.deleteOne({ _id: req.params.id });    
            res.json({ _id: req.params.id });    
        } else {    
            res.status(404).json({
                message: 'Usuario no existente'
            });
        }    
    } catch (err) {
        next(err);
    }
}

module.exports = { list, create, update, delRegister };