const products = [
    {'id': 1, 'nome': 'Batom', 'marca': 'Boticário', 'descricao': ''}
];

getProducts = (req, res) => {
    res.status(200).send(products);
}

createProduct = (req, res) => {
    const product = req.body;
    products.push(product)
    res.status(201).send(product)
}

module.exports = {getProducts, createProduct};
