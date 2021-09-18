import mongoose from 'mongoose'


const Image = new mongoose.Schema({
    url: String,
    alternativeText : String
  });
  
  export const ModeloGallery = mongoose.models.upload_file || mongoose.model('upload_file', Image, 'upload_file');