export const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

export const isEmpty = (value) => value.trim() === "";

export const isNumber = (value) => !isNaN(value);

export const hasMinLength = (value, minLength) => value.length >= minLength;

export const hasMaxLength = (value, maxLength) => value.length <= maxLength;

export const isEqual = (value, otherValue) => value === otherValue;
