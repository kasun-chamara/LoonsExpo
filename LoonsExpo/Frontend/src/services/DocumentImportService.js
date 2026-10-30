import axiosInstance from './axios';

const BASE_PATH = '/api/document-imports';

class DocumentImportService {
    static async create(payload) {
        const response = await axiosInstance.post(BASE_PATH, payload);
        return response.data;
    }

    static async getAll() {
        const response = await axiosInstance.get(BASE_PATH);
        return response.data;
    }
}

export default DocumentImportService;
