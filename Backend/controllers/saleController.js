import Sale from "../models/saleModel.js";
const errorName = 'Revisar el campo nombre';

async function createSale(request, response){
    try {
        const sale = request.body;

        if( sale.name.trim() == ''){
            response.status(400).json({ message: errorName, data: []});
        } else {
            const newSale = new Sale(request.body);
            await newSale.save();
            response.status(200).json({ message: 'Ok', newSale});
        }
        
    } catch (error) {
        console.error(error);
        response.status(500).json({ message: error, data: []});
    }
}

async function getSale( request, response){
    try {
        const sale = await Sale.find()
        console.log(sale)
        response.status(200).json({message: 'Ok', data: sale});

    } catch (error) {
        console.error(error);
        response.status(500).json({message: error, data: []});
    }
}

async function getSaleById( request, response){
    try {
        const id = request.params.id;
        const sale = await Sale.findById(id);
        response.status(200).json({message: 'Ok', data: sale});

    } catch (error) {
        console.error(error);
        response.status(500).json({message: error, data: []});
    }
}

export { createSale, getSale, getSaleById}