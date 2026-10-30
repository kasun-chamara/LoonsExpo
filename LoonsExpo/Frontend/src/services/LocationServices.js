import BaseService from './BaseService'
import * as apiroutes from '../apiRoutes'

class LocationService extends BaseService {
    constructor() {
        super(apiroutes.LOCATIONS)
    }

    // Output-specific methods
    async create(data) {
        // Validate required fields
    /*     const requiredFields = ['description', 'dli_id']
        const missingFields = requiredFields.filter(field => !data[field])

        if (missingFields.length > 0) {
            return {
                success: false,
                error: `Missing required fields: ${missingFields.join(', ')}`,
                message: `Missing required fields: ${missingFields.join(', ')}`
            }
        }
 */
        return await super.create(data)
    }

    async update(id, data) {
        return await super.updateByPut(id, data)
    }

    async delete(id) {
        return await super.delete(id)
    }

    async get(params = {}) {
        return await super.getAll(params)
    }
     async getAll(params = {}) {
        return await super.customCall("GET", '',null, params,null)
    }
     async getFromPost(params = {}) {
        return await super.getByPost(params)
    }

    async getById(id) {
        return await super.getById(id)
    }

    async search(searchTerm, filters = {}) {
        return await super.search(searchTerm, filters)
    }

    async bulkUpdate(ids, updateData) {
        return await super.bulkUpdate(ids, updateData)
    }

    async bulkDelete(ids) {
        return await super.bulkDelete(ids)
    }

    async export(format = 'csv', filters = {}) {
        return await super.export(format, filters)
    }
}

// Create instance and export it
const LocationServices = new LocationService()
export default LocationServices
