const initialState = {
    user: (() => {
        try {
            const userData = localStorage.getItem('user')
            return userData ? JSON.parse(userData) : null
        } catch (error) {
            console.error('Error parsing user data from localStorage:', error)
            return null
        }
    })(),
    accessToken: localStorage.getItem('access_token') || null,
    refreshToken: localStorage.getItem('refresh_token') || null,
    isAuthenticated: !!localStorage.getItem('access_token'),
    error: null,
}

export default function authReducer(state = initialState, action) {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                user: action.payload.user,
                accessToken: action.payload.accessToken,
                refreshToken: action.payload.refreshToken,
                isAuthenticated: true,
                error: null,
            }
        case 'LOGIN_FAILURE':
            return {
                ...state,
                user: null,
                accessToken: null,
                refreshToken: null,
                isAuthenticated: false,
                error: action.payload,
            }
        case 'LOGOUT':
            return {
                ...state,
                user: null,
                accessToken: null,
                refreshToken: null,
                isAuthenticated: false,
                error: null,
            }
        case 'UPDATE_USER':
            return {
                ...state,
                user: { ...state.user, ...action.payload },
            }
        default:
            return state
    }
}
