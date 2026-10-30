import BaseService from './BaseService'

class ServiceFileService extends BaseService {
    constructor() {
        // Replace with the real backend endpoint for your data setup screen.
        super('/api/service-file')
    }
}

const ServiceFile = new ServiceFileService()
export default ServiceFile
