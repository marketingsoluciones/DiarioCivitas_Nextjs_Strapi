import mongoose from "mongoose";
const Category = new mongoose.Schema({
    categorie:  String,
    slug : String
  });
  export const ModeloCategory = mongoose.models.postcategorias || mongoose.model('postcategorias', Category, 'postcategorias');