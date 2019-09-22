let required = (propertyType) => { 
  return v => v && v.length > 0 || `You must input a ${propertyType}`
}
let minLength = (propertyType, minLength) => {
  return v => v && v.length >= minLength || `${propertyType} must be at least ${minLength} characters`
}
let maxLength = (propertyType, maxLength) => {
  return v => v && v.length <= maxLength || `${propertyType} must be less than ${maxLength} characters`
}

export default {
  required,
  minLength,
  maxLength
}