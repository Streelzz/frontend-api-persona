import axios from 'axios'

class LibrosService{
    baseEndpoint ='http://54.232.132.226:9000/api/v1/libros';

    getLibros = async () => {
        return await axios.get(this.baseEndpoint);
    }

    getLibro = async id =>{
        return await axios.get(this.baseEndpoint+"/"+id)
    }

    save = async (libro) => {
        return await axios.post(this.baseEndpoint+"/",libro);
    }

    update = async (id,libro)=>{
        return await axios.put(this.baseEndpoint+"/"+id,libro)
    }

    delete = async id => {   
       return await axios.delete(this.baseEndpoint+"/"+id);
    }
}

export default new LibrosService()