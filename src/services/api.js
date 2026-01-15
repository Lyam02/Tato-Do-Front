import axios from "axios";

const STRAPI_API_URL = "http://localhost:1337/api";

const api = axios.create({
    baseURL: STRAPI_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const todoService = {
    getAll: () => api.get('/todos'),
    getOne: (id) => api.get(`/todos/${id}`),
    create: (todoData) => api.post('/todos', {data: todoData}),
    update: (id, todoData) => api.put(`/todos/${id}`, {data: todoData}),
    delete: (id) => api.delete(`/todos/${id}`)
};

export const employeService ={
    login: async (email, password) => {
        const response = await api.post('/auth/local', {
            identifier: email,
            password: password
        });
        return response.data;
    }
}

export default api;