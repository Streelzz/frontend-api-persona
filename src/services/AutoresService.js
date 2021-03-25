import axios from 'axios'
class AutoresService{
    baseEndpoint ='http://54.232.132.226:9000/api/v1/autores';

    getAutores = async () => {
        return await axios.get(this.baseEndpoint);
    }

    getAutor = async id =>{
        return await axios.get(this.baseEndpoint+"/"+id)
    }

    save = async (autor) => {
        return await axios.post(this.baseEndpoint+"/",autor);
    }

    update = async (id,autor)=>{
        return await axios.put(this.baseEndpoint+"/"+id,autor)
    }

    delete = async id => {   
       return await axios.delete(this.baseEndpoint+"/"+id);
    }
}

export default new AutoresService()