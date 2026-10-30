# Theme System Documentation

Welcome to the theme documentation for this MUI Admin App. This guide explains how the custom theme system works, how to use and extend it, and how to ensure a consistent, modern look across the application. The theme system leverages Material-UI (MUI) v7, Redux for state management, and custom utility styles for rapid development.

**Key benefits:**
- Centralized theme control
- Light/dark mode
- Global utility classes
- Easy extensibility for new components

## Theme Architecture Overview

The theme system is built on top of MUI's `ThemeProvider` and Redux. Here's how it works:

- Redux stores the current theme mode (light/dark) and user preferences.
- ThemeProvider (in LoonsTheme.js) applies the theme to the app, using values from Redux.
- Theme files (src/theme/) define color palettes, typography, spacing, and component overrides.
- Global utility stylesheets provide reusable CSS classes for positioning, shadows, and borders.

**Tip:** Use the `useTheme` hook in your components to access theme values.

## Theme Overview

This application uses Material-UI (MUI) with a custom theme system that supports both light and dark modes. The theme is managed through Redux and persists user preferences in localStorage.

Key features:
- Light and Dark mode support
- Persistent theme preferences
- Customizable color palette and component styles

## Theme File Structure

Understanding the theme file structure is essential for making theme changes.

### Core Theme Files
- src/theme/index.js - Main theme configuration with light and dark themes
- src/theme/componentOverrides.js - Custom component style overrides
- src/components/themeFiles/LoonsTheme.js - Theme provider wrapper with Redux integration

### State Management
- src/redux/reducers/themeReducer.js - Redux theme state management
- src/components/themeFiles/Header.jsx - Theme toggle button implementation

## Theme File Structure Tree

Complete file structure showing all theme-related files and their relationships.

```
mui-admin-app/
📁 src/
  📁 theme/
    📄 index.js                    # Main theme configuration
    📄 componentOverrides.js       # Component style overrides
  📁 components/
    📁 themeFiles/
      📄 LoonsTheme.js             # Theme provider wrapper
      📄 Header.jsx                # Header with theme toggle
      📄 Sidebar.jsx               # Sidebar with theme colors
      📄 Footer.jsx                # Footer with theme colors
      📄 MainLayout.jsx            # Main layout wrapper
  📁 pages/
    📁 Dashboard/
      📄 Dashboard.jsx             # Main dashboard page
      📄 DashboardRoutes.js        # Dashboard route definitions
      📄 index.js                  # Dashboard exports
    📁 auth/
      📄 Login.jsx                 # Login page
      📄 AuthRoutes.js             # Authentication routes
      📄 index.js                  # Auth exports
    📁 inventory/
      📄 AddItem.jsx               # Add inventory item
      📄 CheckStock.jsx            # Check stock levels
      📄 StockReport.jsx           # Stock reports
      📄 InventoryRoutes.js        # Inventory routes
      📄 index.js                  # Inventory exports
    📁 reports/
      📄 SalesReport.jsx           # Sales reports
      📄 UserActivity.jsx          # User activity reports
      📄 ReportsRoutes.js          # Reports routes
      📄 index.js                  # Reports exports
    📁 settings/
      📄 Settings.jsx              # Settings page
      📄 SettingsRoutes.js         # Settings routes
      📄 index.js                  # Settings exports
    📁 Profile/
      📄 Profile.jsx               # User profile page
      📄 index.js                  # Profile exports
    📁 ThemeComponentsexamples/
      📄 ThemeDocumentation.jsx    # Theme documentation
      📄 ThemeExamplesRoutes.js    # Theme examples routes
      📄 index.js                  # Theme examples exports
  📁 routes/
    📄 RootRoutes.js              # Main application routes
    📄 PublicRoutes.js            # Public routes (no auth required)
  📁 navigation/
    📄 navigations.js             # Navigation menu configuration
  📁 services/
    📄 axios.js                   # HTTP client configuration
    📄 keycloakService.js         # Keycloak authentication service
    📄 localStorageService.js     # Local storage utilities
  📁 auth/
    📄 AuthGuard.js               # Authentication guard component
    📄 ProtectedRoute.jsx         # Protected route wrapper
  📁 redux/
    📁 reducers/
      📄 themeReducer.js           # Theme state management
      📄 authReducer.js            # Authentication state management
      📄 index.js                  # Root reducer
    📁 actions/
      📄 authActions.js            # Authentication actions
    📄 Store.js                   # Redux store configuration
  📁 contexts/
    📄 AppContext.js              # Application context
    📄 SettingsContext.js         # Settings context
    📄 ThemeContext.js            # Theme context (legacy)
  📁 styles/
    📄 GlobalCss.js               # Global CSS styles
    📄 SpacingGlobalStyles.js     # Utility spacing classes
    📄 globle.css                 # Global CSS file
    📄 buttonColors.css           # Button color utilities
    📄 fonts.css                  # Font definitions
  📄 App.js                      # Main application component
  📄 index.js                    # Application entry point
  📄 envConfig.js                # Environment configuration
  📄 apiRoutes.js                # API route definitions
```

