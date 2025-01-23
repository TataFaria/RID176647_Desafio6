const { DataTypes } = require('sequelize');

module.exports = function(sequelize) {
  const Produto = sequelize.define('produtos', {
    IdProduto: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nome: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    descricao: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    preco: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    QtDisponivelEstoque: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0 
    }
  }, {
    tableName: 'produtos',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "IdProduto" },
        ]
      },
    ]
  });

  Produto.afterCreate(async (produto, options) => {
    const Estoque = sequelize.models.estoque;
    try {
      
      let estoque = await Estoque.findOne({ where: { IdProduto: produto.IdProduto } });
      
      if (!estoque) {
        estoque = await Estoque.create({
          IdProduto: produto.IdProduto,
          nome_produto: produto.nome,
          QtDisponivel: 0 
        });
      }
      estoque.QtDisponivel = produto.QtDisponivelEstoque;
      await estoque.save();
    } catch (error) {
      console.error('Erro ao atualizar a quantidade disponível no estoque:', error);
    }
  });

  return Produto;
};

