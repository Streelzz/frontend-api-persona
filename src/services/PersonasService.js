import axios from 'axios'
class PersonasService{
    baseEndpoint ='http://54.232.132.226:9000/api/v1/personas';

    getPersonas = async () => {
        return await axios.get(this.baseEndpoint);
    }

    getPersona = async id =>{
        return await axios.get(this.baseEndpoint+"/"+id)
    }

    save = async (persona) => {
        return await axios.post(this.baseEndpoint+"/",persona);
    }

    update = async (id,persona)=>{
        return await axios.put(this.baseEndpoint+"/"+id,persona)
    }

    delete = async id => {   
       return await axios.delete(this.baseEndpoint+"/"+id);
    }
}

export default new PersonasService()