# Dataset Management Screen Implementation Instructions

## 🎯 Screen Objective
Create a comprehensive Dataset Management screen that allows users to view, create, edit, and manage datasets with a clean, intuitive interface.

## 🔍 Screen Requirements

### 1. Data Model
- **Entity Name**: Dataset
- **Fields**:
  - `id`: Unique identifier (UUID/string)
  - `code`: Unique dataset code (string, required)
  - `description`: Detailed dataset description (string, required)
  - `createdAt`: Timestamp of creation
  - `updatedAt`: Timestamp of last update

### 2. API Endpoints
#### GET Endpoint
- **URL**: `/api/datasets`
- **Method**: GET
- **Query Parameters**:
  - `page`: Current page number (default: 1)
  - `limit`: Items per page (default: 10)
  - `search`: Optional search term

#### POST Endpoint
- **URL**: `/api/datasets`
- **Method**: POST
- **Request Body**:
  ```json
  {
    "code": "string",
    "description": "string"
  }
  ```

#### PUT Endpoint
- **URL**: `/api/datasets/{id}`
- **Method**: PUT
- **Request Body**:
  ```json
  {
    "code": "string",
    "description": "string"
  }
  ```

#### DELETE Endpoint
- **URL**: `/api/datasets/{id}`
- **Method**: DELETE

### 3. Screen Layout Components
- Main Card/Container
- Form Section
  - Input for Dataset Code
  - Textarea for Description
- Data Table
  - Columns: Code, Description, Actions
- Pagination
- Action Buttons
  - New Dataset
  - Edit
  - Delete

### 4. Validation Rules
- Dataset Code:
  - Required
  - Minimum length: 3 characters
  - Maximum length: 50 characters
  - Unique across datasets

- Description:
  - Required
  - Minimum length: 10 characters
  - Maximum length: 500 characters

### 5. User Interactions
- Create new dataset
- Edit existing dataset
- Delete dataset
- Paginate through datasets
- Search/filter datasets

### 6. Error Handling
- Display validation errors
- Show toast notifications for:
  - Successful operations
  - Error scenarios
  - Network failures

## 🛠 Technical Specifications
- **Frontend Framework**: React
- **State Management**: Zustand
- **Form Handling**: React Hook Form
- **Validation**: Zod
- **UI Components**: Shadcn/UI
- **Styling**: Tailwind CSS

## 📋 Acceptance Criteria
- [ ] Responsive design
- [ ] Proper form validation
- [ ] Pagination functionality
- [ ] CRUD operations working correctly
- [ ] Error messages displayed appropriately
- [ ] Loading states implemented

## 🚀 Performance Considerations
- Implement lazy loading for table
- Use debounce for search functionality
- Optimize API calls
- Implement client-side caching

## 🔐 Security Notes
- Implement proper input sanitization
- Use secure API calls
- Add role-based access control

## 💡 Additional Hints
- Use TypeScript for type safety
- Implement proper error boundaries
- Create reusable components
- Follow atomic design principles

## Example JSON Payload
```json
{
  "datasets": [
    {
      "id": "uuid-1234-5678",
      "code": "DS001",
      "description": "Primary research dataset for Q1 2024",
      "createdAt": "2024-02-15T10:30:00Z",
      "updatedAt": "2024-02-15T10:30:00Z"
    }
  ],
  "pagination": {
    "total": 50,
    "page": 1,
    "limit": 10
  }
}
```

## 📝 Notes for AI
- Focus on clean, modular code
- Prioritize user experience
- Ensure accessibility
- Implement responsive design
- Use modern React patterns (hooks, functional components)
