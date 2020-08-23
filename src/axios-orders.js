import axios from 'axios'

const instance = axios.create({
    baseURL:'https://myburger-72558.firebaseio.com/'
});

export default instance;