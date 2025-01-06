const sales = [
    {'id': 1, 'id_client': 1, 'id_product': 1, 'quantidade': 20, 'valor_un_venda': 30}
];

getSales = (req, res) => {
    res.status(200).send(sales);
}

newSale = (req, res) => {
    const sale = req.body;
    sales.push(sale)
    res.status(201).send(sale)
}

module.exports = {getSales, newSale};