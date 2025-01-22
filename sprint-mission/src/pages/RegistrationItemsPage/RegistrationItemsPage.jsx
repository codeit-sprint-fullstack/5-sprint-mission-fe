import "./RegistrationItemsPage.css";
import { RegItemInput } from "./ui/RegItemInput";
import { Typo, typoStyles } from "../../shared/Typo/Typo";
import { TagWithClose } from "./ui/TagWithClose";
import { useRegItem } from "./hooks/regItemHook";

export function RegistrationItemsPage() {
  const {
    body,
    updateTags,
    deleteTag,
    updateBody,
    isInputValid,
    usePostItem,
    isFormDisabled,
  } = useRegItem();

  const inputFields = [
    {
      label: "상품명",
      placeholder: "상품명을 입력해주세요",
      type: "text",
      field: "name",
      onInput: (value) => updateBody("name", value),
    },
    {
      label: "상품 소개",
      placeholder: "상품 소개를 입력해주세요",
      type: "textarea",
      field: "description",
      onInput: (value) => updateBody("description", value),
    },
    {
      label: "판매가격",
      placeholder: "판매 가격을 입력해주세요",
      type: "text",
      field: "price",
      onInput: (value) => updateBody("price", value),
    },
    {
      label: "태그",
      placeholder: "태그를 입력해주세요",
      type: "text",
      field: "tagInput",
      onInput: (value) => updateTags(value),
    },
  ];

  return (
    <div className="content" id="registration-items-page">
      <div className="section-top">
        <Typo
          className={`${typoStyles.textXlBold} section-text`}
          content="상품 등록하기"
        />
        <button
          id="reg-btn"
          className={`${typoStyles.textLgSemibold} ${
            !isFormDisabled() ? "active" : ""
          }`}
          disabled={isFormDisabled()}
          onClick={usePostItem}
        >
          등록
        </button>
      </div>

      <div className="section-main">
        <div className="input-container">
          {inputFields.map((field) => (
            <RegItemInput
              key={field.field}
              label={field.label}
              placeholder={field.placeholder}
              type={field.type}
              onInput={field.onInput}
              isError={isInputValid(field.field).isError}
              errMsg={isInputValid(field.field).errMsg}
            />
          ))}
        </div>
        <div className="tag-chip-wrapper">
          {body.tags.map((tag, idx) => (
            <TagWithClose tag={tag} deleteTag={deleteTag} key={idx} />
          ))}
        </div>
      </div>
    </div>
  );
}
