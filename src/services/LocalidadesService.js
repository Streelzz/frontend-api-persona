import axios from 'axios'
class LocalidadesService{
    baseEndpoint ='http://54.232.132.226:9000/api/v1/localidades';
   
    getLocalidades = async () => {
        return await axios.get(this.baseEndpoint);
    }

    getLocalidad = async id =>{
        return await axios.get(this.baseEndpoint+"/"+id)
    }

    save = async (localidad) => {
        return await axios.post(this.baseEndpoint+"/",localidad);
    }

    update = async (id,localidad)=>{
        return await axios.put(this.baseEndpoint+"/"+id,localidad)
    }

    delete = async id => {   
       return await axios.delete(this.baseEndpoint+"/"+id);
    }
}

export default new LocalidadesService()