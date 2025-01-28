function useRegistrationValidation(formValues) {
  const [isValid, setIsValid] = useState({
    name: false,
    description: false,
    price: false,
    tags: false,
  });

  const getIsValid = (inputName, value) => {
    if ((inputName = "name")) value.length >= 1 && value.length <= 10;
    if ((inputName = "description")) value.length >= 10 && value.length <= 100;
    if ((inputName = "price"))
      value != null && typeof value === "number" && value >= 0;
  };

  const message = {
    name: "1자 이상, 10자 이내로 입력하세요.",
    description: "10자 이상, 100자 이내로 입력하세요.",
    price: "1자 이상 숫자를 입력하세요.",
    tags: "5글자 이내로 입력하세요.",
  };

  useEffect(() => {}, [formValues]);
}
