import React from 'react';
import {
  Typography,
  Box,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
} from '@mui/material';
import {
  Palette,
  Code,
  Folder,
  Settings,
  ColorLens,
  Build,
} from '@mui/icons-material';
import Card from '../../components/Card';
import CardTitle from '../../components/CardTitle';
import Button from '../../components/Button';
import TextValidator from '../../components/TextValidator';
import DatePicker from '../../components/DatePicker';
import TimePicker from '../../components/TimePicker';
import DateTimePicker from '../../components/DateTimePicker';
import RadioGroupField from '../../components/RadioGroupField';
import CheckboxGroupField from '../../components/CheckboxGroupField';
import Autocomplete from '../../components/AutocompleteField';
import CodeBlock from '../../components/CodeBlock';
import ValidatorForm from '../../components/ValidatorForm';
import ConfirmDialog from '../../components/ConfirmDialog';
import MainCard from '../../components/MainCard';
import ServiceFile from '../../services/serviceFile';
import { useTheme } from '@mui/material/styles';
import { toast } from 'react-toastify';
import MuiTable from '../../components/MuiTable';
import { Printing } from '../../components';
import { CollapsibleSection } from '../../components';
import Stepper from './Stepper';
const ThemeDocumentation = () => {
  const theme = useTheme();

  const printRef = React.useRef();

  // Example content, header, and footer
  const printContent = (
    <Box p={2}>
      <Typography variant="h4">Printable Report</Typography>
      <Typography variant="body1">This is an example of content to be printed using the Printing component.</Typography>
    </Box>
  );
  const printHeader = <div style={{ textAlign: 'center', fontSize: 12 }}>Header - Page $page_no of $total_page_no</div>;
  const printFooter = <div style={{ textAlign: 'center', fontSize: 12 }}>Footer - Page $page_no</div>;

  const colorPalette = {
    primary: {
      main: theme.palette.primary.main,
      light: theme.palette.primary.light,
      dark: theme.palette.primary.dark,
    },
    secondary: {
      main: theme.palette.secondary.main,
      light: theme.palette.secondary.light,
      dark: theme.palette.secondary.dark,
    },
    background: {
      default: theme.palette.background.default,
      paper: theme.palette.background.paper,
    },
    text: {
      primary: theme.palette.text.primary,
      secondary: theme.palette.text.secondary,
    },
  };

  const ColorSwatch = ({ color, name, value }) => (
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
      <Box
        sx={{
          width: 40,
          height: 40,
          backgroundColor: value,
          borderRadius: 1,
          border: '1px solid',
          borderColor: 'grey.300',
          mr: 2,
        }}
      />
      <Box>
        <Typography variant="body2" fontWeight="bold">{name}</Typography>
        <Typography variant="caption" color="text.secondary">{value}</Typography>
      </Box>
    </Box>
  );



  const MainCardExample = () => (
    <Card>
      <Box p={2}>
        <Typography variant="h6">Main Card Title</Typography>
        <Typography variant="body2">Main card content with header.</Typography>
      </Box>
    </Card>
  );

  const ComponentLayoutStandardExample = () => {
    const [formData, setFormData] = React.useState({
      code: '',
      description: '',
    });
    const [loading, setLoading] = React.useState(false);

    const handleChange = (field) => (event) => {
      setFormData((prev) => ({
        ...prev,
        [field]: event.target.value,
      }));
    };

    const getData = async () => {
      setLoading(true);
      try {
        const response = await ServiceFile.getAll();
        if (response.success) {
          const firstRow = response?.data?.view?.data?.[0] || response?.data?.data?.[0] || null;

          if (firstRow) {
            setFormData({
              code: firstRow.code || '',
              description: firstRow.description || '',
            });
            toast.success('Data loaded successfully.');
          } else {
            toast.info('No records found from backend.');
          }
        } else {
          toast.error(response.message || 'Failed to load data.');
        }
      } catch (error) {
        toast.error('Failed to load data from service.');
      } finally {
        setLoading(false);
      }
    };

    const submitData = async () => {
      setLoading(true);
      try {
        const payload = Object.fromEntries(
          Object.entries(formData).filter(([_, value]) => value !== null && value !== '')
        );

        const response = await ServiceFile.create(payload);
        if (response.success) {
          toast.success(response.message || 'Form submitted successfully.');
        } else {
          toast.error(response.message || 'Failed to submit form.');
        }
      } catch (error) {
        toast.error('Failed to submit form to service.');
      } finally {
        setLoading(false);
      }
    };

    return (
      <div>
        <MainCard>
          <CollapsibleSection title="Case close Reason Setup" /* collapsTrigger={openEditModal} */ buttonText='Add New Case Close Reason'>

            <ValidatorForm onSubmit={submitData}>
              <Box sx={{ display: 'grid', gap: 2 }}>
                <TextValidator
                  label="Dataset Code"
                  name="code"
                  value={formData.code}
                  onChange={handleChange('code')}
                  validators={['required']}
                  errorMessages={['Dataset code is required']}
                />

                <TextValidator
                  label="Description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange('description')}
                  validators={['required']}
                  errorMessages={['Description is required']}
                  multiline
                  rows={4}
                />

                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  <Button variant="outlined" onClick={getData} disabled={loading}>
                    Get Data
                  </Button>
                  <Button variant="contained" color="primary" onClick={submitData} disabled={loading}>
                    Submit Data
                  </Button>
                </Box>
              </Box>
            </ValidatorForm>
          </CollapsibleSection>

        </MainCard>
      </div>
    );
  };


  return (
    <Box sx={{ p: 3 }}>
      <CardTitle>Theme Documentation</CardTitle>

      {/* 1. Add Introduction Card at the top */}
      <Card sx={{ mb: 3 }}>
        <Box p={3}>
          <Typography variant="h4" gutterBottom>Theme System Documentation</Typography>
          <Typography variant="body1" paragraph>
            Welcome to the theme documentation for this MUI Admin App. This guide explains how the custom theme system works, how to use and extend it, and how to ensure a consistent, modern look across the application. The theme system leverages Material-UI (MUI) v7, Redux for state management, and custom utility styles for rapid development.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Key benefits:</strong> Centralized theme control, light/dark mode, global utility classes, and easy extensibility for new components.
          </Typography>
        </Box>
      </Card>

      {/* 2. Add Theme Architecture Overview Card after Introduction */}
      <Card sx={{ mb: 3 }}>
        <Box p={3}>
          <Typography variant="h5" gutterBottom>Theme Architecture Overview</Typography>
          <Typography variant="body1" paragraph>
            The theme system is built on top of MUI’s <code>ThemeProvider</code> and Redux. Here’s how it works:
          </Typography>
          <List dense>
            <ListItem><ListItemText primary="Redux stores the current theme mode (light/dark) and user preferences." /></ListItem>
            <ListItem><ListItemText primary="ThemeProvider (in LoonsTheme.js) applies the theme to the app, using values from Redux." /></ListItem>
            <ListItem><ListItemText primary="Theme files (src/theme/) define color palettes, typography, spacing, and component overrides." /></ListItem>
            <ListItem><ListItemText primary="Global utility stylesheets provide reusable CSS classes for positioning, shadows, and borders." /></ListItem>
          </List>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            <strong>Tip:</strong> Use the <code>useTheme</code> hook in your components to access theme values.
          </Typography>
        </Box>
      </Card>

      {/* Overview Section */}
      <Card>
        <Box p={3}>
          <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Palette sx={{ mr: 1 }} />
            Theme Overview
          </Typography>
          <Typography variant="body1" paragraph>
            This application uses Material-UI (MUI) with a custom theme system that supports both light and dark modes.
            The theme is managed through Redux and persists user preferences in localStorage.
          </Typography>
          <Typography variant="body1" paragraph>
            Key features:
          </Typography>
          <List dense>
            <ListItem>
              <ListItemIcon><ColorLens fontSize="small" /></ListItemIcon>
              <ListItemText primary="Light and Dark mode support" />
            </ListItem>
            <ListItem>
              <ListItemIcon><Settings fontSize="small" /></ListItemIcon>
              <ListItemText primary="Persistent theme preferences" />
            </ListItem>
            <ListItem>
              <ListItemIcon><Build fontSize="small" /></ListItemIcon>
              <ListItemText primary="Customizable color palette and component styles" />
            </ListItem>
          </List>
        </Box>
      </Card>

      {/* File Structure Section */}
      <Card sx={{ mt: 3 }}>
        <Box p={3}>
          <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Folder sx={{ mr: 1 }} />
            Theme File Structure
          </Typography>
          <Typography variant="body1" paragraph>
            Understanding the theme file structure is essential for making theme changes.
          </Typography>

          <Grid spacing={2} columns={12}>
            <Grid gridColumn="span 12">
              <Typography variant="h6" gutterBottom>Core Theme Files</Typography>
              <List dense>
                <ListItem>
                  <ListItemText
                    primary="src/theme/index.js"
                    secondary="Main theme configuration with light and dark themes"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="src/theme/componentOverrides.js"
                    secondary="Custom component style overrides"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="src/components/themeFiles/LoonsTheme.js"
                    secondary="Theme provider wrapper with Redux integration"
                  />
                </ListItem>
              </List>
            </Grid>
            <Grid gridColumn="span 12">
              <Typography variant="h6" gutterBottom>State Management</Typography>
              <List dense>
                <ListItem>
                  <ListItemText
                    primary="src/redux/reducers/themeReducer.js"
                    secondary="Redux theme state management"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="src/components/themeFiles/Header.jsx"
                    secondary="Theme toggle button implementation"
                  />
                </ListItem>
              </List>
            </Grid>
          </Grid>
        </Box>
      </Card>

      {/* Theme File Structure Tree */}
      <Card sx={{ mt: 3 }}>
        <Box p={3}>
          <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Folder sx={{ mr: 1 }} />
            Theme File Structure Tree
          </Typography>
          <Typography variant="body1" paragraph>
            Complete file structure showing all theme-related files and their relationships.
          </Typography>

          <Box sx={{
            backgroundColor: 'grey.50',
            p: 2,
            borderRadius: 1,
            fontFamily: 'monospace',
            fontSize: '0.875rem',
            border: '1px solid',
            borderColor: 'grey.300'
          }}>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 'bold' }}>
              mui-admin-app/
            </Typography>
            <Box sx={{ ml: 2 }}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                📁 src/
              </Typography>
              <Box sx={{ ml: 2 }}>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  📁 theme/
                </Typography>
                <Box sx={{ ml: 2 }}>
                  <Typography variant="body2" sx={{ mb: 1, color: 'primary.main' }}>
                    📄 index.js                    # Main theme configuration
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1, color: 'primary.main' }}>
                    📄 componentOverrides.js       # Component style overrides
                  </Typography>
                </Box>

                <Typography variant="body2" sx={{ mb: 1 }}>
                  📁 components/
                </Typography>
                <Box sx={{ ml: 2 }}>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    📁 themeFiles/
                  </Typography>
                  <Box sx={{ ml: 2 }}>
                    <Typography variant="body2" sx={{ mb: 1, color: 'primary.main' }}>
                      📄 LoonsTheme.js             # Theme provider wrapper
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1, color: 'primary.main' }}>
                      📄 Header.jsx                # Header with theme toggle
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1, color: 'primary.main' }}>
                      📄 Sidebar.jsx               # Sidebar with theme colors
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1, color: 'primary.main' }}>
                      📄 Footer.jsx                # Footer with theme colors
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1, color: 'primary.main' }}>
                      📄 MainLayout.jsx            # Main layout wrapper
                    </Typography>
                  </Box>
                </Box>

                <Typography variant="body2" sx={{ mb: 1 }}>
                  📁 pages/
                </Typography>
                <Box sx={{ ml: 2 }}>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    📁 Dashboard/
                  </Typography>
                  <Box sx={{ ml: 2 }}>
                    <Typography variant="body2" sx={{ mb: 1, color: 'primary.main' }}>
                      📄 Dashboard.jsx             # Main dashboard page
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1, color: 'primary.main' }}>
                      📄 DashboardRoutes.js        # Dashboard route definitions
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1, color: 'primary.main' }}>
                      📄 index.js                  # Dashboard exports
                    </Typography>
                  </Box>

                  <Typography variant="body2" sx={{ mb: 1 }}>
                    📁 auth/
                  </Typography>
                  <Box sx={{ ml: 2 }}>
                    <Typography variant="body2" sx={{ mb: 1, color: 'primary.main' }}>
                      📄 Login.jsx                 # Login page
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1, color: 'primary.main' }}>
                      📄 AuthRoutes.js             # Authentication routes
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1, color: 'primary.main' }}>
                      📄 index.js                  # Auth exports
                    </Typography>
                  </Box>

                  <Typography variant="body2" sx={{ mb: 1 }}>
                    📁 inventory/
                  </Typography>
                  <Box sx={{ ml: 2 }}>
                    <Typography variant="body2" sx={{ mb: 1, color: 'primary.main' }}>
                      📄 AddItem.jsx               # Add inventory item
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1, color: 'primary.main' }}>
                      📄 CheckStock.jsx            # Check stock levels
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1, color: 'primary.main' }}>
                      📄 StockReport.jsx           # Stock reports
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1, color: 'primary.main' }}>
                      📄 InventoryRoutes.js        # Inventory routes
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1, color: 'primary.main' }}>
                      📄 index.js                  # Inventory exports
                    </Typography>
                  </Box>

                  <Typography variant="body2" sx={{ mb: 1 }}>
                    📁 reports/
                  </Typography>
                  <Box sx={{ ml: 2 }}>
                    <Typography variant="body2" sx={{ mb: 1, color: 'primary.main' }}>
                      📄 SalesReport.jsx           # Sales reports
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1, color: 'primary.main' }}>
                      📄 UserActivity.jsx          # User activity reports
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1, color: 'primary.main' }}>
                      📄 ReportsRoutes.js          # Reports routes
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1, color: 'primary.main' }}>
                      📄 index.js                  # Reports exports
                    </Typography>
                  </Box>

                  <Typography variant="body2" sx={{ mb: 1 }}>
                    📁 settings/
                  </Typography>
                  <Box sx={{ ml: 2 }}>
                    <Typography variant="body2" sx={{ mb: 1, color: 'primary.main' }}>
                      📄 Settings.jsx              # Settings page
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1, color: 'primary.main' }}>
                      📄 SettingsRoutes.js         # Settings routes
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1, color: 'primary.main' }}>
                      📄 index.js                  # Settings exports
                    </Typography>
                  </Box>

                  <Typography variant="body2" sx={{ mb: 1 }}>
                    📁 Profile/
                  </Typography>
                  <Box sx={{ ml: 2 }}>
                    <Typography variant="body2" sx={{ mb: 1, color: 'primary.main' }}>
                      📄 Profile.jsx               # User profile page
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1, color: 'primary.main' }}>
                      📄 index.js                  # Profile exports
                    </Typography>
                  </Box>

                  <Typography variant="body2" sx={{ mb: 1 }}>
                    📁 ThemeComponentsexamples/
                  </Typography>
                  <Box sx={{ ml: 2 }}>
                    <Typography variant="body2" sx={{ mb: 1, color: 'primary.main' }}>
                      📄 ThemeDocumentation.jsx    # Theme documentation
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1, color: 'primary.main' }}>
                      📄 ThemeExamplesRoutes.js    # Theme examples routes
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1, color: 'primary.main' }}>
                      📄 index.js                  # Theme examples exports
                    </Typography>
                  </Box>
                </Box>

                <Typography variant="body2" sx={{ mb: 1 }}>
                  📁 routes/
                </Typography>
                <Box sx={{ ml: 2 }}>
                  <Typography variant="body2" sx={{ mb: 1, color: 'primary.main' }}>
                    📄 RootRoutes.js              # Main application routes
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1, color: 'primary.main' }}>
                    📄 PublicRoutes.js            # Public routes (no auth required)
                  </Typography>
                </Box>

                <Typography variant="body2" sx={{ mb: 1 }}>
                  📁 navigation/
                </Typography>
                <Box sx={{ ml: 2 }}>
                  <Typography variant="body2" sx={{ mb: 1, color: 'primary.main' }}>
                    📄 navigations.js             # Navigation menu configuration
                  </Typography>
                </Box>

                <Typography variant="body2" sx={{ mb: 1 }}>
                  📁 services/
                </Typography>
                <Box sx={{ ml: 2 }}>
                  <Typography variant="body2" sx={{ mb: 1, color: 'primary.main' }}>
                    📄 axios.js                   # HTTP client configuration
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1, color: 'primary.main' }}>
                    📄 keycloakService.js         # Keycloak authentication service
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1, color: 'primary.main' }}>
                    📄 localStorageService.js     # Local storage utilities
                  </Typography>
                </Box>

                <Typography variant="body2" sx={{ mb: 1 }}>
                  📁 auth/
                </Typography>
                <Box sx={{ ml: 2 }}>
                  <Typography variant="body2" sx={{ mb: 1, color: 'primary.main' }}>
                    📄 AuthGuard.js               # Authentication guard component
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1, color: 'primary.main' }}>
                    📄 ProtectedRoute.jsx         # Protected route wrapper
                  </Typography>
                </Box>

                <Typography variant="body2" sx={{ mb: 1 }}>
                  📁 redux/
                </Typography>
                <Box sx={{ ml: 2 }}>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    📁 reducers/
                  </Typography>
                  <Box sx={{ ml: 2 }}>
                    <Typography variant="body2" sx={{ mb: 1, color: 'primary.main' }}>
                      📄 themeReducer.js           # Theme state management
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1, color: 'primary.main' }}>
                      📄 authReducer.js            # Authentication state management
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1, color: 'primary.main' }}>
                      📄 index.js                  # Root reducer
                    </Typography>
                  </Box>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    📁 actions/
                  </Typography>
                  <Box sx={{ ml: 2 }}>
                    <Typography variant="body2" sx={{ mb: 1, color: 'primary.main' }}>
                      📄 authActions.js            # Authentication actions
                    </Typography>
                  </Box>
                  <Typography variant="body2" sx={{ mb: 1, color: 'primary.main' }}>
                    📄 Store.js                   # Redux store configuration
                  </Typography>
                </Box>

                <Typography variant="body2" sx={{ mb: 1 }}>
                  📁 contexts/
                </Typography>
                <Box sx={{ ml: 2 }}>
                  <Typography variant="body2" sx={{ mb: 1, color: 'primary.main' }}>
                    📄 AppContext.js              # Application context
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1, color: 'primary.main' }}>
                    📄 SettingsContext.js         # Settings context
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1, color: 'primary.main' }}>
                    📄 ThemeContext.js            # Theme context (legacy)
                  </Typography>
                </Box>

                <Typography variant="body2" sx={{ mb: 1 }}>
                  📁 styles/
                </Typography>
                <Box sx={{ ml: 2 }}>
                  <Typography variant="body2" sx={{ mb: 1, color: 'primary.main' }}>
                    📄 GlobalCss.js               # Global CSS styles
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1, color: 'primary.main' }}>
                    📄 SpacingGlobalStyles.js     # Utility spacing classes
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1, color: 'primary.main' }}>
                    📄 globle.css                 # Global CSS file
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1, color: 'primary.main' }}>
                    📄 buttonColors.css           # Button color utilities
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1, color: 'primary.main' }}>
                    📄 fonts.css                  # Font definitions
                  </Typography>
                </Box>

                <Typography variant="body2" sx={{ mb: 1, color: 'primary.main' }}>
                  📄 App.js                      # Main application component
                </Typography>
                <Typography variant="body2" sx={{ mb: 1, color: 'primary.main' }}>
                  📄 index.js                    # Application entry point
                </Typography>
                <Typography variant="body2" sx={{ mb: 1, color: 'primary.main' }}>
                  📄 envConfig.js                # Environment configuration
                </Typography>
                <Typography variant="body2" sx={{ mb: 1, color: 'primary.main' }}>
                  📄 apiRoutes.js                # API route definitions
                </Typography>
              </Box>
            </Box>
          </Box>

          <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
            File Descriptions
          </Typography>

          <Grid spacing={2} columns={12}>
            <Grid gridColumn="span 12">
              <Typography variant="subtitle1" gutterBottom>Core Theme Files</Typography>
              <List dense>
                <ListItem>
                  <ListItemText
                    primary="src/theme/index.js"
                    secondary="Contains lightTheme and darkTheme configurations with palette, typography, and component overrides"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="src/theme/componentOverrides.js"
                    secondary="Custom MUI component style overrides for consistent theming across the app"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="src/components/themeFiles/LoonsTheme.js"
                    secondary="Theme provider that connects Redux theme state to MUI ThemeProvider"
                  />
                </ListItem>
              </List>
            </Grid>
            <Grid gridColumn="span 12">
              <Typography variant="subtitle1" gutterBottom>State & Layout Files</Typography>
              <List dense>
                <ListItem>
                  <ListItemText
                    primary="src/redux/reducers/themeReducer.js"
                    secondary="Redux reducer for theme state management with localStorage persistence"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="src/components/themeFiles/Header.jsx"
                    secondary="Header component with theme toggle button and user menu"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="src/styles/GlobalCss.js"
                    secondary="Global CSS styles using MUI's GlobalStyles component"
                  />
                </ListItem>
              </List>
            </Grid>
            <Grid gridColumn="span 12">
              <Typography variant="subtitle1" gutterBottom>Pages & Routes</Typography>
              <List dense>
                <ListItem>
                  <ListItemText
                    primary="src/pages/Dashboard/Dashboard.jsx"
                    secondary="Main dashboard page with statistics and data visualization"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="src/routes/RootRoutes.js"
                    secondary="Main application routing configuration"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="src/navigation/navigations.js"
                    secondary="Navigation menu structure and configuration"
                  />
                </ListItem>
              </List>
            </Grid>
            <Grid gridColumn="span 12">
              <Typography variant="subtitle1" gutterBottom>Services & Auth</Typography>
              <List dense>
                <ListItem>
                  <ListItemText
                    primary="src/services/keycloakService.js"
                    secondary="Keycloak authentication service for user login/logout"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="src/auth/AuthGuard.js"
                    secondary="Authentication guard component for route protection"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="src/redux/actions/authActions.js"
                    secondary="Redux actions for authentication state management"
                  />
                </ListItem>
              </List>
            </Grid>
          </Grid>
        </Box>
      </Card>

      {/* Color Palette Section */}
      <Card sx={{ mt: 3 }}>
        <Box p={3}>
          <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Palette sx={{ mr: 1 }} />
            Color Palette
          </Typography>
          <Typography variant="body1" paragraph>
            The current theme's color palette. These colors are used throughout the application.
          </Typography>

          <Grid spacing={3} columns={12}>
            <Grid gridColumn="span 12">
              <Typography variant="h6" gutterBottom>Primary Colors</Typography>
              <ColorSwatch color={colorPalette.primary.main} name="Primary Main" value={colorPalette.primary.main} />
              <ColorSwatch color={colorPalette.primary.light} name="Primary Light" value={colorPalette.primary.light} />
              <ColorSwatch color={colorPalette.primary.dark} name="Primary Dark" value={colorPalette.primary.dark} />
            </Grid>
            <Grid gridColumn="span 12">
              <Typography variant="h6" gutterBottom>Secondary Colors</Typography>
              <ColorSwatch color={colorPalette.secondary.main} name="Secondary Main" value={colorPalette.secondary.main} />
              <ColorSwatch color={colorPalette.secondary.light} name="Secondary Light" value={colorPalette.secondary.light} />
              <ColorSwatch color={colorPalette.secondary.dark} name="Secondary Dark" value={colorPalette.secondary.dark} />
            </Grid>
            <Grid gridColumn="span 12">
              <Typography variant="h6" gutterBottom>Background Colors</Typography>
              <ColorSwatch color={colorPalette.background.default} name="Background Default" value={colorPalette.background.default} />
              <ColorSwatch color={colorPalette.background.paper} name="Background Paper" value={colorPalette.background.paper} />
            </Grid>
            <Grid gridColumn="span 12">
              <Typography variant="h6" gutterBottom>Text Colors</Typography>
              <ColorSwatch color={colorPalette.text.primary} name="Text Primary" value={colorPalette.text.primary} />
              <ColorSwatch color={colorPalette.text.secondary} name="Text Secondary" value={colorPalette.text.secondary} />
            </Grid>
          </Grid>
        </Box>
      </Card>

      {/* How to Change Theme Colors */}
      <Card sx={{ mt: 3 }}>
        <Box p={3}>
          <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Settings sx={{ mr: 1 }} />
            How to Change Theme Colors
          </Typography>
          <Typography variant="body1" paragraph>
            To change theme colors, edit the palette object in <code>src/theme/index.js</code>:
          </Typography>

          <CodeBlock
            code={`// src/theme/index.js
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
});`}
            title="Example: Changing theme colors"
          />
        </Box>
      </Card>

      {/* Component Examples Section */}
      <Card sx={{ mt: 3 }}>
        <Box p={3}>
          <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Code sx={{ mr: 1 }} />
            Themed Component Examples
          </Typography>
          <Typography variant="body1" paragraph>
            All custom components are themed and consistent with the current theme.
          </Typography>

          {/* Button Example */}
          <Card sx={{ mt: 3 }}>
            <Box p={3}>
              <Typography variant="h5" gutterBottom>Button Component</Typography>
              <Box sx={{ mb: 2 }}>
                <Button variant="contained" color="primary" sx={{ mr: 1 }}>Primary</Button>
                <Button variant="outlined" color="secondary" sx={{ mr: 1 }}>Secondary</Button>
                <Button variant="text" color="error">Error</Button>
              </Box>
              <CodeBlock
                code={`import Button from 'components/Button';

<Button variant="contained" color="primary">Primary</Button>
<Button variant="outlined" color="secondary">Secondary</Button>
<Button variant="text" color="error">Error</Button>`}
                title="Button usage"
              />
            </Box>
            {/* Button Component */}
            <Box p={3}>
              <Typography variant="body2" color="text.secondary" paragraph>
                Themed button component with various variants and colors.
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Button variant="contained" color="primary" sx={{ mr: 1, mb: 1 }}>Primary</Button>
                <Button variant="contained" color="secondary" sx={{ mr: 1, mb: 1 }}>Secondary</Button>
                <Button variant="outlined" color="primary" sx={{ mr: 1, mb: 1 }}>Outlined</Button>
                <Button variant="text" color="error" sx={{ mr: 1, mb: 1 }}>Text</Button>
                <Button variant="contained" color="success" sx={{ mr: 1, mb: 1 }}>Success</Button>
                <Button variant="contained" color="warning" sx={{ mr: 1, mb: 1 }}>Warning</Button>
              </Box>
              <CodeBlock
                code={`import Button from 'components/Button';

<Button variant="contained" color="primary">Primary</Button>
<Button variant="contained" color="secondary">Secondary</Button>
<Button variant="outlined" color="primary">Outlined</Button>
<Button variant="text" color="error">Text</Button>
<Button variant="contained" color="success">Success</Button>
<Button variant="contained" color="warning">Warning</Button>`}
                title="Button usage"
              />
            </Box>

          </Card>

          <Divider sx={{ my: 2 }} />
          {/* CollapsibleSection Example */}
          <Card sx={{ mt: 3 }}>
            <Box p={3}>
              <Typography variant="h5" gutterBottom>CollapsibleSection Component</Typography>
              <Box sx={{ mb: 2 }}>
                <CollapsibleSection
                  title="Collapsible Section Title"
                  buttonText="Show/Hide"
                  collapsTrigger={false}
                  underLineVisible={true}
                  showButton={true}
                >
                  <Typography variant="body2" color="text.secondary">
                    This is the content inside the collapsible section. You can put any React node here.
                  </Typography>
                </CollapsibleSection>
              </Box>
              <CodeBlock
                code={`import { CollapsibleSection } from 'components';

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
</CollapsibleSection>`}
                title="CollapsibleSection usage"
              />
            </Box>
          </Card>


          <Divider sx={{ my: 2 }} />

          {/* MuiTable Component */}
          <Card sx={{ mt: 3 }}>
            <Box p={3} sx={{ mb: 4 }}>
              <Typography variant="h6" gutterBottom>MuiTable Component (Material React Table)</Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Advanced table component with drag scrolling, mobile responsiveness, and Material React Table features.
              </Typography>
              <Box sx={{ mb: 2, height: 400 }}>
                <MuiTable
                  columns={[
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
                  ]}
                  data={[
                    { name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
                    { name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Inactive' },
                    { name: 'Bob Johnson', email: 'bob@example.com', role: 'Manager', status: 'Active' },
                    { name: 'Alice Brown', email: 'alice@example.com', role: 'User', status: 'Active' },
                  ]}
                  enableColumnFilters={true}
                  enableSorting={true}
                  enablePagination={true}
                  enableRowSelection={true}
                  muiTableProps={{
                    sx: {
                      tableLayout: 'fixed',
                    },
                  }}
                />
              </Box>
              <CodeBlock
                code={`import MuiTable from 'components/MuiTable';

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
/>`}
                title="MuiTable usage"
              />
            </Box>
          </Card>


          <Divider sx={{ my: 2 }} />

          {/* Card Components */}
          <Card sx={{ mt: 3 }}>
            <Box p={3} sx={{ mb: 4 }}>
              <Typography variant="h6" gutterBottom>Card Components</Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Basic card and main card components for content organization.
              </Typography>
              <Grid spacing={2} columns={12} sx={{ mb: 2 }}>
                <Grid gridColumn="span 12">
                  <Card>
                    <Box p={2}>
                      <Typography variant="h6">Basic Card</Typography>
                      <Typography variant="body2">Simple card component for content display.</Typography>
                    </Box>
                  </Card>
                </Grid>
                <Grid gridColumn="span 12">
                  <MainCardExample />
                </Grid>
              </Grid>
              <CodeBlock
                code={`import Card from 'components/Card';
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
</MainCard>`}
                title="Card usage"
              />
            </Box>
          </Card>


          <Divider sx={{ my: 2 }} />

          {/* Component Layout Standard */}
          <Card sx={{ mt: 3 }}>
            <Box p={3} sx={{ mb: 4 }}>
              <Typography variant="h6" gutterBottom>Component Layout Standard</Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Recommended structure for themed form screens: keep state in formData, load and save through a dedicated service file, and wrap the screen inside MainCard.
              </Typography>
              <Box sx={{ mb: 3 }}>
                <ComponentLayoutStandardExample />
              </Box>
              <Typography variant="body2" color="text.secondary" paragraph>
                For real screens, keep backend calls inside a service such as services/serviceFile.js and call that service from getData and submitData.
              </Typography>
              <CodeBlock
                code={`import { Grid } from '@mui/material';
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
};`}
                title="Component layout standard"
              />

              <Typography variant="body2" color="text.secondary" paragraph sx={{ mt: 2 }}>
                MUI Grid syntax (v2) example:
              </Typography>
              <CodeBlock
                code={`<Grid container spacing={1}>
  <Grid size={{ lg: 4, md: 12, sm: 12, xs: 12 }}>
    {/* Grid item content */}
  </Grid>
</Grid>`}
                title="MUI Grid syntax"
              />

              <Typography variant="body2" color="text.secondary" paragraph sx={{ mt: 2 }}>
                Service file standard (based on CaseCloseReasonsServices):
              </Typography>
              <CodeBlock
                code={`import BaseService from './BaseService';
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
      '/' + id,
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
    return await super.customCall('GET', '/' + id + '/logo', null, null, null);
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
export default caseCloseReasonsServices;`}
                title="Service file standard"
              />
            </Box>
          </Card>


          <Divider sx={{ my: 2 }} />

          {/* Confirm Dialog Component */}
          <Card sx={{ mt: 3 }}>
            <Box p={3} sx={{ mb: 4 }}>
              <Typography variant="h6" gutterBottom>Confirm Dialog Component</Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Custom confirmation dialog with different types and actions.
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    ConfirmDialog({
                      type: 'warning',
                      title: 'Confirm Action',
                      description: 'Are you sure you want to proceed?',
                      buttons: [
                        { label: 'Cancel', onClick: () => console.log('Cancelled') },
                        { label: 'Confirm', onClick: () => console.log('Confirmed') }
                      ]
                    });
                  }}
                >
                  Show Confirm Dialog
                </Button>
              </Box>
              <CodeBlock
                code={`import ConfirmDialog from 'components/ConfirmDialog';

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
});`}
                title="ConfirmDialog usage"
              />
            </Box>
          </Card>

          <Divider sx={{ my: 2 }} />


          {/* TextValidator Example */}
          <Card sx={{ mt: 3 }}>
            <Box p={3}>
              <Typography variant="h5" gutterBottom>TextValidator Component</Typography>
              <Box sx={{ mb: 2, maxWidth: 300 }}>
                <ValidatorForm>
                  <TextValidator
                    label="Example Field"
                    name="example"
                    validators={["required"]}
                    errorMessages={["This field is required"]}
                  />
                </ValidatorForm>
              </Box>
              <CodeBlock
                code={`import TextValidator from 'components/TextValidator';
import ValidatorForm from 'components/ValidatorForm';

<ValidatorForm>
  <TextValidator
    label="Example Field"
    name="example"
    validators={["required"]}
    errorMessages={["This field is required"]}
  />
</ValidatorForm>`}
                title="TextValidator usage"
              />
            </Box>
          </Card>

          <Divider sx={{ my: 2 }} />
          {/* TextValidator Component */}
          <Card sx={{ mt: 3 }}>
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" gutterBottom>TextValidator Component</Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Form input component with built-in validation and theming.
              </Typography>
              <Box sx={{ mb: 2, maxWidth: 300 }}>
                <ValidatorForm>
                  <TextValidator
                    label="Email Address"
                    name="email"
                    type="email"
                    validators={["required", "isEmail"]}
                    errorMessages={["Email is required", "Email is not valid"]}
                    sx={{ mb: 2 }}
                  />
                  <TextValidator
                    label="Password"
                    name="password"
                    type="password"
                    validators={["required", "minStringLength:6"]}
                    errorMessages={["Password is required", "Password must be at least 6 characters"]}
                  />
                </ValidatorForm>
              </Box>
              <CodeBlock
                code={`import TextValidator from 'components/TextValidator';
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
</ValidatorForm>`}
                title="TextValidator usage"
              />
            </Box>
          </Card>


          <Divider sx={{ my: 2 }} />
          {/* Radio Group Component */}
          <Card sx={{ mt: 3 }}>
            <Box p={3} sx={{ mb: 4 }}>
              <Typography variant="h6" gutterBottom>RadioGroupField Component</Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Radio button group with validation and row/column layout options.
              </Typography>
              <Box sx={{ mb: 2, maxWidth: 400 }}>
                <ValidatorForm>
                  <RadioGroupField
                    name="gender"
                    label="Select Gender"
                    radioButtons={[
                      { value: 'male', label: 'Male' },
                      { value: 'female', label: 'Female' },
                      { value: 'other', label: 'Other' },
                    ]}
                    row
                    required
                  />
                </ValidatorForm>
              </Box>
              <CodeBlock
                code={`import RadioGroupField from 'components/RadioGroupField';
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
</ValidatorForm>`}
                title="RadioGroupField usage"
              />
            </Box>
          </Card>

          <Divider sx={{ my: 2 }} />

          {/* Checkbox Group Component */}
          <Card sx={{ mt: 3 }}>
            <Box p={3} sx={{ mb: 4 }}>
              <Typography variant="h6" gutterBottom>CheckboxGroupField Component</Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Checkbox group with validation and multiple selection support.
              </Typography>
              <Box sx={{ mb: 2, maxWidth: 400 }}>
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
                    row
                    required
                  />
                </ValidatorForm>
              </Box>
              <CodeBlock
                code={`import CheckboxGroupField from 'components/CheckboxGroupField';
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
</ValidatorForm>`}
                title="CheckboxGroupField usage"
              />
            </Box>
          </Card>

          <Divider sx={{ my: 2 }} />

          {/* Autocomplete Component */}
          <Card sx={{ mt: 3 }}>
            <Box p={3} sx={{ mb: 4 }}>
              <Typography variant="h6" gutterBottom>Autocomplete Component</Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Autocomplete input with validation, multiple selection, and freeSolo options.
              </Typography>
              <Box sx={{ mb: 2, maxWidth: 300 }}>
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
                    required
                  />
                </ValidatorForm>
              </Box>
              <CodeBlock
                code={`import Autocomplete from 'components/AutocompleteField';
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
</ValidatorForm>`}
                title="Autocomplete usage"
              />
            </Box>
          </Card>

          <Divider sx={{ my: 2 }} />
          {/* Date/Time Picker Components */}
          <Card sx={{ mt: 3 }}>
            <Box p={3} sx={{ mb: 4 }}>
              <Typography variant="h6" gutterBottom>Date & Time Picker Components</Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Date, time, and datetime picker components with validation and custom formats.
              </Typography>
              <Box sx={{ mb: 2, maxWidth: 300 }}>
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
              </Box>
              <CodeBlock
                code={`import DatePicker from 'components/DatePicker';
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
</ValidatorForm>`}
                title="Date/Time picker usage"
              />
            </Box>
          </Card>


          <Divider sx={{ my: 2 }} />


          {/* Toast Component */}
          <Card sx={{ mt: 3 }}>
            <Box p={3} sx={{ mb: 4 }}>
              <Typography variant="h6" gutterBottom>Toast Notifications</Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Toast notification system with different types and configurations.
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Grid spacing={1} columns={1}>
                  <Grid gridColumn="span 1">
                    <Button
                      variant="contained"
                      color="success"
                      size="small"
                      onClick={() => toast.success('Success message!')}
                    >
                      Success
                    </Button>
                  </Grid>
                  <Grid gridColumn="span 1">
                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      onClick={() => toast.error('Error message!')}
                    >
                      Error
                    </Button>
                  </Grid>
                  <Grid gridColumn="span 1">
                    <Button
                      variant="contained"
                      color="warning"
                      size="small"
                      onClick={() => toast.warning('Warning message!')}
                    >
                      Warning
                    </Button>
                  </Grid>
                  <Grid gridColumn="span 1">
                    <Button
                      variant="contained"
                      color="info"
                      size="small"
                      onClick={() => toast.info('Info message!')}
                    >
                      Info
                    </Button>
                  </Grid>
                </Grid>
              </Box>
              <CodeBlock
                code={`import { toast } from 'react-toastify';

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
});`}
                title="Toast usage"
              />
            </Box>
          </Card>



          {/* Stepper Component Example Section */}
          <Card sx={{ mt: 3 }}>
            <Box p={3}>
              <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Code sx={{ mr: 1 }} />
                Stepper Component Example
              </Typography>


              <Stepper />
              <CodeBlock
                code={`import { Stepper } from "components";
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

export default App;`
                }
              />
            </Box>
          </Card>
          <Divider sx={{ my: 2 }} />

          {/* Printing Component Example Section */}
          <Card sx={{ mt: 3 }}>
            <Box p={3}>
              <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Code sx={{ mr: 1 }} />
                Printing Component Example
              </Typography>
              <Typography variant="body1" paragraph>
                The <code>Printing</code> component allows you to render paginated, printable content with custom headers and footers. Here is a usage example:
              </Typography>



              <Grid container spacing={2}>
                <Grid size={6}>
                  <CodeBlock
                    code={`import { Printing } from 'components';

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
</>`}
                    title="Printing component usage"
                  />
                </Grid>
                <Grid size={6}>
                  <Button variant="contained" color="primary" onClick={() => printRef.current?.handlePrint()} sx={{ mb: 2 }}>
                    Print Example
                  </Button>
                  <Printing
                    ref={printRef}
                    content={printContent}
                    header={printHeader}
                    footer={printFooter}
                    styleLocation="/assets/po_styles.css"
                    contentVisibility={true}
                  />
                </Grid>
              </Grid>






            </Box>
          </Card>

          {/* Print Stylesheet Documentation Section */}
          <Card sx={{ mt: 3 }}>
            <Box p={3}>
              <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Code sx={{ mr: 1 }} />
                Print Stylesheet (po_styles.css)
              </Typography>
              <Typography variant="body1" paragraph>
                To ensure your printed pages look professional and are properly formatted, a custom print stylesheet is provided at <code>public/assets/po_styles.css</code>. This file is referenced in the <code>Printing</code> component via the <code>styleLocation</code> prop:
              </Typography>
              <CodeBlock
                code={`<Printing
  content={printContent}
  header={printHeader}
  footer={printFooter}
  styleLocation="/assets/po_styles.css"
  contentVisibility={true}
  ref={printRef}
/>`}
                title="Using a custom print stylesheet"
              />
              <Typography variant="body2" paragraph>
                <strong>What does this CSS do?</strong><br />
                - Sets the page size to A4 and customizes print margins.<br />
                - Styles the header and footer areas for each printed page.<br />
                - Ensures header/footer content is visible and styled.<br />
                - Adjusts grid and layout for pagedjs print output.<br />
                <br />
                You can edit <code>public/assets/po_styles.css</code> to further customize your print layout, fonts, or add watermarks.
              </Typography>
              <Typography variant="subtitle2" sx={{ mt: 2, mb: 1 }}>Sample: <code>public/assets/po_styles.css</code></Typography>
              <CodeBlock
                code={`.pagedjs_page {
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
  }`}
                title="po_styles.css"
              />
            </Box>
          </Card>
          <Divider sx={{ my: 2 }} />


        </Box>
      </Card>

      {/* Global Utility Class Names */}
      <Card sx={{ mt: 3 }}>
        <Box p={3}>
          <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Code sx={{ mr: 1 }} />
            Utility Class Names from src/styles
          </Typography>
          <Typography variant="body1" paragraph>
            These global class names are available app-wide from files in <code>src/styles</code>.
          </Typography>

          <Grid spacing={2} columns={12}>
            <Grid gridColumn="span 12">
              <Typography variant="subtitle1" gutterBottom>Spacing (src/styles/SpacingGlobalStyles.js)</Typography>
              <List dense>
                <ListItem><ListItemText primary="Pattern classes: m-*, mt-*, mb-*, ml-*, mr-*, mx-*, my-*, p-*, pt-*, pb-*, pl-*, pr-*, px-*, py-*" /></ListItem>
                <ListItem><ListItemText primary="Range examples: m-0 to m-25 (rem scale), m-1px to m-16px, including negative values" /></ListItem>
                <ListItem><ListItemText primary="Width/height patterns: w-*, h-*, min-w-*, max-w-*, min-h-*, max-h-* (example: w-120, h-40)" /></ListItem>
                <ListItem><ListItemText primary="Static helpers: px-main-card, px-main-8, p-sm-24, m-auto, mx-auto, w-full, h-full, h-full-screen" /></ListItem>
              </List>
            </Grid>

            <Grid gridColumn="span 12">
              <Typography variant="subtitle1" gutterBottom>Positioning & Text (src/styles/PositioningGlobalStyles.js)</Typography>
              <List dense>
                <ListItem><ListItemText primary="Display/flex: hidden, block, inline-block, flex, flex-column, flex-row, flex-wrap" /></ListItem>
                <ListItem><ListItemText primary="Alignment: justify-center, justify-between, items-center, items-start, items-end" /></ListItem>
                <ListItem><ListItemText primary="Position/text: relative, position-absolute, position-top, text-left, text-center, text-right" /></ListItem>
                <ListItem><ListItemText primary="Typography helpers: capitalize, uppercase, lowercase, font-light, font-medium, font-bold" /></ListItem>
              </List>
            </Grid>

            <Grid gridColumn="span 12">
              <Typography variant="subtitle1" gutterBottom>Border, Shadow, Animation, Button Colors</Typography>
              <List dense>
                <ListItem><ListItemText primary="Border classes (src/styles/BorderGlobalStyles.js): border-radius-0, border-radius-4, border-radius-8, rounded, rounded-l, rounded-r" /></ListItem>
                <ListItem><ListItemText primary="Shadow classes (src/styles/ShadowGlobalStyles.js): elevation-z0 to elevation-z24 (based on theme.shadows)" /></ListItem>
                <ListItem><ListItemText primary="Animation classes (src/styles/animations.js): fade-in, spin, hover_zoom" /></ListItem>
                <ListItem><ListItemText primary="Button color classes (src/styles/buttonColors.css): btn-success, btn-danger, btn-warning, btn-info, btn-dark" /></ListItem>
              </List>
            </Grid>
          </Grid>

          <CodeBlock
            code={`// Utility classes in JSX
<div className="px-main-card mb-4">
  <div className="flex justify-between items-center">
    <h3 className="m-0 font-semibold">Section Title</h3>
    <button className="btn-success border-radius-8">Save</button>
  </div>

  <div className="mt-4 p-4 border-radius-12 elevation-z2 fade-in">
    <p className="text-left">Reusable utility classes from src/styles.</p>
  </div>
</div>`}
            title="Using global class names"
          />
        </Box>
      </Card>


      {/* How to Use Theme in Components */}
      <Card sx={{ mt: 3 }}>
        <Box p={3}>
          <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Code sx={{ mr: 1 }} />
            How to Use Theme in Custom Components
          </Typography>
          <Typography variant="body1" paragraph>
            Use the <code>useTheme</code> hook to access theme values in your components:
          </Typography>

          <CodeBlock
            code={`import { useTheme } from '@mui/material/styles';

const MyComponent = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        border: \`1px solid \${theme.palette.divider}\`,
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
};`}
            title="Using theme in custom components"
          />
        </Box>
      </Card>

      {/* How to Add New Themed Components */}
      <Card sx={{ mt: 3 }}>
        <Box p={3}>
          <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Build sx={{ mr: 1 }} />
            How to Add New Themed Components
          </Typography>
          <Typography variant="body1" paragraph>
            Follow these steps to create a new themed component:
          </Typography>

          <List>
            <ListItem>
              <ListItemText
                primary="1. Create component file in src/components/"
                secondary="Use the existing component structure as a template"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="2. Import and use useTheme hook"
                secondary="Access theme values for consistent styling"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="3. Use theme.palette for colors"
                secondary="Don't hardcode colors - use theme values"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="4. Add to component exports"
                secondary="Export from src/components/index.js"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="5. Test in both light and dark modes"
                secondary="Ensure component looks good in both themes"
              />
            </ListItem>
          </List>

          <CodeBlock
            code={`// Example: Creating a themed component
import React from 'react';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const ThemedCard = ({ title, children }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.paper,
        border: \`1px solid \${theme.palette.divider}\`,
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

export default ThemedCard;`}
            title="Example: Creating a themed component"
          />
        </Box>
      </Card>

      {/* 7. Expand Theme Customization section (add details on typography, spacing, shape, and component overrides) */}
      <Card sx={{ mt: 3 }}>
        <Box p={3}>
          <Typography variant="h5" gutterBottom>Theme Customization</Typography>
          <Typography variant="body1" paragraph>
            You can customize not just colors, but also typography, spacing, shape, and global component styles. Edit <code>src/theme/index.js</code> and <code>src/theme/componentOverrides.js</code> to:
          </Typography>
          <List dense>
            <ListItem><ListItemText primary="Change typography (font family, sizes, weights) via theme.typography." /></ListItem>
            <ListItem><ListItemText primary="Adjust spacing scale via theme.spacing." /></ListItem>
            <ListItem><ListItemText primary="Set global border radius via theme.shape.borderRadius." /></ListItem>
            <ListItem><ListItemText primary="Override MUI component styles globally in componentOverrides.js." /></ListItem>
          </List>
          <Typography variant="subtitle2" sx={{ mt: 2 }}>Example: Override Button styles</Typography>
          <CodeBlock
            code={`// src/theme/componentOverrides.js
export const componentOverrides = {
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: 8,
        textTransform: 'none',
      },
    },
  },
};`}
            title="Button style override"
          />
        </Box>
      </Card>

      {/* 8. Add Checklist for Adding New Themed Components (before How to Add New Themed Components) */}
      <Card sx={{ mt: 3 }}>
        <Box p={3}>
          <Typography variant="h5" gutterBottom>Checklist: Adding New Themed Components</Typography>
          <List>
            <ListItem><ListItemText primary="Create the component in src/components/ using MUI and useTheme." /></ListItem>
            <ListItem><ListItemText primary="Use theme values for all colors, spacing, and typography." /></ListItem>
            <ListItem><ListItemText primary="Add a live demo in ThemeDocumentation.jsx inside a Card." /></ListItem>
            <ListItem><ListItemText primary="Document all props and usage with a CodeBlock example." /></ListItem>
            <ListItem><ListItemText primary="Test in both light and dark modes." /></ListItem>
            <ListItem><ListItemText primary="Export from src/components/index.js." /></ListItem>
          </List>
        </Box>
      </Card>

      {/* 9. Add Troubleshooting & FAQ section at the end */}
      <Card sx={{ mt: 3 }}>
        <Box p={3}>
          <Typography variant="h5" gutterBottom>Troubleshooting & FAQ</Typography>
          <Typography variant="body1" paragraph>
            <strong>Q: I get peer dependency errors when installing dependencies?</strong><br />
            A: Use <code>--force</code> or <code>--legacy-peer-deps</code> with npm/yarn to resolve MUI v7 and React 19 conflicts.
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>Q: Why do I see MUI Grid deprecation warnings?</strong><br />
            A: All Grid props must use the new v2 API. Remove deprecated props like <code>md</code> and use <code>gridColumn</code> or <code>xs</code> instead.
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>Q: My custom field component throws a warning about errorMessages?</strong><br />
            A: Only pass <code>errorMessages</code> to <code>TextValidator</code>. For MUI pickers and Autocomplete, use <code>error</code> and <code>helperText</code> props and handle validation in the parent form.
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>Q: Print preview is blank or throws a ref error?</strong><br />
            A: Ensure the <code>Printing</code> component’s <code>ref</code> is set correctly and points to the pagedjs output node. See the Printing section above for details.
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>Q: How do I add a new utility style?</strong><br />
            A: Add it to the appropriate <code>GlobalStyles</code> file in <code>src/styles/</code> and it will be available app-wide.
          </Typography>
        </Box>
      </Card>

      {/* 4. Add Sidebar & Topbar Theming Card after Global Utility Styles */}
      <Card sx={{ mt: 3 }}>
        <Box p={3}>
          <Typography variant="h5" gutterBottom>Sidebar & Topbar Theming</Typography>
          <Typography variant="body1" paragraph>
            The sidebar and topbar are fully themed and adapt to light/dark mode. The sidebar supports a collapsed mode, showing only the centered logo. The topbar background color is always consistent with the sidebar for a unified look.
          </Typography>
          <List dense>
            <ListItem><ListItemText primary="Sidebar uses theme.palette.sidebar.background and theme.palette.sidebar.text." /></ListItem>
            <ListItem><ListItemText primary="Topbar uses theme.palette.topbar.background for consistency." /></ListItem>
            <ListItem><ListItemText primary="Collapsed sidebar mode centers the logo and hides menu items." /></ListItem>
            <ListItem><ListItemText primary="Sidebar auto-expands the correct menu based on the current route." /></ListItem>
          </List>
        </Box>
      </Card>





      <Card sx={{ mt: 3 }}>
        <Box p={3}>
          <Typography variant="h5" gutterBottom>Naming Conventions</Typography>
          <Typography variant="body1" paragraph>
            Consistent naming conventions are crucial for maintaining a clean and understandable codebase. Here are the standards we follow:
          </Typography>

          <Typography variant="h6" gutterBottom>Variables</Typography>
          <Typography variant="body2" paragraph>
            Use <code>camelCase</code> for variable names. Choose descriptive names that clearly indicate the purpose of the variable.
          </Typography>
          <CodeBlock
            code={`let userName = 'John Doe';
const maxItems = 10;`}
            title="Variable Naming Example"
          />

          <Typography variant="h6" gutterBottom>Functions</Typography>
          <Typography variant="body2" paragraph>
            Use <code>camelCase</code> for function names. Function names should be verbs or verb phrases that describe the action performed.
          </Typography>
          <CodeBlock
            code={`function fetchUserData() {
  // function logic
}

const calculateTotal = (items) => {
  // function logic
};`}
            title="Function Naming Example"
          />

          <Typography variant="h6" gutterBottom>Components</Typography>
          <Typography variant="body2" paragraph>
            Use <code>PascalCase</code> for React component names. Component names should be nouns or noun phrases that describe the UI element.
          </Typography>
          <CodeBlock
            code={`const UserProfile = () => {
  return <div>User Profile</div>;
};

export default UserProfile;`}
            title="Component Naming Example"
          />

          <Typography variant="h6" gutterBottom>Constants</Typography>
          <Typography variant="body2" paragraph>
            Use <code>UPPER_SNAKE_CASE</code> for constants. Constants should be declared at the top of the file or in a separate constants file.
          </Typography>
          <CodeBlock
            code={`const API_URL = 'https://api.example.com';
const MAX_RETRIES = 3;`}
            title="Constant Naming Example"
          />

          <Typography variant="h6" gutterBottom>Files and Directories</Typography>
          <Typography variant="body2" paragraph>
            Use <code>kebab-case</code> for file and directory names. Names should be descriptive and reflect the content or purpose.
          </Typography>
          <CodeBlock
            code={`src/
  components/
    user-profile/
      UserProfile.jsx
      user-profile.css`}
            title="File and Directory Naming Example"
          />

          <Typography variant="h6" gutterBottom>Best Practices</Typography>
          <Typography variant="body2" paragraph>
            Keep names concise but descriptive. Avoid using generic names like <code>data</code>, <code>info</code>, or <code>temp</code>. Consistently apply these conventions across the codebase to improve readability and maintainability.
          </Typography>
        </Box>
      </Card>





    </Box>
  );
};

export default ThemeDocumentation;
