import axios from "axios";

const STRAPI_API_URL = "http://localhost:1337/api";

const api = axios.create({
    baseURL: STRAPI_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

const user = JSON.parse(sessionStorage.getItem('user'));

export const todoService = {
    getAll: () => api.get('/todos'),
    getOne: (id) => api.get(`/todos/${id}`),
    create: (todoData) => api.post('/todos', {data: {...todoData, user: user.documentId, list: todoData.list}}),
    update: (id, todoData) => api.put(`/todos/${id}`, {data: {...todoData}}),
    delete: (id) => api.delete(`/todos/${id}`),
    getTodoFromList: (id) => api.get(`/todos?filters[list][documentId][$eq]=${id}`),
    getTodoUserNotCompleted: (id) => api.get(`/todos?filters[user][documentId][$eq]=${id}&filters[finish][$eq]=false`),
    getTodoUserNotCompletedOrListPublic: (id) => api.get(`/todos?filters[$or][0][user][documentId][$eq]=${id}&filters[finish][$eq]=false&filters[$or][1][list][isPublic][$eq]=true$filters[finish][$eq]=false`),
    getTodoUser: (id) => api.get(`/todos?filters[user][documentId][$eq]=${id}`)
};

export const listService ={
    getAll: () => api.get('/lists'),
    getOne: (id) => api.get(`/lists/${id}`),
    create: (listData) => api.post('/lists', {data: {...listData, users: user.documentId}}),
    update: (id, listData) => api.put(`/lists/${id}`, {data: listData}),
    delete: (id) => api.delete(`/lists/${id}`),
    getListUser: (id) => api.get(`/lists?filters[$or][0][users][documentId][$eq]=${id}&filters[$or][1][isPublic][$eq]=true`)
};

export const userService ={
    login: async (email, password) => {
        const response = await api.post('/auth/local', {
            identifier: email,
            password: password
        });
        return response.data;
    },
}

export default api;