export function getEnv() {
    let envLocation = window.location.origin;

    switch (envLocation) {
        case "http://localhost:3000":
            return {
                ENDPOINT: 'http://172.208.49.138',
                KEYCLOAK_URL: 'http://localhost:8080',
                REALM: 'sri-lanka-health',
                CLIENT_ID: 'dli_client_public',
                ENVIRONMENT: 'development',
                DEBUG_MODE: true,
                LOG_LEVEL: 'debug',
                AUTH_METHOD: 'fake' // fake, jwt or 'keycloak'
            }

        case "http://localhost:3001":
            return {
                ENDPOINT: 'https://demo.safetysync.co',
                KEYCLOAK_URL: 'http://localhost:8080',
                REALM: 'sri-lanka-health',
                CLIENT_ID: 'dli_client_public',
                ENVIRONMENT: 'development',
                DEBUG_MODE: true,
                LOG_LEVEL: 'debug',
                AUTH_METHOD: 'fake' // fake, jwt or 'keycloak'
            }

        default:
            return {
                 ENDPOINT: 'http://172.208.49.138',
                KEYCLOAK_URL: 'http://localhost:8080',
                REALM: 'sri-lanka-health',
                CLIENT_ID: 'dli_client_public',
                ENVIRONMENT: 'production',
                DEBUG_MODE: true,
                LOG_LEVEL: 'debug',
                AUTH_METHOD: 'fake' // fake, jwt or 'keycloak'
            }
    }
}

// Helper function to get environment variable with fallback
export function getEnvVar(key, defaultValue = '') {
    const env = getEnv();
    return env[key] || defaultValue;
}

// Helper function to check if we're in development mode
export function isDevelopment() {
    return getEnv().ENVIRONMENT === 'development';
}

// Helper function to check if debug mode is enabled
export function isDebugMode() {
    return getEnv().DEBUG_MODE === true;
}