### File Descriptions

#### Core Theme Files
- src/theme/index.js - Contains lightTheme and darkTheme configurations with palette, typography, and component overrides
- src/theme/componentOverrides.js - Custom MUI component style overrides for consistent theming across the app
- src/components/themeFiles/LoonsTheme.js - Theme provider that connects Redux theme state to MUI ThemeProvider

#### State & Layout Files
- src/redux/reducers/themeReducer.js - Redux reducer for theme state management with localStorage persistence
- src/components/themeFiles/Header.jsx - Header component with theme toggle button and user menu
- src/styles/GlobalCss.js - Global CSS styles using MUI's GlobalStyles component

#### Pages & Routes
- src/pages/Dashboard/Dashboard.jsx - Main dashboard page with statistics and data visualization
- src/routes/RootRoutes.js - Main application routing configuration
- src/navigation/navigations.js - Navigation menu structure and configuration

#### Services & Auth
- src/services/keycloakService.js - Keycloak authentication service for user login/logout
- src/auth/AuthGuard.js - Authentication guard component for route protection
- src/redux/actions/authActions.js - Redux actions for authentication state management

## Color Palette

The current theme's color palette. These colors are used throughout the application.

### Primary Colors
- Primary Main: [theme.palette.primary.main]
- Primary Light: [theme.palette.primary.light]
- Primary Dark: [theme.palette.primary.dark]

### Secondary Colors
- Secondary Main: [theme.palette.secondary.main]
- Secondary Light: [theme.palette.secondary.light]
- Secondary Dark: [theme.palette.secondary.dark]

### Background Colors
- Background Default: [theme.palette.background.default]
- Background Paper: [theme.palette.background.paper]

### Text Colors
- Text Primary: [theme.palette.text.primary]
- Text Secondary: [theme.palette.text.secondary]

## How to Change Theme Colors

To change theme colors, edit the palette object in `src/theme/index.js`:

```javascript
// src/theme/index.js
export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',    // Change this to your primary color
      light: '#42a5f5',   // Lighter shade
      dark: '#1565c0',    // Darker shade
    },
    secondary: {
      main: '#9c27b0',    // Change this to your secondary color
      light: '#ba68c8',
      dark: '#7b1fa2',
    },
    background: {
      default: '#fbfbfb', // Main background color
      paper: '#ffffff',   // Card/paper background
    },
    text: {
      primary: '#646464',   // Main text color
      secondary: '#757575', // Secondary text color
    },
  },
  // ... other theme properties
});
```

## Themed Component Examples

All custom components are themed and consistent with the current theme.

### Button Component

Themed button component with various variants and colors.

