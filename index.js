import axios from 'axios'
import categorias from "./categories.json"
import usuarios from "./usuarios.json"

const instancia = axios.create({baseURL: "https://diariocivitas.com/wp-json/wp/v2"})

let pagina = 1
const extraerPost = async() => {
    let arr = []
    const porPagina = 5 
    const params = `?per_page=${porPagina}&page=${pagina}`
    console.log(params)
    const res = await instancia.get(`/posts${params}`)
    const {data} = res

    data.map(el => {
        const imagenInstance = axios.create({baseURL: el._links["wp:featuredmedia"][0].href})
        
        const FetchImage = async () => {
            const {data} = await imagenInstance.get()
            const imagen = data.guid.rendered
            
            const NuevoObjeto = {
                idWordpress : el.id,
                createdAt: el.date,
                published_at: el.date,
                updatedAt: el.modified,
                ruta: el.slug,
                estado: el.status,
                tipo: el.type,
                titulo: el.title.rendered,
                contenido: el.content.rendered,
                autor: usuarios.filter(usuario => el.author == usuario.id ? usuario.name : null)[0].name,
                categorias: el.categories.map(category => {
                    
                    const filter = categorias.filter(categoria => category == categoria.id ? categoria.name : null)

                    return filter.map(e => e.name)[0]
                    
                }),
                imagen: imagen
                
            }

            arr.push(NuevoObjeto)

            
            // const headers = {
                
            //     'Content-Type': 'application/json'
            //   }
            // axios.post("http://localhost:1337/noticias", NuevoObjeto, {headers: headers})
            //         .then(res => console.log("CON EXITO" ))
            //         .catch(err => console.log("ERROR"))
            
        }
        
       
        FetchImage()
        

       

        
    })

    
    }

    extraerPost()

    //  for (let step = 0; step < 2; step++) {
    //     extraerPost()
    //       pagina++
    //   }