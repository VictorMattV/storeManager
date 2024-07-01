const ProductModel = require('../models/ProductModel');

const getAllProducts = async () => {
  const products = await ProductModel.getAllProducts();
  if (!products || products.length === 0) {
    throw new Error('There are no products registered in the database');
  }
  return products;
};

const getProductById = async (id) => {
  const product = await ProductModel.getProductById(id);
  if (!product) {
    throw new Error('Product not found');
  }
  return product;
};

const createProduct = async (productData) => {
  const { name } = productData;
  const product = await ProductModel.getProductsByName(name);
  if (product) {
    throw new Error('Product already exists with this name');
  }
  const newProduct = ProductModel.createProduct(productData);
  return newProduct;
};

const updateProduct = async (id, productData) => {
  const product = await ProductModel.getProductById(id);
  if (!product) {
    throw new Error('Product not found');
  }
  const updatedProduct = await ProductModel.updateProduct(id, productData);
  return updatedProduct;
};

const deleteProduct = async (id) => {
  const product = await ProductModel.getProductById(id);
  if (!product) {
    throw new Error('Product not found');
  }
  await ProductModel.deleteProduct(id);
};

const updateProductQuantity = async (id, quantity) => {
  const product = await ProductModel.getProductById(id);
  if (!product) {
    throw new Error('Product not found');
  }
  await ProductModel.updateProductQuantity(id, quantity);
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  updateProductQuantity
};
