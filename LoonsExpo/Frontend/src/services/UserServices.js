import BaseService from './BaseService';
import * as apiroutes from '../apiRoutes';

class UserService extends BaseService {
    constructor() {
        super(apiroutes.USERS);
    }
    async create(data) {
        //return await super.create(data);
        return await super.customCall('POST', `/register`, data, null, 'json');

    }
    async createByAdmin(data) {
        //return await super.create(data);
        return await super.customCall('POST', `/admin-invite`, data, null, 'json');

    }
    async compliteUserRegistration(data,id) {

       //return await super.create(data);
        return await super.customCall('POST', `/complete-registration/${id}`, data, null, 'json');

    }
    async update(id, data) {
        return await super.customCall('PUT', `/${id}`, data, null, 'json');
    }

    async delete(id) {
        return await super.delete(id)
    }

    async get(params = {}) {
        return await super.getAll(params)
    }
    async getAll(params = {}) {
        return await super.customCall("GET", '', null, params, null)
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
}

const UserServices = new UserService();
export default UserServices;
