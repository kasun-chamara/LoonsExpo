# Loons Admin App

A modern React admin dashboard built with Material-UI v7, featuring a responsive layout, role-based access control, and a comprehensive, modular component system.

## Features

### 🎨 Layout & Design
- **Responsive Design**: Mobile-first approach with collapsible sidebar
- **Static AppBar**: With menu toggle for mobile and theme toggle
- **Collapsible Sidebar**: Animated submenu groups with expand/collapse, logo always centered when collapsed
- **Static Footer**: Always visible at the bottom
- **Theme Support**: Light and dark theme with localStorage persistence
- **Consistent Topbar/Sidebar Colors**: Topbar and sidebar backgrounds match in both light and dark mode

### 🔐 Authentication & Authorization
- **Role-based Access Control**: Admin and User roles
- **Protected Routes**: Automatic redirection based on user permissions
- **Persistent Login**: User session stored in localStorage
- **Dynamic Menu**: Sidebar items show/hide based on user role

### 🧭 Navigation & Routing
- **React Router v6**: Client-side routing with lazy loading
- **Active Route Highlighting**: Current page highlighted in sidebar
- **Dynamic Icons**: Material-UI icons loaded dynamically
- **Sidebar Nested Menu**: Remembers expanded state and auto-expands based on route

### 📦 Reusable Components
- **CollapsibleSection**: Themed, collapsible content section
- **Printing**: Paginated print preview with custom header/footer and print stylesheet
- **Button, Card, MainCard, CodeBlock, Table, MuiTable, ConfirmDialog, TextValidator, RadioGroupField, CheckboxGroupField, AutocompleteField, DatePicker, TimePicker, DateTimePicker, ValidatorForm, CenteredSpinner, Label, etc.**
- **Theme Documentation**: Each component demo is shown in its own Card for clarity

### 🧩 Utility CSS Classes
- **SpacingGlobalStyles**: Margin, padding, width, and height utility classes (e.g., `.m-2`, `.p-4`, `.w-100`)
- **PositioningGlobalStyles**: Flex, alignment, overflow, and positioning classes (e.g., `.flex`, `.justify-center`, `.position-absolute`)
- **ShadowGlobalStyles**: Elevation utility classes (e.g., `.elevation-z1`, `.elevation-z8`)
- **BorderGlobalStyles**: Border radius and border utility classes (e.g., `.border-radius-8`, `.rounded`, `.border-none`)
- Use these classes in your JSX for rapid layout and style adjustments

## Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── themeFiles/       # Layout and theme wrappers (Header, Sidebar, Footer, MainLayout, etc.)
│   ├── CollapsibleSection/
│   ├── Printing/
│   ├── ... (other component folders)
│   ├── index.js          # Component exports
├── contexts/             # React context providers
│   ├── AppContext.js
│   ├── SettingsContext.js
│   └── ThemeContext.js
├── redux/                # Redux state management
│   ├── Store.js
│   └── reducers/
│       ├── index.js
│       ├── authReducer.js
│       └── themeReducer.js
│   └── actions/
│       └── authActions.js
├── routes/               # Route configuration
│   ├── RootRoutes.js
│   └── PublicRoutes.js
├── pages/                # Page components (feature-based organization)
│   ├── Dashboard/
│   ├── Profile/
│   ├── auth/
│   └── ThemeComponentsexamples/
├── auth/                 # Authentication utilities
│   └── AuthGuard.js
├── utils/                # Utility functions
│   └── history.js
├── theme/                # Theme configuration
│   ├── index.js
│   └── componentOverrides.js
├── fake-db/              # Mock data
│   └── index.js
├── navigation/           # Navigation configuration
│   └── navigations.js
├── styles/               # Global and utility styles
│   ├── SpacingGlobalStyles.js
│   ├── PositioningGlobalStyles.js
│   ├── ShadowGlobalStyles.js
│   ├── BorderGlobalStyles.js
│   ├── buttonColors.css
│   ├── globle.css
│   ├── fonts.css
│   └── GlobalCss.js
├── App.js                # Main app component with routing
└── index.js              # App entry point
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd mui-admin-app
```
2. Install dependencies:
```bash
npm install --legacy-peer-deps
```
3. Start the development server:
```bash
npm start
```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### New Machine Setup For Automated Testing

Run these steps once after cloning on a new computer.

1. Install prerequisites:
```powershell
winget install --id OpenJS.NodeJS.LTS -e
winget install --id Python.Python.3.12 -e
git --version
node --version
npm --version
python --version
```
2. Clone the repository and enter it:
```powershell
git clone <repository-url>
cd "theme with automated"
```
3. Keep this repo on LF line endings so the hooks do not fight Git on Windows:
```powershell
git config core.autocrlf false
```
4. Install project dependencies:
```powershell
npm install --legacy-peer-deps
```
5. Install pre-commit and verify it is available:
```powershell
python -m pip install pre-commit
pre-commit --version
```
6. Install the Git hooks used by this repository:
```powershell
pre-commit install
pre-commit install --hook-type pre-push
```
7. Verify the automated checks before doing any work:
```powershell
pre-commit run --all-files
pre-commit run --hook-stage pre-push --all-files
```

After setup:
- `git commit` automatically runs the pre-commit hooks.
- `git push` automatically runs the pre-push test and build checks.
- If hooks rewrite files, review them, stage them, and commit again.

### Available Scripts
- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App

## Usage

### 🧩 Utility CSS Classes
- Use utility classes like `.flex`, `.justify-center`, `.border-radius-8`, `.elevation-z1`, `.m-2`, `.p-4`, etc. in your JSX for rapid layout and style adjustments.
- All utility classes are injected globally via MUI's GlobalStyles components in `src/styles/` and imported in `src/index.js`.

### 🧭 Navigation
- Sidebar supports nested menus, remembers expanded state, and auto-expands based on the current route.
- When collapsed, only the logo is shown, centered horizontally.

### 🌓 Theme Management
- Topbar and sidebar backgrounds are always consistent in both light and dark mode.
- Theme preference is saved in localStorage and Redux state.

### 📚 Theme Documentation
- See `ThemeDocumentation.jsx` for live, interactive demos of all custom components.
- Each component demo is in its own Card for clarity and easy reference.

### 🏗️ Feature-Based & Component-Based Organization
- The codebase is organized for scalability, maintainability, and rapid development.
- Add new features or components by following the existing structure.
# LoonsExpo
