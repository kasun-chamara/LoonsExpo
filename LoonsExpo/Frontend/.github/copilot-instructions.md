# Copilot Instructions for This Theme (React + MUI v7.2.0)

Use these rules whenever generating or editing code in this repository.

## Quick Do/Don't
### Do
- Use `MainCard` + `CollapsibleSection` + `ValidatorForm` for setup screens.
- Use MUI Grid v2 syntax: `<Grid size={{ ... }}>`.
- Keep one `formData` state object for form fields.
- Implement `getData` and `submitData` with `try/finally` loading/submitting flags.
- Use service modules in `src/services` (extend `BaseService`) for API calls.
- Use `response.success` branches and show `toast.success`/`toast.error`.
- Prefer theme tokens and reusable classes from `src/styles`.
- For UI design requests, build screens with existing shared components from `src/components`.
- If an image/mockup is provided, match the layout intent and UX, not an exact pixel-by-pixel copy.

### Don't
- Do not use deprecated Grid props like `md={6}` in new code.
- Do not hardcode colors/spacing when theme values exist.
- Do not create duplicate custom components if shared components already exist.
- Do not call APIs directly in many places; keep calls centralized in services.
- Do not skip form reset and table refresh after successful create/update.
- Do not add unsupported props (for example `errorMessages` on components that don't support it).
- Do not recreate UI exactly like attached images when existing theme patterns/components can achieve the same result.

## 1) Tech stack and architecture
- Framework: React (function components + hooks)
- UI: MUI v7.2.0
- Theme: custom MUI theme with light/dark mode and component overrides
- State: Redux for app/theme/auth state
- Forms: `ValidatorForm`, `TextValidator`, and existing custom field components
- Notifications: `react-toastify`
- Data layer: service modules in `src/services` extending `BaseService`

## 1.1) Project theme file structure
Use this structure when updating theme behavior, layout styling, or shared visual primitives:

```text
src/
  App.js                               # App wiring: wraps routes with SettingsProvider and LoonsTheme
  index.js                             # Loads global CSS and global style helper components
  theme/
    index.js                           # Exports lightTheme and darkTheme tokens
    componentOverrides.js              # Shared MUI component overrides
  components/
    themeFiles/
      LoonsTheme.js                    # Active MUI ThemeProvider wrapper used by App
      MainLayout.jsx                   # Main application shell layout
      Header.jsx                       # Top navigation styling and behavior
      Sidebar.jsx                      # Sidebar UI and theme-driven menu styling
      Footer.jsx                       # Footer layout/styling
      LoonsLayout.js                   # Layout composition entry
      LoonsSuspense.js                 # Suspense wrapper used around routes
      ProtectedRoute.jsx               # Theme-aware protected layout routing helper
  styles/
    fonts.css                          # Global font imports
    globle.css                         # Shared global CSS rules
    buttonColors.css                   # Reusable semantic button classes
    SpacingGlobalStyles.js             # Utility spacing classes
    PositioningGlobalStyles.js         # Utility flex/text/position classes
    BorderGlobalStyles.js              # Utility border radius classes
    ShadowGlobalStyles.js              # Utility shadow classes
    animations.js                      # Reusable animation utility classes
  contexts/
    SettingsContext.js                 # UI settings state separate from MUI theme
    ThemeContext.js                    # Alternate theme wrapper; verify usage before editing
  redux/
    reducers/                          # Includes app theme state used by LoonsTheme
```

Theme update flow in this repo:
- Update colors, typography, palette extensions, or mode tokens in `src/theme/index.js`.
- Update shared MUI component-level styling in `src/theme/componentOverrides.js`.
- Update app shell visuals in `src/components/themeFiles/*`.
- Update reusable global utility classes in `src/styles/*`.
- Preserve the active runtime path: `App.js` uses `components/themeFiles/LoonsTheme`, which reads `isDarkMode` from Redux.

## 2) Global coding defaults
- Prefer readability and consistency over clever abstractions.
- Use explicit local state with `useState` for screen-level state.
- For setup/data screens, keep one `formData` object.
- Use `async/await` with `try/finally` for loading and submitting flags.
- Handle API outcomes through `response.success`; show `toast.success`/`toast.error`.
- Reuse existing shared components before creating new ones.
- Add code comments only when the logic is not obvious from the code itself.
- Comments should explain intent, reasoning, or business rules, not restate what the code already says.
- Prefer short comments above a complex block instead of many inline comments.
- Do not leave commented-out code in generated output unless the user explicitly asks to keep it.

## 3) Required screen composition pattern (data setup screens)
Follow this structure unless there is a clear reason not to:
1. `MainCard` wrapper
2. `CollapsibleSection` for create/edit form
3. `ValidatorForm` with field components (`TextValidator`, `Autocomplete`, pickers)
4. `MuiTable` for list/grid view
5. State + functions: `formData`, `filters`, `getData`, `submitData`
6. Optional actions: status toggle, view dialog, confirm dialog, search/filter bar

## 4) MUI Grid v2 syntax (mandatory)
Use Grid v2 style with `size={{ ... }}`:

```jsx
import Grid from '@mui/material/Grid'

<Grid container spacing={1}>
  <Grid size={{ lg: 4, md: 12, sm: 12, xs: 12 }}>
    {/* content */}
  </Grid>
</Grid>
```

**Import rule:** Always import Grid as `import Grid from '@mui/material/Grid'`. Do **not** use `@mui/material/Grid2` — that path does not resolve in this project.

Do not generate deprecated Grid props (like old `md={6}` usage in this theme docs context).

**Shared component import rules:** All components under `src/components/` use `default` exports. Always import them as default imports — never as named imports.

```js
// CORRECT
import ValidatorForm from 'components/ValidatorForm'
import TextValidator from 'components/TextValidator'
import MainCard from 'components/MainCard'
import CollapsibleSection from 'components/CollapsibleSection'
import Button from 'components/Button'
import MuiTable from 'components/MuiTable'
import ConfirmDialog from 'components/ConfirmDialog'
import StatusChip from 'components/StatusChip'

// WRONG — will cause a build error
import { ValidatorForm } from 'components/ValidatorForm'
import { TextValidator } from 'components/TextValidator'
```

## 5) Standard screen state shape
For CRUD-like screens, include:
- `formData`
- `loading`
- `data`
- `isEdit`
- `editingData`
- `submitting`
- `filters` (page, limit, search, and screen-specific filters)
- `totalItems`

Suggested starter:

```js
const [formData, setFormData] = useState({ reason: '', type: '' })
const [loading, setLoading] = useState(false)
const [data, setData] = useState([])
const [isEdit, setIsEdit] = useState(false)
const [editingData, setEditingData] = useState(null)
const [submitting, setSubmitting] = useState(false)
const [filters, setFilters] = useState({ page: 0, limit: 20, search: null })
const [totalItems, setTotalItems] = useState(0)
```

## 6) getData and submitData conventions
### `getData`
- Use `useCallback` when tied to filters.
- Set and clear loading state in `try/finally`.
- Read backend data from expected envelope (`response.data.view.data`, `totalItems`).

```js
const getData = useCallback(async () => {
  setLoading(true)
  try {
    const response = await SomeServices.getAll(filters)
    if (response.success) {
      setData(response?.data?.view?.data || [])
      setTotalItems(response?.data?.view?.totalItems || 0)
    } else {
      toast.error(response.message || 'Failed to load data.')
    }
  } finally {
    setLoading(false)
  }
}, [filters])
```

### `submitData`
- One handler for create/edit.
- Build payload by removing null/empty fields.
- Reset form and refresh table on success.

```js
const submitData = async (event) => {
  event.preventDefault()
  setSubmitting(true)
  try {
    const payload = Object.fromEntries(
      Object.entries(formData).filter(([_, value]) => value !== null && value !== '')
    )

    const response = isEdit
      ? await SomeServices.update(editingData, payload)
      : await SomeServices.create(payload)

    if (response.success) {
      toast.success(response.message || (isEdit ? 'Updated successfully.' : 'Created successfully.'))
      setFormData({ reason: '', type: '' })
      setIsEdit(false)
      setEditingData(null)
      getData()
    } else {
      toast.error(response.message || 'Failed to submit data.')
    }
  } finally {
    setSubmitting(false)
  }
}
```

## 7) Service file pattern (required)
### Service module structure
- File location: `src/services/<Name>Services.js`
- Extend `BaseService`
- Use route constants from `src/apiRoutes.js`
- Prefer `super.customCall()` for custom endpoints/content-types

### Example service style (CaseCloseReasons pattern)

```js
import BaseService from './BaseService'
import * as apiroutes from '../apiRoutes'

class CaseCloseReasonsServices extends BaseService {
  constructor() {
    super(apiroutes.Case_Close_Reasons)
  }

  async create(data) {
    return await super.customCall('POST', '', data, null, 'json')
  }

  async update(id, data) {
    const isFormData = data instanceof FormData
    return await super.customCall('PATCH', '/' + id, data, null, isFormData ? 'multipart' : 'json')
  }

  async getAll(params = {}) {
    return await super.customCall('GET', '', null, params, null)
  }
}

const caseCloseReasonsServices = new CaseCloseReasonsServices()
export default caseCloseReasonsServices
```

## 8) Themed component usage standards
Prefer existing components from `src/components`:
- Layout/wrappers: `MainCard`, `Card`, `CollapsibleSection`
- Forms: `ValidatorForm`, `TextValidator`, `Autocomplete`, `RadioGroupField`, `CheckboxGroupField`
- Pickers: `DatePicker`, `TimePicker`, `DateTimePicker`
- Data display: `MuiTable`, `StatusChip`
- Feedback/dialogs: `ConfirmDialog`
- Other: `Printing`, `Stepper`

When generating examples/screens, follow the same usage patterns already documented in `ThemeDocumentation.jsx`.

## 8.1) Theme custom component details
Use these component-specific rules when generating screens:

- `MainCard`:
  - Use as the outer container for setup/data screens.
  - Prefer `MainCard` for major sections instead of raw MUI `Card`.

- `CollapsibleSection`:
  - Wrap create/edit forms inside it.
  - Common props: `title`, `buttonText`, `collapsTrigger`, `underLineVisible`, `showButton`.
  - Use `collapsTrigger` when external state should open/close section.

- `ValidatorForm`:
  - Import as default: `import ValidatorForm from 'components/ValidatorForm'`.
  - Use as the parent form component.
  - Wire submission with `onSubmit={submitData}` and prevent duplicate submit states via `submitting` flag.

- `TextValidator`:
  - Import as default: `import TextValidator from 'components/TextValidator'`.
  - Use for validated text/email/password/textarea inputs.
  - Pass `validators` and `errorMessages`.
  - `errorMessages` is supported here and should be used for required fields.

- `Autocomplete` (`components/AutocompleteField`):
  - Use `options`, `getOptionLabel`, and `isOptionEqualToValue` where needed.
  - Keep value shape consistent with option object.
  - Avoid passing unsupported props copied from `TextValidator` unless the component supports them.

- `DatePicker` / `TimePicker` / `DateTimePicker`:
  - Use existing wrapped components for date and time input.
  - Prefer screen-level validation logic and required handling consistent with existing forms.

- `MuiTable`:
  - Define clear `columns` with `accessorKey` and `header`.
  - For backend paging, use `manualPagination`, `rowCount`, `currentPage`, and `pageSize`.
  - Keep pagination state in `filters` and update via page/pageSize handlers.

- `StatusChip`:
  - Use for status display (`Active`, `Inactive`, etc.) and optional click-to-toggle behavior.

- `ConfirmDialog`:
  - Use for destructive/sensitive actions (delete, deactivate, status changes).
  - Pass `type`, `title`, `description`, and explicit confirm/cancel buttons.

- `Printing`:
  - Keep `ref`-based print trigger pattern.
  - Use `styleLocation="/assets/po_styles.css"` for print CSS.

- `Stepper`:
  - Use for multi-step flows with `steps`, optional `icons`, and active step handling.

- `CodeBlock`:
  - Use in documentation/demo pages for usage snippets.

- `CardTitle`:
  - Use as top heading element in documentation-like pages.

- `Button`:
  - Prefer app button component over raw MUI button.
  - Use `process={submitting}` in submit flows where supported.
  - Reuse utility classes from `buttonColors.css` (`btn-success`, `btn-danger`, etc.) when needed.

## 8.2) Data-driven Autocomplete strategy (Data Setup)
For data setup screens, prefer dynamic autocomplete options loaded from services instead of hardcoded arrays.

- Use a dedicated autocomplete wrapper (for example patterns in `src/AutoComplites/Locations.jsx`).
- Keep local option state:
  - `data` for options
  - `filters` with `page`, `limit`, `search`, and optional `status`
- Fetch options in `useEffect` when filters change.
- Call service modules (for example `LocationServices.getAll(filters)`) instead of inline API calls.
- Map selected value from id/value to full option object for controlled Autocomplete.
- Use `textInputOnChange` (or `onInputChange` when needed) to update `filters.search`.

Example pattern:

```js
const [data, setData] = useState([])
const [filters, setFilters] = useState({ limit: 50, page: 1, search: null, status: 'active' })

useEffect(() => {
  const fetchData = async () => {
    const response = await LocationServices.getAll(filters)
    if (response.success) {
      setData(response?.data?.data || response?.data?.view?.data || [])
    }
  }
  fetchData()
}, [filters])

<Autocomplete
  name="location"
  options={data}
  value={data.find((item) => item.id === formData.location) || null}
  getOptionLabel={(option) => option.name || ''}
  onChange={(event, newValue) => {
    setFormData((prev) => ({ ...prev, location: newValue?.id || null }))
  }}
  textInputOnChange={(event) => {
    setFilters((prev) => ({ ...prev, search: event.target.value }))
  }}
/>
```

Do not bypass this pattern in setup screens unless options are truly static and small.

## 8.3) Mandatory path + scaffold rules for DataSetups
When creating a new Data Setup module, always generate files in these locations:

- Screen path: `src/pages/DataSetups/<DataSetupName>/index.jsx`
- Optional local helpers for that screen: `src/pages/DataSetups/<DataSetupName>/*`
- Autocomplete component path: `src/AutoComplites/<DataSetupName>.jsx`

Required generation behavior:

- Every Data Setup screen under `src/pages/DataSetups/*` must use `MainCard` + `CollapsibleSection` + `ValidatorForm` + `MuiTable`.
- If the screen references another entity through a dropdown, generate a dedicated reusable autocomplete wrapper in `src/AutoComplites/`.
- Autocomplete options must be loaded from backend via service modules in `src/services/*Services.js`; do not hardcode option arrays.
- Keep autocomplete search server-driven using `filters.search` and `textInputOnChange`.
- Use the existing `Locations.jsx` behavior as the baseline pattern (controlled value mapping + backend fetch + filter state).

### DataSetup screen layout template
Use this structure for new setup screens:

```jsx
import Grid from '@mui/material/Grid'
import React, { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import MainCard from 'components/MainCard'
import CollapsibleSection from 'components/CollapsibleSection'
import ValidatorForm from 'components/ValidatorForm'
import TextValidator from 'components/TextValidator'
import Button from 'components/Button'
import MuiTable from 'components/MuiTable'
import SomeEntityAutoComplete from 'AutoComplites/SomeEntity'
import SomeDataSetupServices from 'services/SomeDataSetupServices'

const SomeDataSetup = () => {
  const [formData, setFormData] = useState({ code: '', description: '', relatedEntity: null })
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [editingData, setEditingData] = useState(null)
  const [filters, setFilters] = useState({ page: 1, limit: 20, search: null })
  const [totalItems, setTotalItems] = useState(0)

  const getData = useCallback(async () => {
    setLoading(true)
    try {
      const response = await SomeDataSetupServices.getAll(filters)
      if (response.success) {
        setData(response?.data?.view?.data || response?.data?.data || [])
        setTotalItems(response?.data?.view?.totalItems || response?.data?.totalItems || 0)
      } else {
        toast.error(response.message || 'Failed to load data.')
      }
    } finally {
      setLoading(false)
    }
  }, [filters])

  useEffect(() => {
    getData()
  }, [getData])

  const submitData = async (event) => {
    event.preventDefault()
    setSubmitting(true)
    try {
      const payload = Object.fromEntries(
        Object.entries(formData).filter(([_, value]) => value !== null && value !== '')
      )

      const response = isEdit
        ? await SomeDataSetupServices.update(editingData, payload)
        : await SomeDataSetupServices.create(payload)

      if (response.success) {
        toast.success(response.message || (isEdit ? 'Updated successfully.' : 'Created successfully.'))
        setFormData({ code: '', description: '', relatedEntity: null })
        setIsEdit(false)
        setEditingData(null)
        getData()
      } else {
        toast.error(response.message || 'Failed to submit data.')
      }
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <MainCard>
      <CollapsibleSection title="Some Data Setup" buttonText="New">
        <ValidatorForm onSubmit={submitData} process={submitting}>
          <Grid container spacing={1}>
            <Grid size={{ lg: 4, md: 6, sm: 12, xs: 12 }}>
              <TextValidator
                name="code"
                label="Code"
                value={formData.code}
                onChange={(e) => setFormData((prev) => ({ ...prev, code: e.target.value }))}
                validators={['required']}
                errorMessages={['This field is required']}
              />
            </Grid>
            <Grid size={{ lg: 4, md: 6, sm: 12, xs: 12 }}>
              <SomeEntityAutoComplete
                name="relatedEntity"
                label="Related Entity"
                value={formData.relatedEntity}
                onChange={(event, option) => {
                  setFormData((prev) => ({ ...prev, relatedEntity: option?.id || null }))
                }}
              />
            </Grid>
            <Grid size={{ lg: 4, md: 12, sm: 12, xs: 12 }}>
              <TextValidator
                name="description"
                label="Description"
                value={formData.description}
                onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                validators={['required']}
                errorMessages={['This field is required']}
              />
            </Grid>
          </Grid>
          <Grid container className="mt-2" spacing={1}>
            <Grid>
              <Button type="submit" process={submitting}>{isEdit ? 'UPDATE' : 'SAVE'}</Button>
            </Grid>
          </Grid>
        </ValidatorForm>
      </CollapsibleSection>

      <MuiTable
        title="Some Data Setup"
        columns={[]}
        data={data}
        loading={loading}
        manualPagination={true}
        rowCount={totalItems}
        currentPage={filters.page}
        pageSize={filters.limit}
        onPageChange={(page) => setFilters((prev) => ({ ...prev, page }))}
        onPageSizeChange={(limit) => setFilters((prev) => ({ ...prev, page: 1, limit }))}
      />
    </MainCard>
  )
}

export default SomeDataSetup
```

### Autocomplete component layout template (`src/AutoComplites/<Name>.jsx`)

```jsx
import React, { useEffect, useState } from 'react'
import Autocomplete from 'components/AutocompleteField'
import SomeLookupServices from 'services/SomeLookupServices'

const SomeLookup = ({
  name,
  label,
  value,
  onChange,
  required = false,
  validators = [],
  errorMessages = [],
}) => {
  const [data, setData] = useState([])
  const [filters, setFilters] = useState({ limit: 50, page: 1, search: null, status: 'active' })

  useEffect(() => {
    const fetchData = async () => {
      const response = await SomeLookupServices.getAll(filters)
      if (response.success) {
        setData(response?.data?.data || response?.data?.view?.data || [])
      }
    }

    fetchData()
  }, [filters])

  return (
    <Autocomplete
      name={name}
      label={label}
      value={data.find((item) => item.id === value) || null}
      onChange={(event, newValue) => {
        if (onChange) onChange(event, newValue)
      }}
      options={data}
      getOptionLabel={(option) => option.name || option.description || ''}
      textInputOnChange={(event) => {
        setFilters((prev) => ({ ...prev, page: 1, search: event.target.value }))
      }}
      required={required}
      validators={validators}
      errorMessages={errorMessages}
    />
  )
}

export default SomeLookup
```

### Naming rules for generated DataSetup modules

- Page component file/folder naming: `src/pages/DataSetups/<PascalCaseName>/index.jsx`
- Autocomplete component naming: `src/AutoComplites/<PascalCaseName>.jsx`
- Service naming: `src/services/<PascalCaseName>Services.js`
- Keep page title, section title, table title, and service/entity naming aligned.

## 9) Theme and styling rules
- Always prefer theme tokens over hardcoded values:
  - `theme.palette.*`
  - `theme.spacing(...)`
  - `theme.shape.borderRadius`
  - `theme.shadows[*]`
- Ensure compatibility with both light and dark mode.
- For global styling, prefer reusable utility classes instead of one-off inline values when reasonable.

## 10) Global utility classes from src/styles
These are available app-wide and should be reused:

### Spacing/sizing (`SpacingGlobalStyles.js`)
- Patterns: `m-*`, `mt-*`, `mb-*`, `ml-*`, `mr-*`, `mx-*`, `my-*`, `p-*`, `pt-*`, `pb-*`, `pl-*`, `pr-*`, `px-*`, `py-*`
- Width/height patterns: `w-*`, `h-*`, `min-w-*`, `max-w-*`, `min-h-*`, `max-h-*`
- Helpers: `px-main-card`, `px-main-8`, `p-sm-24`, `m-auto`, `mx-auto`, `w-full`, `h-full`, `h-full-screen`

### Positioning/text (`PositioningGlobalStyles.js`)
- `flex`, `flex-column`, `justify-between`, `items-center`, `relative`, `position-absolute`
- `text-left`, `text-center`, `text-right`
- `capitalize`, `uppercase`, `lowercase`, `font-light`, `font-medium`, `font-bold`

### Border (`BorderGlobalStyles.js`)
- `border-radius-0`, `border-radius-4`, `border-radius-8`, `border-radius-12`, `rounded`, `rounded-l`, `rounded-r`

### Shadow (`ShadowGlobalStyles.js`)
- `elevation-z0` through `elevation-z24` (from MUI theme shadows)

### Animations (`animations.js`)
- `fade-in`, `spin`, `hover_zoom`

### Button color classes (`buttonColors.css`)
- `btn-success`, `btn-danger`, `btn-warning`, `btn-info`, `btn-dark`

## 11) Table and interaction standards
- Use `MuiTable` with clear `columns` definitions.
- Use `manualPagination` where backend pagination is used.
- Keep pagination in sync via `filters.page` and `filters.limit`.
- For critical actions (delete/deactivate), use `ConfirmDialog` before calling service methods.
- For search, update `filters.search` from input handlers.

## 12) Printing and Stepper
- Use existing `Printing` component for print flows.
- For printing styles, use `styleLocation="/assets/po_styles.css"`.
- Use existing `Stepper` component for multi-step UI.

## 13) Naming conventions (follow exactly)
- Variables/functions: `camelCase`
- Components: `PascalCase`
- Constants: `UPPER_SNAKE_CASE`
- Keep names concise and descriptive.
- Avoid vague names like `data`, `info`, `temp` unless context makes them specific.

## 14) File and folder conventions
- Follow existing repository style and structure.
- Prefer current naming in this repo for consistency.
- Do not introduce parallel component systems when shared components already exist.

## 15) Troubleshooting-aware generation
When generating code, proactively avoid common issues from theme docs:
- MUI Grid API mismatch/deprecation usage
- Passing unsupported `errorMessages` props to components that do not support them
- Printing ref setup mistakes with `Printing`
- Ignoring dark mode/theming token usage

### Frequent errors and required fixes
- **Error:** `Module not found: Can't resolve '@mui/material/Grid2'`
  **Fix:** Use `import Grid from '@mui/material/Grid'` only.
- **Error:** Deprecated Grid prop warnings (`md`, `lg`, etc. as direct props)
  **Fix:** Use Grid v2 syntax with `size={{ ... }}`.
- **Error:** `export 'ValidatorForm' was not found in 'components/ValidatorForm'` (or same for `TextValidator`)
  **Fix:** All shared components are default exports. Use `import ValidatorForm from 'components/ValidatorForm'` and `import TextValidator from 'components/TextValidator'` — never named imports with `{ }`.
- **Error:** Field component warnings for unsupported props (`errorMessages` on non-TextValidator components)
  **Fix:** Use `errorMessages` only on `TextValidator`; use component-supported validation props elsewhere.
- **Error:** Blank print output or print ref issues
  **Fix:** Ensure `ref` is wired to `Printing` and trigger with `printRef.current?.handlePrint()`.
- **Error:** Inconsistent light/dark visuals
  **Fix:** Replace hardcoded values with theme tokens (`theme.palette`, `theme.spacing`, `theme.shadows`).
- **Error:** Data setup forms update UI but not backend
  **Fix:** Move API calls to `src/services/*Services.js`, and call from `getData`/`submitData` with `response.success` checks.

### Installation/dependency note
- If dependency installation fails due to peer conflicts, use `npm install --legacy-peer-deps`.

## 16) Output checklist for Copilot
Before finalizing generated code, confirm:
- Uses MUI Grid v2 `size={{...}}`
- Uses `MainCard` + `CollapsibleSection` for setup screens
- Uses `formData`, `getData`, `submitData`
- Uses a service module in `src/services` extending `BaseService`
- Uses `response.success` branches and toast messages
- Uses existing shared components instead of duplicates
- Uses theme tokens and/or approved global utility classes
- Keeps responsive behavior and theme consistency

## 17) New themed component checklist
When adding a new reusable themed component:
- Create it under `src/components/` and consume theme values with `useTheme` (or MUI theme-aware `sx`).
- Use theme tokens for colors, spacing, typography, and border radius.
- Export it from `src/components/index.js`.
- Add or update a live demo in `src/pages/ThemeComponentsexamples/ThemeDocumentation.jsx`.
- Add/update usage snippet examples with `CodeBlock` when applicable.
- Validate behavior in both light and dark mode.

## 18) Review quality gates (before push)
For significant UI/theme work, verify locally before pushing:
- `npm run test -- --watchAll=false --passWithNoTests`
- `npm run build`
- Confirm no console warnings for Grid import/props or unsupported field props.
