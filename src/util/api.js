import axios from "./axios.custiomize"

const createUserApi = (name, email, password) => {
    const URL_API = "/v1/api/register";
    const data = {
        name, email, password
    };
    return axios.post(URL_API, data)
}
const loginApi = (email, password) => {
    const URL_API = "/v1/api/login";
    const data = {
        email, password
    };
    return axios.post(URL_API, data)
}

const getUserApi = () => {
    const URL_API = "/v1/api/user";
    return axios.get(URL_API)
}
// =====================
// ADMIN API
// =====================
const createAdminApi = (name, email, password) => {
  return axios.post("/v1/api/admin/register", { name, email, password });
};

const loginAdminApi = (email, password) => {
  return axios.post("/v1/api/admin/login", { email, password });
};

const getAdminApi = () => {
  return axios.get("/v1/api/admin");
}
export{
    createUserApi,
    loginApi, 
    getUserApi,
    createAdminApi,
    loginAdminApi,
    getAdminApi
}