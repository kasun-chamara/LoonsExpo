export const component_types = [
    { label: 'Text Validator', value: 'TextValidator', haveValues: false },
    { label: 'Text Field', value: 'TextField', haveValues: false },
    { label: 'Dropdown', value: 'Dropdown', haveValues: true },
    { label: 'Radio Group', value: 'RadioGroup', haveValues: true },
    { label: 'Date Picker', value: 'DateValidator', haveValues: false },
    { label: 'Time Picker', value: 'TimeValidator', haveValues: false },
]

export const field_types = [
    { label: 'Number', value: 'Number' },
    { label: 'Text', value: 'Text' },

]

export const field_validations = [
    { label: 'Required', value: 'required', allowAddingValue: false },
    { label: 'Match Regular Expression', value: 'matchRegexp', allowAddingValue: true },
    { label: 'Is Email', value: 'isEmail', allowAddingValue: false },
    { label: 'Is Empty', value: 'isEmpty', allowAddingValue: false },
    { label: 'Trim', value: 'trim', allowAddingValue: false },
    { label: 'Is Number', value: 'isNumber', allowAddingValue: false },
    { label: 'Is Float', value: 'isFloat', allowAddingValue: false },
    { label: 'Is Positive', value: 'isPositive', allowAddingValue: false },
    { label: 'Minimum Number', value: 'minNumber', allowAddingValue: true },
    { label: 'Maximum Number', value: 'maxNumber', allowAddingValue: true },
    { label: 'Minimum Float', value: 'minFloat', allowAddingValue: true },
    { label: 'Maximum Float', value: 'maxFloat', allowAddingValue: true },
    { label: 'Is String', value: 'isString', allowAddingValue: false },
    { label: 'Minimum String Length', value: 'minStringLength', allowAddingValue: true },
    { label: 'Maximum String Length', value: 'maxStringLength', allowAddingValue: true },
    { label: 'Maximum File Size', value: 'maxFileSize', allowAddingValue: true },
    { label: 'Allowed Extensions', value: 'allowedExtensions', allowAddingValue: true },
];
