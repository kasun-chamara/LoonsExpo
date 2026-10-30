import axiosInstance from './axios'
import localStorageService from './localStorageService'

class BaseService {
    constructor(baseURL) {
        this.baseURL = baseURL
    }

    // Generic API call method with better error handling
    async makeApiCall(method, url, data = null, params = null, contentType = 'json') {
        const user = await localStorageService.getItem('user')

        try {
            const config = {
                method,
                url,
                ...(data && {data,...{ company_id: user?.company_id} }),
                ...(params && {params,...{ company_id: user?.company_id} })
            }

            // Set content type based on parameter
            if (contentType === 'multipart') {
                config.headers = {
                    'Content-Type': 'multipart/form-data'
                }
            } else if (contentType === 'form') {
                config.headers = {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            } else if (contentType === 'json') {
                config.headers = {
                    'Content-Type': 'application/json'
                }
            }

            const response = await axiosInstance(config)
            return {
                success: true,
                data: response.data,
                status: response.status,
                message: 'Operation completed successfully'
            }
        } catch (error) {
            return {
                success: false,
                error: error.response?.data || error.message,
                status: error.response?.status,
                message: this.getErrorMessage(error)
            }
        }
    }

    // Get user-friendly error message
    getErrorMessage(error) {
        const { response } = error

        if (response?.data?.message) {
            return response.data.message
        }

        if (response?.data?.error) {
            return response.data.error
        }

        switch (response?.status) {
            case 401: return 'Unauthorized access. Please login again.'
            case 403: return 'Access forbidden. Insufficient permissions.'
            case 404: return 'Resource not found.'
            case 422: return 'Validation error. Please check your input.'
            case 500: return 'Server error. Please try again later.'
            default: return 'An unexpected error occurred.'
        }
    }

    // Common CRUD operations
    async getAll(params = {}) {
        const user = await localStorageService.getItem('user')
        const defaultParams = {
            company_id: user?.company_id,
            ...params
        }

        return await this.makeApiCall('GET', this.baseURL, null, defaultParams)
    }

    async getById(id) {
        if (!id) {
            return {
                success: false,
                error: 'ID is required',
                message: 'ID is required'
            }
        }

        return await this.makeApiCall('GET', `${this.baseURL}/${id}`)
    }

    async getByPost(params = {}) {
        const user = await localStorageService.getItem('user')
        const defaultParams = {
            company_id: user?.company_id,
            ...params
        }
        return await this.makeApiCall('POST', this.baseURL, defaultParams, null, null)
    }

    async create(data, contentType = 'json') {
        if (!data || Object.keys(data).length === 0) {
            return {
                success: false,
                error: 'Data is required',
                message: 'Data is required'
            }
        }

        return await this.makeApiCall('POST', this.baseURL, data, null, contentType)
    }

    async update(id, data, contentType = 'json') {
        if (!id) {
            return {
                success: false,
                error: 'ID is required',
                message: 'ID is required'
            }
        }

        if (!data || Object.keys(data).length === 0) {
            return {
                success: false,
                error: 'Update data is required',
                message: 'Update data is required'
            }
        }

        return await this.makeApiCall('PATCH', `${this.baseURL}/${id}`, data, null, contentType)
    }

    async updateByPut(id, data, contentType = 'json') {
        if (!id) {
            return {
                success: false,
                error: 'ID is required',
                message: 'ID is required'
            }
        }

        if (!data || Object.keys(data).length === 0) {
            return {
                success: false,
                error: 'Update data is required',
                message: 'Update data is required'
            }
        }

        return await this.makeApiCall('PUT', `${this.baseURL}/${id}`, data, null, contentType)
    }

    async delete(id) {
        if (!id) {
            return {
                success: false,
                error: 'ID is required',
                message: 'ID is required'
            }
        }

        return await this.makeApiCall('DELETE', `${this.baseURL}/${id}`)
    }

    // Search functionality
    async search(searchTerm, filters = {}) {
        const searchParams = {
            search: searchTerm,
            ...filters
        }

        return await this.makeApiCall('GET', `${this.baseURL}/search`, null, searchParams)
    }

    // Bulk operations
    async bulkUpdate(ids, updateData) {
        if (!Array.isArray(ids) || ids.length === 0) {
            return {
                success: false,
                error: 'IDs array is required',
                message: 'IDs array is required'
            }
        }

        return await this.makeApiCall('PATCH', `${this.baseURL}/bulk-update`, {
            ids,
            ...updateData
        })
    }

    async bulkDelete(ids) {
        if (!Array.isArray(ids) || ids.length === 0) {
            return {
                success: false,
                error: 'IDs array is required',
                message: 'IDs array is required'
            }
        }

        return await this.makeApiCall('DELETE', `${this.baseURL}/bulk-delete`, { ids })
    }

    // Export functionality
    async export(format = 'csv', filters = {}) {
        const exportParams = {
            format,
            ...filters
        }

        return await this.makeApiCall('GET', `${this.baseURL}/export`, null, exportParams)
    }

    // Custom API call
    async customCall(method, endpoint, data = null, params = null, contentType = 'json') {
        const url = endpoint.startsWith('http') ? endpoint : `${this.baseURL}${endpoint}`
        return await this.makeApiCall(method, url, data, params, contentType)
    }

    // File upload helper
    async uploadFile(file, additionalData = {}) {
        const formData = new FormData()

        // Add file
        if (file instanceof File) {
            formData.append('file', file)
        } else if (Array.isArray(file)) {
            file.forEach((f, index) => {
                formData.append(`file_${index}`, f)
            })
        }

        // Add additional data
        Object.keys(additionalData).forEach(key => {
            formData.append(key, additionalData[key])
        })

        return await this.makeApiCall('POST', `${this.baseURL}/upload`, formData, null, 'multipart')
    }

    // Multiple file upload helper
    async uploadMultipleFiles(files, additionalData = {}) {
        const formData = new FormData()

        // Add multiple files
        if (Array.isArray(files)) {
            files.forEach((file, index) => {
                formData.append('files', file)
            })
        }

        // Add additional data
        Object.keys(additionalData).forEach(key => {
            formData.append(key, additionalData[key])
        })

        return await this.makeApiCall('POST', `${this.baseURL}/upload-multiple`, formData, null, 'multipart')
    }
}

export default BaseService