```javascript
import Button from 'components/Button';

<Button variant="contained" color="primary">Primary</Button>
<Button variant="outlined" color="secondary">Secondary</Button>
<Button variant="text" color="error">Error</Button>
<Button variant="contained" color="success">Success</Button>
<Button variant="contained" color="warning">Warning</Button>
```

### CollapsibleSection Component

```javascript
import { CollapsibleSection } from 'components';

<CollapsibleSection
  title="Collapsible Section Title"
  buttonText="Show/Hide"
  collapsTrigger={false}
  underLineVisible={true}
  showButton={true}
>
  <div>
    This is the content inside the collapsible section. You can put any React node here.
  </div>
</CollapsibleSection>
```

### MuiTable Component

Advanced table component with drag scrolling, mobile responsiveness, and Material React Table features.

```javascript
import MuiTable from 'components/MuiTable';

const columns = [
  {
    accessorKey: 'name',
    header: 'Name',
    size: 150,
  },
  {
    accessorKey: 'email',
    header: 'Email',
    size: 200,
  },
  {
    accessorKey: 'role',
    header: 'Role',
    size: 120,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    size: 100,
    Cell: ({ cell }) => (
      <Box
        sx={{
          backgroundColor: cell.getValue() === 'Active' ? 'success.light' : 'error.light',
          color: cell.getValue() === 'Active' ? 'success.dark' : 'error.dark',
          padding: '4px 8px',
          borderRadius: '4px',
          fontSize: '0.75rem',
          fontWeight: 'bold',
        }}
      >
        {cell.getValue()}
      </Box>
    ),
  },
];

const data = [
  { name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
  { name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Inactive' },
];

<MuiTable
  columns={columns}
  data={data}
  enableColumnFilters={true}
  enableSorting={true}
  enablePagination={true}
  enableRowSelection={true}
  loading={false}
/>
```

### Card Components

Basic card and main card components for content organization.

```javascript
import Card from 'components/Card';
import MainCard from 'components/MainCard';

// Basic Card
<Card>
  <Box p={2}>
    <Typography variant="h6">Card Title</Typography>
    <Typography variant="body2">Card content goes here.</Typography>
  </Box>
</Card>

// Main Card with Header
<MainCard title="Main Card Title">
  <Typography variant="body2">Main card content with header.</Typography>
</MainCard>
```

### Component Layout Standard

Recommended structure for themed form screens: keep state in `formData`, load and save through a dedicated service file, and wrap the screen inside `MainCard`.

For real screens, keep backend calls inside a service such as `services/serviceFile.js` and call that service from `getData` and `submitData`.

