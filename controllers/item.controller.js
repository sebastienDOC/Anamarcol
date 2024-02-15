const ItemModel = require('../models/item.model')
const { createItemErrors } = require('../utils/errors.utils');
const ObjectID = require('mongoose').Types.ObjectId

module.exports.itemInfo = (req, res) => { 
    if (!ObjectID.isValid(req.params.id)) 
        return res.status(400).send('ID Unknown : ' + req.params.id)

    ItemModel.findById(req.params.id).select('-password')
    .then(docs => {
        if (!docs) {
            res.status(404).send('Item not found');
        } else {
            res.send(docs);
        }
    })
    .catch(err => {
        console.error('ID Unknown : ' + err);
        res.status(500).send('Internal Server Error');
    });
};

module.exports.readItem = (req, res) => {
    ItemModel.find()
        .then(docs => {
            res.send(docs);
        })
        .catch(err => {
            console.log('Error to get data: ' + err);
            res.status(500).send('Internal Server Error');
        });
};

module.exports.createItem = async (req, res) => {
    const {denomination, quantite, fournisseur, etat, posterId, modifierName} = req.body

    try {
        const item = await ItemModel.create({denomination, fournisseur, etat, quantite, posterId, modifierName })
        return res.status(200).json({ item: item._id})
    } catch (err){
        const errors = createItemErrors(err)
        res.status(201).send({ errors })
    }
}

module.exports.updateItem = async (req, res) => {
    if (!ObjectID.isValid(req.params.id)) 
        return res.status(400).send('ID Unknown : ' + req.params.id);

    try {
        const item = await ItemModel.findById(req.params.id);

        if (!item) {
            return res.status(404).send('Item not found');
        }

        // Met à jour les champs individuellement en respectant les middlewares
        if (req.body.denomination) item.denomination = req.body.denomination;
        if (req.body.fournisseur) item.fournisseur = req.body.fournisseur;
        if (req.body.etat) item.etat = req.body.etat;
        if (req.body.quantite) item.quantite = req.body.quantite;
        if (req.body.image) item.image = req.body.image;
        if (req.body.modifierName) item.modifierName = req.body.modifierName;

        // Enregistrez les modifications
        const updatedItem = await item.save();

        // Renvoyez la réponse avec `modifierName`
        return res.status(200).json({ item: updatedItem });
    } catch (err) {
        console.error('Error updating item:', err);
        return res.status(500).json({ message: err.message || 'Internal Server Error' });
    }
};

module.exports.deleteItem = async (req, res) => {
    if (!ObjectID.isValid(req.params.id)) 
        return res.status(400).send('ID Unknown : ' + req.params.id);

    try {
        await ItemModel.deleteOne({_id: req.params.id}).exec()
        res.status(200).json({message: "Sucessfully deleted."})
    } catch (err) {
        console.error('Error deleting item:', err);
        return res.status(500).json({ message: err.message || 'Internal Server Error' });
    }
}
