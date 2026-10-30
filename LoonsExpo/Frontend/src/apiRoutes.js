import { getEnv } from './envConfig'
let env = getEnv()

export const ENDPOINT = env.ENDPOINT
export const KEYCLOAK_URL = env.KEYCLOAK_URL



export const USERS = '/api/users';
export const ROLES = '/api/roles';