```javascript
import { Grid } from '@mui/material';
import {
  Button,
  CollapsibleSection,
  MainCard,
  MuiTable,
  TextValidator,
  ValidatorForm,
  Autocomplete,
} from 'components';
import React, { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import ServiceFile from 'services/serviceFile';
import { close_reason_type } from 'appConst';

const DataSetupScreen = () => {
  const [formData, setFormData] = useState({
    reason: '',
    type: '',
  });
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [editingData, setEditingData] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [filters, setFilters] = useState({
    page: 0,
    limit: 20,
    search: null,
    type: null,
  });
  const [totalItems, setTotalItems] = useState(0);

  const getData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await ServiceFile.getAll(filters);

      if (response.success) {
        setData(response?.data?.view?.data || []);
        setTotalItems(response?.data?.view?.totalItems || 0);
      } else {
        toast.error(response.message || 'Failed to load data.');
      }
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    getData();
  }, [getData]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const submitData = async (event) => {
    event.preventDefault();
    setSubmitting(true);

    try {
      const apiData = Object.fromEntries(
        Object.entries(formData).filter(([_, value]) => value !== null && value !== '')
      );

      const response = isEdit
        ? await ServiceFile.update(editingData, apiData)
        : await ServiceFile.create(apiData);

      if (response.success) {
        toast.success(response.message || (isEdit ? 'Updated successfully.' : 'Created successfully.'));
        setFormData({ reason: '', type: '' });
        setIsEdit(false);
        setEditingData(null);
        getData();
      } else {
        toast.error(response.message || 'Failed to submit data.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <MainCard>
      <CollapsibleSection title="Setup Form" buttonText="Add New Item">
        <ValidatorForm onSubmit={submitData}>
          <Grid container spacing={2}>
            <Grid size={{ lg: 6, md: 6, sm: 12, xs: 12 }}>
              <TextValidator
                label="Reason"
                name="reason"
                value={formData.reason}
                onChange={handleInputChange}
                validators={['required']}
                errorMessages={['This field is required']}
                required
                disabled={loading}
                multiline
                rows={3}
              />
            </Grid>

            <Grid size={{ lg: 6, md: 6, sm: 12, xs: 12 }}>
              <Autocomplete
                name="type"
                label="Type"
                options={close_reason_type}
                value={close_reason_type.find((item) => item.value === formData.type) || null}
                getOptionLabel={(option) => option.label || ''}
                onChange={(event, newValue) => {
                  setFormData((prev) => ({
                    ...prev,
                    type: newValue?.value || '',
                  }));
                }}
              />
            </Grid>

            <Grid>
              <Button type="submit" process={submitting}>
                {isEdit ? 'UPDATE' : 'SAVE'}
              </Button>
            </Grid>
          </Grid>
        </ValidatorForm>

        <MuiTable
          data={data}
          loading={loading}
          rowCount={totalItems}
          manualPagination
          currentPage={filters.page}
          pageSize={filters.limit}
          onPageChange={(page) => setFilters((prev) => ({ ...prev, page: page - 1 }))}
          onPageSizeChange={(limit) => setFilters((prev) => ({ ...prev, limit }))}
          columns={[
            { accessorKey: 'reason', header: 'Reason' },
            { accessorKey: 'type', header: 'Type' },
            { accessorKey: 'status', header: 'Status' },
          ]}
        />
      </CollapsibleSection>
    </MainCard>
  );
};
```

Service file standard (based on CaseCloseReasonsServices):

```javascript
import BaseService from './BaseService';
import * as apiroutes from '../apiRoutes';

class CaseCloseReasonsServices extends BaseService {
  constructor() {
    super(apiroutes.Case_Close_Reasons);
  }

  async create(data) {
    return await super.customCall('POST', '', data, null, 'json');
  }

  async update(id, data) {
    const isFormData = data instanceof FormData;
    return await super.customCall(
      'PATCH',
      `/${id}`,
      data,
      null,
      isFormData ? 'multipart' : 'json'
    );
  }

  async delete(id) {
    return await super.delete(id);
  }

  async get(params = {}) {
    return await super.getAll(params);
  }

  async getAll(params = {}) {
    return await super.customCall('GET', '', null, params, null);
  }

  async getImage(id) {
    return await super.customCall('GET', `/${id}/logo`, null, null, null);
  }

  async getFromPost(params = {}) {
    return await super.getByPost(params);
  }

  async getById(id) {
    return await super.getById(id);
  }

  async search(searchTerm, filters = {}) {
    return await super.search(searchTerm, filters);
  }

  async bulkUpdate(ids, updateData) {
    return await super.bulkUpdate(ids, updateData);
  }

  async bulkDelete(ids) {
    return await super.bulkDelete(ids);
  }

  async export(format = 'csv', filters = {}) {
    return await super.export(format, filters);
  }
}

const caseCloseReasonsServices = new CaseCloseReasonsServices();
export default caseCloseReasonsServices;
```

### Confirm Dialog Component

Custom confirmation dialog with different types and actions.

```javascript
import ConfirmDialog from 'components/ConfirmDialog';

ConfirmDialog({
  type: 'warning', // 'info', 'error', 'warning', 'success'
  title: 'Confirm Action',
  description: 'Are you sure you want to proceed?',
  buttons: [
    {
      label: 'Cancel',
      onClick: () => console.log('Cancelled')
    },
    {
      label: 'Confirm',
      onClick: () => console.log('Confirmed')
    }
  ]
});
```

