// import { Autocomplete } from 'components';
// import React, { useEffect, useState } from 'react';
// import localStorageService from 'services/localStorageService';
// //import UserServices from 'services/UserServices';
// import LocationServices from 'services/LocationServices';
// /**
//  * AutocompleteField - Themed, reusable autocomplete component with validation, using TextValidator as input.
//  *
//  * @param {object} props
//  * @param {string} props.name - Name of the field (for form handling).
//  * @param {string} [props.label] - Label for the field.
//  * @param {any} props.value - Value (controlled, can be string, object, or array for multiple).
//  * @param {function} props.onChange - Change handler (event, value) => void.
//  * @param {boolean} [props.required] - Required field.
//  * @param {Array} [props.validators] - Validation rules.
//  * @param {Array} [props.errorMessages] - Validation error messages.
//  * @returns {JSX.Element}
//  */

// const Locations = ({
//     name,
//     label,
//     value,
//     onChange,
//     required = false,
//     validators = [],
//     errorMessages = [],
// }) => {

//     const [data, setData] = useState([]);
//     const [filters, setFilters] = useState({ limit: 50, page: 1, search: null,status:'active' })



//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const company_id = await localStorageService.getItem('user')?.company_id;
//                 if (!company_id) {
//                     console.error('Company ID not found');
//                     return;
//                 }
//                 const [data] = await Promise.all([
//                     LocationServices.getAll({ ...filters, company_id }),
//                 ]);

//                 setData(data?.data?.data || []);

//             } catch (error) {
//                 console.error('Error fetching data:', error);
//             }
//         };

//         fetchData();
//     }, [filters]);








//     return (
//         <div>
//             <Autocomplete
//                 name={name}
//                 label={label}
//                  value={data.find((item) => item.id === value) || null}
//                 onChange={(event, newValue) => {
//                     if (onChange) onChange(event, newValue);
//                 }}
//                 options={data}
//                 getOptionLabel={option => option.name || option.name || ''}
//                 textInputOnChange={(e) => {
//                     setFilters({ ...filters, search: e.target.value })
//                 }}
//                 //isOptionEqualToValue={(option, value) => option?.id === value?.id || option?.value === value?.value}
//                 required={required}
//                 validators={validators}
//                 errorMessages={errorMessages}
//             />
//         </div>
//     );
// };

// export default Locations;
