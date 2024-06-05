console.log(process.env);

const configuration = {
  apiUrl: process.env.REACT_APP_API_URL,
  token: process.env.REACT_APP_API_TOKEN,
};
export default configuration;
