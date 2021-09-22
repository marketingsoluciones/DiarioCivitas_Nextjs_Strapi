import mongoose from "mongoose";

const Modelo = new mongoose.Schema({
  title:  String,
  slug: String,
  postcategorias : Array
});

export const ModeloPost = mongoose.models.posts || mongoose.model('posts', Modelo, 'posts');






