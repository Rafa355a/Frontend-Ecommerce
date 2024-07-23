import axios from './axiosConfig';

const getProducts = async () => {
  const response = await axios.get('/productos');
  return response.data;
};

export { getProducts };
