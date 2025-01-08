const required_fields = {
  articles: [
    ["title", "string"],
    ["content", "string"],
    ["image", "string"],
  ],

  products: [
    ["title", "string"],
    ["description", "string"],
    ["price", "number"],
    ["tags", "object"],
    ["images", "object"],
  ],
};

const isValidField = (field, data) => field in data;
const isValidType = (value, type) => typeof value === type;

const isEmpty = (value) =>
  value === null ||
  value === undefined ||
  (typeof value === "string" && value.trim() === "") ||
  value === 0;

const verifyFields = (data, fields) => {
  fields.forEach(([field]) => {
    if (!isValidField(field, data)) {
      throw new Error(`Missing required field: ${field}`);
    }
  });
};

const verifyData = (data, fields) => {
  fields.forEach(([field, type]) => {
    if (!isValidType(data[field], type)) {
      throw new Error(
        `Invalid type for field ${field}. Expected ${type}, got ${typeof data[
          field
        ]}`
      );
    }
  });
};

const errorChecks = {
  required_fields,
  isValidField,
  isValidType,
  isEmpty,
  verifyFields,
  verifyData,
};

export default errorChecks;