### TextValidator Component

Form input component with built-in validation and theming.

```javascript
import TextValidator from 'components/TextValidator';
import ValidatorForm from 'components/ValidatorForm';

<ValidatorForm>
  <TextValidator
    label="Email Address"
    name="email"
    type="email"
    validators={["required", "isEmail"]}
    errorMessages={["Email is required", "Email is not valid"]}
  />
  <TextValidator
    label="Password"
    name="password"
    type="password"
    validators={["required", "minStringLength:6"]}
    errorMessages={["Password is required", "Password must be at least 6 characters"]}
  />
</ValidatorForm>
```

### RadioGroupField Component

Radio button group with validation and row/column layout options.

```javascript
import RadioGroupField from 'components/RadioGroupField';
import ValidatorForm from 'components/ValidatorForm';

<ValidatorForm>
  <RadioGroupField
    name="gender"
    label="Select Gender"
    radioButtons={[
      { value: 'male', label: 'Male' },
      { value: 'female', label: 'Female' },
      { value: 'other', label: 'Other' },
    ]}
    row={true} // Display in row (horizontal)
    required={true}
  />
</ValidatorForm>
```

### CheckboxGroupField Component

Checkbox group with validation and multiple selection support.

```javascript
import CheckboxGroupField from 'components/CheckboxGroupField';
import ValidatorForm from 'components/ValidatorForm';

<ValidatorForm>
  <CheckboxGroupField
    name="interests"
    label="Select Interests"
    checkboxes={[
      { value: 'sports', label: 'Sports' },
      { value: 'music', label: 'Music' },
      { value: 'reading', label: 'Reading' },
      { value: 'travel', label: 'Travel' },
    ]}
    row={true} // Display in row (horizontal)
    required={true}
  />
</ValidatorForm>
```

### Autocomplete Component

Autocomplete input with validation, multiple selection, and freeSolo options.

```javascript
import Autocomplete from 'components/AutocompleteField';
import ValidatorForm from 'components/ValidatorForm';

<ValidatorForm>
  <Autocomplete
    name="country"
    label="Select Country"
    options={[
      { label: 'United States', value: 'us' },
      { label: 'Canada', value: 'ca' },
      { label: 'United Kingdom', value: 'uk' },
      { label: 'Australia', value: 'au' },
    ]}
    getOptionLabel={(option) => option.label || ''}
    isOptionEqualToValue={(opt, val) => opt.value === val?.value}
    required={true}
  />
</ValidatorForm>
```

### Date & Time Picker Components

Date, time, and datetime picker components with validation and custom formats.

```javascript
import DatePicker from 'components/DatePicker';
import TimePicker from 'components/TimePicker';
import DateTimePicker from 'components/DateTimePicker';
import ValidatorForm from 'components/ValidatorForm';

<ValidatorForm>
  <DatePicker
    name="birthDate"
    label="Birth Date"
    format="MM/dd/yyyy"
    required={true}
  />

  <TimePicker
    name="meetingTime"
    label="Meeting Time"
    format="HH:mm"
    required={true}
  />

  <DateTimePicker
    name="appointment"
    label="Appointment"
    format="MM/dd/yyyy HH:mm"
    required={true}
  />
</ValidatorForm>
```

### Toast Notifications

Toast notification system with different types and configurations.

```javascript
import { toast } from 'react-toastify';

// Success toast
toast.success('Operation completed successfully!');

// Error toast
toast.error('Something went wrong!');

// Warning toast
toast.warning('Please check your input!');

// Info toast
toast.info('New updates available!');

// Custom toast with options
toast('Custom message', {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
});
```

### Stepper Component Example

