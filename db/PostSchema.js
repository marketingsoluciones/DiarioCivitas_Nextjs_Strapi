import mongoose from 'mongoose'

const Modelo = new mongoose.Schema({
  title:  String,
  slug: String,
  postcategorias : Array
});

export const ModeloPost = mongoose.models.posts || mongoose.model('posts', Modelo);



export const ModeloTopPost = mongoose.models.topposts || mongoose.model('topposts', Modelo);


const Category = new mongoose.Schema({
  categorie:  String,
  slug : String
});
export const ModeloCategory = mongoose.models.postcategorias || mongoose.model('postcategorias', Category);

