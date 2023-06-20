import axios from 'axios';
export const BASE_URL = "https://api.themoviedb.org/3";

const headers = {
    Authorization: "bearer " + "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MDA1MjQ2YmYzZjdmMTE5NGE4YjUyMzc1NWQ3MWNjYiIsInN1YiI6IjY0ODA1NjNmNjQ3NjU0MDEyNDk2NWYzZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Dwlh5bH6EWoCLV90KqcGT3cpN5iEm2f0XgjMKw7s3tg"
};

export const fetchDataFromApi = async (url, params) => {
    try{
        const {data} = await axios.get(BASE_URL + url, {
            headers,
            params,
        }) 
        return data;
    }catch(err) {
        console.log(err);
        return err;
    }
}