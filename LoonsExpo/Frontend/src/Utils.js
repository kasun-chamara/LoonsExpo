import moment from "moment/moment"

export function dateParse(date) {
    let data = moment(date).format('yyyy-MM-DD')
    if (data !== 'Invalid date' && date !== null) {
        return data
    } else {
        return ''
    }
}

export function dateTimeParse(date) {
    let data = moment(date).format('yyyy-MM-DD HH:mm:ss')
    if (data !== 'Invalid date' && date !== null) {
        return data
    } else {
        return ''
    }
}
export function timeParse(time) {
    let data = moment(time).format('HH:mm')
    if (data !== 'Invalid date' && time !== null) {
        return data
    } else {
        return ''
    }
}
export function padLeadingZeros(num, size) {
    var s = num + ''
    while (s.length < size) s = '0' + s
    return s
}

export function yearParse(date) {
    return moment(date).format('yyyy')
}
export function yearMonthParse(date) {

    return moment(date).format('yyyy-MM');
}

export function roundDecimal(value, precision) {
    var multiplier = Math.pow(10, precision || 0)
    return Math.round(value * multiplier) / multiplier
}

export function convertTocommaSeparated(value, precision, minimumFractionDigits = 2) {
    if (precision === 0) {
        return (parseFloat(value).toLocaleString('en-US', { style: 'decimal' }))
    } else {
        return (parseFloat(roundDecimal(value, precision)).toLocaleString('en-US', { style: 'decimal', minimumFractionDigits: minimumFractionDigits }))
    }
}


export function convertTocommaSeparatedWithoutRound(value) {
    const parts = parseFloat(value).toString().split('.');
    let lengthOFDecimal = parts.length > 1 ? parts[1].length : 0;
    return (parseFloat(value).toLocaleString('en-US', { style: 'decimal', minimumFractionDigits: lengthOFDecimal }));
}


export function convertTocommaSeparatedWithoutDecimal(value, precision, minimumFractionDigits = 2) {
    if (value === null) {
        return null
    } else if (precision === 0) {
        return (parseInt(value).toLocaleString('en-US', { style: 'decimal' }))
    } else {
        return (Math.round(roundDecimal(value, precision)).toLocaleString('en-US', { style: 'decimal', minimumFractionDigits: minimumFractionDigits }))
    }
}

export function scrollToTop() {
    // Scroll the entire page to the top
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
    });
}

export function includesArrayElements(arr1, arr2) {
    return arr2.some(element => arr1.includes(element));
}

export function isValidJsonString(str) {
  if (typeof str !== 'string') return false;
  try {
    JSON.parse(str);
    return true;
  } catch (e) {
    return false;
  }
}

export function getRatingColor(rating) {
    if (rating <= 5) {
        return "green";  // Very Low to Low
    } else if (rating < 10) {
        return "yellow";  // Medium
    } else if (rating <= 15) {
        return "orange";  // High to Very High
    } else {
        return "red";  // Extreme
    }
}
