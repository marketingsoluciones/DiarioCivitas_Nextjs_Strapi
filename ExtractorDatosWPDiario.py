#!/usr/bin/env python
# coding: utf-8



import pandas as pd
import requests
import json

BaseUrl = "https://diariocivitas.com/wp-json/wp/v2/posts"
porPagina = 100

fileUsers = open("usuarios.json", encoding='utf-8')
usuarios = json.load(fileUsers)

fileCategories = open("categories.json", encoding='utf-8')
categorias = json.load(fileCategories)
arr = []

pagina = 1
for i in range(2):
    
    print(pagina)
    url = '{BaseUrl}?per_page={porPagina}&page={pagina}'.format(BaseUrl=BaseUrl, porPagina=porPagina, pagina=pagina)
    data = requests.get(url).json()
    print(url)
    for noticia in data:

        def funtion(id):
            for categoria in categorias:
                if id == categoria["id"]:
                    return categoria["name"]


        NombreCategoria = list(map(funtion, noticia["categories"] ))


        #Conseguir Usuarios
        NombreAutor = ""
        for usuario in usuarios:
            if noticia["author"] == usuario["id"]:
                NombreAutor = usuario["name"]
    
        linkImagen = noticia["_links"]["wp:attachment"][0]["href"] if noticia["_links"]["wp:attachment"][0]["href"] else "" 
        response = requests.get(linkImagen)
        imagen = response.json()[0]["guid"]["rendered"] if len(response.json()) > 0 else ""        
        
        

        nuevoObjeto = {
            "idWordpress" : noticia["id"],
           "createdAt": noticia["date"],
           "published_at": noticia["date"],
           "updatedAt": noticia["modified"],
           "rutaURL": noticia["slug"],
           "estado": noticia["status"],
           "tipo": noticia["type"],
           "titulo": noticia["title"]["rendered"],
           "contenido": noticia["content"]["rendered"],
            "autor": NombreAutor,
            "categorias": NombreCategoria,
            "imagen": imagen}


        arr.append(nuevoObjeto)
        
    pagina = pagina + 1


with open("prueba.json", "w", encoding='utf-8') as jsonFile:
    json.dump(arr, jsonFile)
    
print(len(arr))


# def download_img(img_url, img_name):
#     req = requests.get(img_url)
#     req.headers['User-Agent']= 'Mozilla/5.0'
#     response = req.content
#     with open(img_name, "wb") as f:
#         f.write(response)
# 
# download_img(nuevoObjeto["imagen"], 'C:/Users/Francisco/Desktop/Temp/DiarioCivitas/apiCivitas/public/uploads/{nombre}.jpg'.format(nombre = nuevoObjeto["titulo"]))