```javascript
import { Stepper } from "components";
import React from "react";
import SettingsIcon from '@mui/icons-material/Settings';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import VideoLabelIcon from '@mui/icons-material/VideoLabel';

function App() {
    const [activeStep, setActiveStep] = React.useState(1);
    const steps = ['Select campaign settings', 'Create an ad group', 'Create an ad'];
    const icons = [<SettingsIcon />, <GroupAddIcon />, <VideoLabelIcon />];

    const handleStepClick = (step) => {
        setActiveStep(step);
        // Add your click logic here
    };

    return <div>
        <Stepper steps={steps} icons={icons} activeStep={activeStep} onClick={handleStepClick} />
    </div>
}

export default App;
```

### Printing Component Example

The `Printing` component allows you to render paginated, printable content with custom headers and footers. Here is a usage example:

```javascript
import { Printing } from 'components';

const printContent = (
  <div>
    <h2>Printable Report</h2>
    <p>This is an example of content to be printed using the Printing component.</p>
  </div>
);
const printHeader = <div>Header - Page $page_no of $total_page_no</div>;
const printFooter = <div>Footer - Page $page_no</div>;
const printRef = useRef();

<>
  <Button onClick={() => printRef.current?.handlePrint()}>Print Example</Button>
  <Printing
    ref={printRef}
    content={printContent}
    header={printHeader}
    footer={printFooter}
    styleLocation="/assets/po_styles.css"
    contentVisibility={true}
  />
</>
```

### Print Stylesheet (po_styles.css)

To ensure your printed pages look professional and are properly formatted, a custom print stylesheet is provided at `public/assets/po_styles.css`. This file is referenced in the `Printing` component via the `styleLocation` prop:

```javascript
<Printing
  content={printContent}
  header={printHeader}
  footer={printFooter}
  styleLocation="/assets/po_styles.css"
  contentVisibility={true}
  ref={printRef}
/>
```

**What does this CSS do?**
- Sets the page size to A4 and customizes print margins.
- Styles the header and footer areas for each printed page.
- Ensures header/footer content is visible and styled.
- Adjusts grid and layout for pagedjs print output.

You can edit `public/assets/po_styles.css` to further customize your print layout, fonts, or add watermarks.

**Sample: `public/assets/po_styles.css`**
```css
.pagedjs_page {
  /*   background: white;
      box-shadow: 10px 12px 30px 0 rgba(0, 0, 0, 0.1);
      margin: 1rem; */
    @page {
      size: A4;
      @bottom-right {
        /* content: "Page " counter(page) " of " counter(pages); */
        font-size: 9px;
        color: #606d78;
      }
    }
  }
  @page {
    margin: 2in 0.5in 2in 0.3in;
  }
  .pagedjs_margin-top{
    grid-template-columns: repeat(1, 1fr)
  }
  .pagedjs_margin-top-center{
    visibility: visible !important;
  }
  .pagedjs_margin-content{
    width: 0px !important;
  }
  .pagedjs_margin-bottom{
    grid-template-columns: repeat(1, 1fr)
  }
  .pagedjs_margin-bottom-center{
    visibility: visible !important;
  }
  .pagedjs_margin-bottom-left{
    width: 0px !important;
  }
```

## How to Use Theme in Custom Components

Use the `useTheme` hook to access theme values in your components:

```javascript
import { useTheme } from '@mui/material/styles';

const MyComponent = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: theme.shape.borderRadius,
        padding: theme.spacing(2),
      }}
    >
      <Typography variant="h6" color="primary.main">
        Themed Component
      </Typography>
      <Typography variant="body2" color="text.secondary">
        This component adapts to the current theme
      </Typography>
    </Box>
  );
};
```

## How to Add New Themed Components

Follow these steps to create a new themed component:

1. Create component file in src/components/
2. Import and use useTheme hook
3. Use theme.palette for colors
4. Add to component exports
5. Test in both light and dark modes

