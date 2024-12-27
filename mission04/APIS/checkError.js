const newError = (fields) => {
  const message = [`Error! {\n`];

  for (const [field, type] of fields) message.push(`${field}: ${type}`);
  message.push(`}\n`);

  throw new Error(message.join(""));
};

export const verifyParams = (fields, params) => {
  const isValidField = (field) => field in params;
  const isEmpty = (field) => !params[field];
  const isValidType = (field, type) => typeof field === type;

  for (const [field, type] of fields) {
    // 1. 필수 필드가 모두 있는지 확인
    if (!isValidField(field)) newError(fields);

    // 2. 필드 값이 비어 있는지 확인
    if (isEmpty(field)) {
      throw new Error(`Error! "${field}"속성의 값이 비어있습니다!`);
    }

    // 3. 필드 타입이 올바른지 확인
    if (isValidType(field, type)) {
      throw new Error(`Error! ${field}속성의 타입이 올바르지 않습니다! (${field}: "${type}")`);
    }
  }
};
