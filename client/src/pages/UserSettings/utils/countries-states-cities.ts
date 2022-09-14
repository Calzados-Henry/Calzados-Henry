import axios from 'axios';

export const getStatesAR = async () => {
  const config = {
    method: 'get',
    url: 'https://api.countrystatecity.in/v1/countries/AR/states',
    headers: {
      'X-CSCAPI-KEY': 'API_KEY',
    },
  };
  const response = await axios(config);
  const data = response.data;
  try {
    console.log(JSON.stringify(data));
  } catch (error) {
    console.log(error);
    return;
  }

  return data;
};

/* 
https://api.countrylayer.com/v2/
*/
