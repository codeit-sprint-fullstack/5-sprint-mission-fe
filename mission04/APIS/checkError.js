const isValidField = (field, data) => field in data;
const isValidType = (value, type) => typeof value === type;
export const isEmpty = (value) =>
  value === null ||
  value === undefined ||
  (typeof value === "string" && value.trim() === "") ||
  value === 0;

const alertValidBody = (fields) => {
  const message = [
    `필수 필드가 누락되었습니다: ${field}\n`,
    `올바른 body 구조를 가져야 합니다.\n`,
    `{\n`,
  ];
  for (const [field, type] of fields) message.push(`  ${field}: ${type}\n`);
  message.push(`}\n`);
  throw new Error(message.join(""));
};

export const verifyRequiredFields = (fields, data) => {
  // 1. 필수 필드가 모두 있는지 확인
  for (const [field, _] of fields) {
    if (!isValidField(field, data)) {
      alertValidBody(fields);
    }
  }
};

export const verifyData = (fields, data) => {
  // 2. 필드 값이 비어 있는지 확인
  for (const key in data) {
    const value = data[key];
    if (isEmpty(value)) {
      throw new Error(`"${key}"속성의 값이 비어있습니다!`);
    }
  }

  // 3. 필드 타입이 올바른지 확인
  for (const key in data) {
    const value = data[key];
    const [_, type] = fields.find(([field, _]) => field === key);
    if (!isValidType(value, type)) {
      throw new Error(
        `${key}속성의 타입이 올바르지 않습니다! (${key}: "${type}")`
      );
    }
  }
};