```javascript
// Example: Creating a themed component
import React from 'react';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const ThemedCard = ({ title, children }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.paper,
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: theme.shape.borderRadius,
        padding: theme.spacing(2),
        boxShadow: theme.shadows[1],
      }}
    >
      <Typography variant="h6" color="primary.main" gutterBottom>
        {title}
      </Typography>
      {children}
    </Box>
  );
};

export default ThemedCard;
```

## Theme Customization

You can customize not just colors, but also typography, spacing, shape, and global component styles. Edit `src/theme/index.js` and `src/theme/componentOverrides.js` to:

- Change typography (font family, sizes, weights) via theme.typography.
- Adjust spacing scale via theme.spacing.
- Set global border radius via theme.shape.borderRadius.
- Override MUI component styles globally in componentOverrides.js.

**Example: Override Button styles**
```javascript
// src/theme/componentOverrides.js
export const componentOverrides = {
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: 8,
        textTransform: 'none',
      },
    },
  },
};
```

## Checklist: Adding New Themed Components

- Create the component in src/components/ using MUI and useTheme.
- Use theme values for all colors, spacing, and typography.
- Add a live demo in ThemeDocumentation.jsx inside a Card.
- Document all props and usage with a CodeBlock example.
- Test in both light and dark modes.
- Export from src/components/index.js.

## Troubleshooting & FAQ

**Q: I get peer dependency errors when installing dependencies?**
A: Use `--force` or `--legacy-peer-deps` with npm/yarn to resolve MUI v7 and React 19 conflicts.

**Q: Why do I see MUI Grid deprecation warnings?**
A: All Grid props must use the new v2 API. Remove deprecated props like `md` and use `gridColumn` or `xs` instead.

**Q: My custom field component throws a warning about errorMessages?**
A: Only pass `errorMessages` to `TextValidator`. For MUI pickers and Autocomplete, use `error` and `helperText` props and handle validation in the parent form.

**Q: Print preview is blank or throws a ref error?**
A: Ensure the `Printing` component's `ref` is set correctly and points to the pagedjs output node. See the Printing section above for details.

**Q: How do I add a new utility style?**
A: Add it to the appropriate `GlobalStyles` file in `src/styles/` and it will be available app-wide.

## Sidebar & Topbar Theming

The sidebar and topbar are fully themed and adapt to light/dark mode. The sidebar supports a collapsed mode, showing only the centered logo. The topbar background color is always consistent with the sidebar for a unified look.

- Sidebar uses theme.palette.sidebar.background and theme.palette.sidebar.text.
- Topbar uses theme.palette.topbar.background for consistency.
- Collapsed sidebar mode centers the logo and hides menu items.
- Sidebar auto-expands the correct menu based on the current route.

## Naming Conventions

Consistent naming conventions are crucial for maintaining a clean and understandable codebase. Here are the standards we follow:

### Variables
Use `camelCase` for variable names. Choose descriptive names that clearly indicate the purpose of the variable.

```javascript
let userName = 'John Doe';
const maxItems = 10;
```

### Functions
Use `camelCase` for function names. Function names should be verbs or verb phrases that describe the action performed.

```javascript
function fetchUserData() {
  // function logic
}

const calculateTotal = (items) => {
  // function logic
};
```

### Components
Use `PascalCase` for React component names. Component names should be nouns or noun phrases that describe the UI element.

```javascript
const UserProfile = () => {
  return <div>User Profile</div>;
};

export default UserProfile;
```

### Constants
Use `UPPER_SNAKE_CASE` for constants. Constants should be declared at the top of the file or in a separate constants file.

```javascript
const API_URL = 'https://api.example.com';
const MAX_RETRIES = 3;
```

### Files and Directories
Use `kebab-case` for file and directory names. Names should be descriptive and reflect the content or purpose.

```
src/
  components/
    user-profile/
      UserProfile.jsx
      user-profile.css
```

### Best Practices
Keep names concise but descriptive. Avoid using generic names like `data`, `info`, or `temp`. Consistently apply these conventions across the codebase to improve readability and maintainability.
