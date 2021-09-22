import mongoose from "mongoose";

const Modelo = new mongoose.Schema({
  title:  String,
  slug: String,
  postcategorias : Array
});

export const ModeloTopPost = mongoose.models.topposts || mongoose.model('topposts', Modelo, 'topposts');
