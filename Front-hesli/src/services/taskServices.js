import axios from "axios";
const apiUrl = "http://localhost:3333/api/tasks";

// requêtes des todo vers l'api
export function getTasks() {
    return axios.get(apiUrl);
}

export function addTask(task) {
    return axios.post(apiUrl, task);
}

export function updateTask(id, task) {
    return axios.put(apiUrl + "/" + id, task);
}

export function deleteTask(id) {
    return axios.delete(apiUrl + "/" + id);
}

// requêtes des items vers l'api

export function getItem() {
    return axios.post(apiUrl + "/item/");
}

export function addItem(items) {
    return axios.post(apiUrl + "/item", items);
}

export function getItemFromTask(id) {
    return axios.get(apiUrl + "/item/" + id);
}

export function  updateItem(id, task) {
    return axios.put(apiUrl + "/item/" + id, task);
}
export function deleteItem(id) {
    return axios.delete(apiUrl + "/item/" + id);
}
