// import * as apiroutes from '../apiRoutes'
// import localStorageService from './localStorageService'

// class FileServices {
//     static async getIncidentImage(name) {
//         try {
//             if (name) {
//                 const accessToken = await localStorageService.getItem('access_token')

//                 const response = await fetch(`${apiroutes.INCIDENTS}/preview/${name}`, { headers: { Authorization: `Bearer ${accessToken}` } })
//                 if (!response.ok) {
//                     throw new Error('Failed to fetch image')
//                 }

//                 return window.URL.createObjectURL(await response.blob())

//             } else {
//                 return '/assets/siteLogo/logo.png'

//             }
//         } catch (error) {
//             return '/assets/images/no-header-img.jpg'
//         }


//     }


//     static async getAnalysistImage(name) {
//         try {
//             if (name) {
//                 const accessToken = await localStorageService.getItem('access_token')

//                 const response = await fetch(`${apiroutes.INCIDENT_ANALYSIS}/preview/${name}`, { headers: { Authorization: `Bearer ${accessToken}` } })
//                 if (!response.ok) {
//                     throw new Error('Failed to fetch image')
//                 }

//                 return window.URL.createObjectURL(await response.blob())

//             } else {
//                 return '/assets/siteLogo/logo.png'

//             }
//         } catch (error) {
//             return '/assets/images/no-header-img.jpg'
//         }


//     }


// }

// export default FileServices
