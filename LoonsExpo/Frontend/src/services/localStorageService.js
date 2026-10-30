const localStorageService = {
    setItem: (key, value) => {
        value = JSON.stringify(value)
        localStorage.setItem(key, value);
    },
    getItem: (key) => {
        let value = localStorage.getItem(key);
        try {
            return JSON.parse(value)
        } catch (e) {
            return null
        }
    },
    removeItem: (key) => {
        localStorage.removeItem(key);
        return true
    },
};

export default localStorageService;
