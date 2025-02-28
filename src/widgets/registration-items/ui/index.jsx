import { useState } from "react";
import "./style.css";
import { Button, InputBox, Text } from "shared/ui";
import useProductValidation from "shared/hooks/useProductValidation";
import { TagItem } from "features";
import PostProducts from "shared/api/post-products";
import { useNavigate } from "react-router-dom";

// (3) 태그 쌓기
const RegistrationItems = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    tag: "",
    tags: new Set([]),
  });
  const { errors, validateField } = useProductValidation();

  const textProps = {
    size: "2lg",
    weight: "bold",
    style: { color: "#1f2937", marginBottom: "16px" },
  };
  const errorMessageProps = {
    size: "md",
    weight: "semibold",
    style: { color: "#f74747", paddingLeft: "16px", marginTop: "8px" },
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleBlur = (e) => {
    validateField(e.target.name, e.target.value);
  };

  const handleClickTagX = (tagToRemove) => {
    setForm((prevData) => ({
      ...prevData,
      tags: new Set([...prevData.tags].filter((tag) => tag !== tagToRemove)),
    }));
  };

  const addTag = () => {
    if (form.tag.trim() !== "") {
      setForm((prevData) => ({
        ...prevData,
        tags: new Set([...prevData.tags, form.tag]),
        tag: "", // Reset hobby input field
      }));
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      console.log("Enter");
      addTag();
    }
  };

  const isFormValid = Boolean(
    form.title &&
      form.description &&
      form.price &&
      form.tags.size &&
      !(errors.title || errors.description || errors.price)
  );

  const handleSubmit = async () => {
    if (!isFormValid) return;
    await PostProducts({ ...form });
    navigate("/items");
  };

  return (
    <div className="registration-items">
      <div className="registration__header">
        <Text size={"xl"} weight={"bold"} style={{ color: "#1f2937" }}>
          상품 등록하기
        </Text>
        <Button
          size={"sm42"}
          disabled={!isFormValid}
          handleClick={handleSubmit}
        >
          <Text size={"lg"} weight={"semibold"} style={{ color: "#f3f4f6" }}>
            등록
          </Text>
        </Button>
      </div>
      <div className="registration__item">
        <label>
          <Text {...textProps}>상품명</Text>
        </label>
        <InputBox
          type={"text"}
          name={"title"}
          value={form.title}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={"상품명을 입력해주세요"}
          style={{ border: `${errors.title ? "1px solid #f74747" : "none"}` }}
        ></InputBox>
        {errors.title && <Text {...errorMessageProps}>{errors.title}</Text>}
      </div>
      <div className="registration__item">
        <label>
          <Text {...textProps}>상품 소개</Text>
        </label>
        <InputBox
          isTextarea={true}
          name={"description"}
          value={form.description}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={"상품 소개를 입력해주세요"}
          style={{
            border: `${errors.description ? "1px solid #f74747" : "none"}`,
            height: "282px",
          }}
        ></InputBox>
        {errors.description && (
          <Text {...errorMessageProps}>{errors.description}</Text>
        )}
      </div>
      <div className="registration__item">
        <label>
          <Text {...textProps}>판매 가격</Text>
        </label>
        <InputBox
          type={"text"}
          name={"price"}
          value={form.price}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={"판매 가격을 입력해주세요"}
          style={{
            border: `${errors.price ? "1px solid #f74747" : "none"}`,
          }}
        ></InputBox>
        {errors.price && <Text {...errorMessageProps}>{errors.price}</Text>}
      </div>
      <div className="registration__item">
        <label>
          <Text {...textProps}>태그</Text>
        </label>
        <InputBox
          type={"text"}
          name={"tag"}
          value={form.tag}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          placeholder={"태그를 입력해주세요"}
          style={{
            border: `${errors.tag ? "1px solid #f74747" : "none"}`,
          }}
        ></InputBox>
        {errors.tag && <Text {...errorMessageProps}>{errors.tag}</Text>}
        <div className="registration__tags">
          {Array.from(form.tags).map((tag, i) => (
            <TagItem key={tag} handleClick={() => handleClickTagX(tag)}>
              {tag}
            </TagItem>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RegistrationItems;
