const Honors = require("../models/honors").Honors;

async function list(req, res, next) {
    try {
        let listado;
        const skip = req.query.skip;
        const limit = req.query.limit;   
        console.log(req.params.id);         
        if (req.params.id) {
            listado = await (Honors.lista({_id:req.params.id}));
        } else if (req.query.publishing_id || req.query.user) {
            listado = await (Honors.lista({$or:[{name:req.query.publishing_id},{alias:req.query.user}]},skip,limit));
        } else {
            listado = await (Honors.lista({},skip,limit));           
        }   
        res.json({listado});
    } catch(error) {
        next(error);
    }
}

async function create(req, res, next) {
    try {        
        const new_honor = new Honors(req.body);        
        const listado = await (Honors.lista({$and:[{publishing_id:new_honor.publishing_id},{user:new_honor.user}]}));
        if (listado.length == 0) {
            new_honor.save();
            res.json({ result: new_honor});
        } else {
            return res.status(409).json( {
                message: 'Honor duplicado'
            })
        }
    } catch (err) {
        next(err);
    }
}

async function update(req, res, next) {
    try {
        const current_register = await Honors.findById(req.params.id);
        if (current_register == null) {
            return res.status(404).json( {
                message: 'Honor no existente'
            })
        } else {
            current_register.publishing_id = req.body.publishing_id;
            current_register.user = req.body.user;
            
            const postUpdated = await Honors.updateOne( { _id: current_register.id}, 
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
        const post = await Honors.findById(req.params.id);
        if (post) {        
            await Honors.deleteOne({ _id: req.params.id });    
            res.json({ _id: req.params.id });    
        } else {    
            res.status(404).json({
                message: 'Honor no existente'
            });
        }    
    } catch (err) {
        next(err);
    }
}

module.exports = { list, create, update, delRegister };