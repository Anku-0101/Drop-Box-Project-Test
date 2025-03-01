import axios from "axios";

const BASE_URL = "http://localhost:8080/files";

export const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    return axios.post(`${BASE_URL}/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
};

export const getAllFiles = async () => {
    const response = await axios.get(BASE_URL);
    return response.data;
};

export const downloadFile = async (fileName) => {
    return axios.get(`${BASE_URL}/${fileName}`, { responseType: "blob" });
};
