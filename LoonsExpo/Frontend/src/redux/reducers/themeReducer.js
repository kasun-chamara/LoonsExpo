import localStorageService from "services/localStorageService";

const initialState = {
    isDarkMode: (() => {
        const savedTheme = localStorageService.getItem('theme');
        return savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
    })(),
}

const themeReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'TOGGLE_THEME':
            const newDarkMode = !state.isDarkMode;
            localStorageService.setItem('theme', newDarkMode ? 'dark' : 'light');
            return {
                ...state,
                isDarkMode: newDarkMode,
            }
        case 'SET_THEME':
            localStorageService.setItem('theme', action.payload ? 'dark' : 'light');
            return {
                ...state,
                isDarkMode: action.payload,
            }
        default:
            return state
    }
}

export default themeReducer
