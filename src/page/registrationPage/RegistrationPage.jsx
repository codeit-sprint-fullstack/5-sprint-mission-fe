import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Header } from "../header/header";
import { Footer } from "../../components/Share/footer/footer";
import InputField from "../../components/Share/InputField";
import Validation from "./Validation/Validation";
import { createProduct } from "../../api/Productapi";
import XIcon from "../../components/img/X-round-Icon.png.png";

const RegistrationPage = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState([]);
  const [isFormValid, setIsFormValid] = useState(false);

  const { errors, validate } = Validation();
  const navigate = useNavigate();
  //태그 추가
  const handleTagInput = (e) => {
    if (e.key === "Enter" && tag.trim() !== "") {
      if (!tags.includes(tag) && validate("tag", tag)) {
        setTags((prev) => [...prev, tag.trim()]);
      }
      setTag("");
    }
  };

  //태그 제거
  const removeTag = (tagToRemove) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  //유효성 검사
  useEffect(() => {
    const isValid =
      name.trim() !== "" &&
      description.trim() !== "" &&
      price.trim() !== "" &&
      validate("name", name, true) &&
      validate("description", description, true) &&
      validate("price", price, true) &&
      tags.length > 0;
    setIsFormValid(isValid);
  }, [name, description, price, tags, isFormValid, validate]);

  const handleSubmit = async () => {
    const productData = { name, description, price: Number(price), tags };
    console.log("productData", productData);
    try {
      await createProduct(productData);
      navigate("/productRegistration");
    } catch (err) {
      console.error("Failed to register product:", err);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col  gap-6  ">
      <Header loginBtn="로그인" />
      <div className="w-full  flex-grow justify-center pt-24 px-96 pb-40 max-xl:px-2 ">
        <header className="w-full flex justify-between items-center gap-4 pb-6">
          <h2 className="text-xl font-bold text-gray-900">상품 등록하기</h2>
          {isFormValid ? (
            <button
              onClick={handleSubmit}
              className="px-6 py-2 text-white font-semibold rounded-lg bg-blue-600 hover:bg-blue-700"
            >
              등록
            </button>
          ) : (
            <button
              className="px-6 py-2 text-white font-semibold rounded-lg bg-gray-400 cursor-not-allowed"
              disabled
            >
              등록
            </button>
          )}
        </header>

        <div className="flex flex-col gap-7">
          <InputField
            title="상품명"
            type="text"
            placeholder="상품명을 입력해주세요"
            value={name}
            setKeyword={(val) => {
              setName(val);
              validate("name", val, true);
            }}
            px="6"
            py="4"
            error={errors.name}
          />
          <InputField
            title="상품 소개"
            type="text"
            placeholder="상품 소개를 입력해주세요"
            value={description}
            setKeyword={(val) => {
              setDescription(val);
              validate("description", val, true);
            }}
            error={errors.description}
            px="6"
            py="4"
            h="282px"
          />
          <InputField
            title="판매가격"
            type="text"
            placeholder="판매 가격을 입력해주세요"
            value={price}
            setKeyword={(val) => {
              setPrice(val);
              validate("price", val, true);
            }}
            error={errors.price}
            px="6"
            py="4"
          />
          <InputField
            title="태그"
            type="text"
            placeholder="태그을 입력해주세요"
            value={tag}
            setKeyword={(val) => {
              setTag(val);
              validate("tag", val, true);
            }}
            onKeyPress={handleTagInput}
            error={errors.tag}
            px="6"
            py="4"
          />
          <div className="flex flex-wrap gap-2">
            {tags.map((t, index) => (
              <span
                key={index}
                className="h-9 px-4 py-1 bg-gray-100 text-gray-800 text-base font-normal rounded-3xl whitespace-nowrap gap-2 flex items-center"
              >
                #{t}
                <img
                  src={XIcon}
                  alt="Remove"
                  className="w-5 cursor-pointer"
                  onClick={() => removeTag(t)}
                />
              </span>
            ))}
          </div>
        </div>
      </div>

      <Footer source="©codeit - 2024" policy="Privacy Policy" faq="FAQ" />
    </div>
  );
};

export default RegistrationPage;
