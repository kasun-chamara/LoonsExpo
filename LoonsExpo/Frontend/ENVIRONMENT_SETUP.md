# Environment Configuration Guide

## Current Setup

Your application currently uses `src/envConfig.js` to manage environment variables based on the current URL. This approach works well and doesn't require a `.env` file.

## How to Create a .env File (Optional)

If you want to use traditional `.env` files, follow these steps:

### 1. Create .env file in the root directory

Create a file named `.env` in your project root (same level as `package.json`) with the following content:

```env
# API Configuration
REACT_APP_API_BASE_URL=http://172.171.243.26
REACT_APP_API_ENDPOINT=http://172.171.243.26/api

# Keycloak Configuration
REACT_APP_KEYCLOAK_URL=http://localhost:8080
REACT_APP_KEYCLOAK_REALM=sri-lanka-health
REACT_APP_KEYCLOAK_CLIENT_ID=dli_client_public

# App Configuration
REACT_APP_NAME=Your App Name
REACT_APP_ENVIRONMENT=development
REACT_APP_DEBUG_MODE=true
```

### 2. Create .env.development for development

```env
REACT_APP_API_BASE_URL=http://172.171.243.26
REACT_APP_KEYCLOAK_URL=http://localhost:8080
REACT_APP_ENVIRONMENT=development
REACT_APP_DEBUG_MODE=true
```

### 3. Create .env.production for production

```env
REACT_APP_API_BASE_URL=https://your-production-api.com
REACT_APP_KEYCLOAK_URL=https://your-production-keycloak.com
REACT_APP_ENVIRONMENT=production
REACT_APP_DEBUG_MODE=false
```

## Important Notes

1. **React Environment Variables**: All environment variables must start with `REACT_APP_` to be accessible in your React application.

2. **Security**: Never commit `.env` files to version control. Add them to `.gitignore`.

3. **Current Approach**: Your current `envConfig.js` approach is perfectly fine and doesn't require `.env` files.

## Using Environment Variables in Code

### With .env files:
```javascript
const apiUrl = process.env.REACT_APP_API_BASE_URL;
```

### With current envConfig.js:
```javascript
import { getEnv } from './envConfig';
const env = getEnv();
const apiUrl = env.ENDPOINT;
```

## Benefits of Current Approach

✅ **No .env file needed**
✅ **URL-based environment detection**
✅ **Easy to maintain**
✅ **Works with any deployment setup**
✅ **No build-time configuration needed**

## When to Use .env Files

Consider using `.env` files if you:
- Need different configurations for different developers
- Want to use CI/CD environment variables
- Need to change configuration without code changes
- Want to follow traditional React patterns

## Current Configuration

Your application is already properly configured with:
- ✅ API endpoint: `http://172.171.243.26`
- ✅ Keycloak URL: `http://localhost:8080`
- ✅ Development logging enabled
- ✅ Error handling configured
- ✅ Token refresh working

**No changes needed!** Your current setup is production-ready. 🚀
