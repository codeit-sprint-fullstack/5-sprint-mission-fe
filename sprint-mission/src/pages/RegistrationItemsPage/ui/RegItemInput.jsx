import "./RegItemInput.css";
import { Typo, typoStyles } from "../../../shared/Typo/Typo";
import { useRef } from "react";

export function RegItemInput({
  label,
  placeholder,
  type,
  onInput,
  isError,
  errMsg,
}) {
  //엔터키 입력 상태 ref로 관리
  const enterPressRef = useRef(false);

  const errInputBoxClassName = isError ? "error" : "";
  const errMsgClassName = isError ? "show" : "";

  //input에 입력받은 내용 상위 컴포넌트에 전달하고 body 업데이트
  const handleBlur = (e) => {
    if (!enterPressRef.current) {
      //enter키다운으로 blur되면 handleBlur가 중복 실행되지 않도록 제외함
      //-> 마우스 클릭, Tab키로 포커스 아웃시 실행
      const value = e.target.value.trim();
      console.log("블러이벤트발생!: ", value);

      onInput(value);
      //input값 저장 후, 태그 input일 때만 input값 초기화해주기.
      //TODO: 에러났을때는 엔터해도 input초기화 안되게 해보자~
      if (label === "태그") {
        return (e.target.value = "");
      }
    }
    enterPressRef.current = false; // blur이벤트 처리 후 enter상태 초기화
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      enterPressRef.current = true; //enter키 눌렀을 때 handleBlur 중복 실행되지 않도록
      e.target.blur();
      const value = e.target.value.trim();
      console.log("키다운이벤트발생!: ", value);

      onInput(value);
      if (label === "태그") {
        return (e.target.value = "");
      }
    }
  };

  //input 공통 props
  const commonProps = {
    className: `${
      type === "textarea" ? "textarea-box" : "input-box"
    } ${errInputBoxClassName} ${typoStyles.textLgRegular}`,
    placeholder,
    onBlur: handleBlur,
    onKeyDown: handleKeyDown,
  };

  return (
    <div className="input-wrapper">
      <Typo
        className={`${typoStyles.text2lgBold} section-text`}
        content={label}
      />

      {type === "textarea" ? (
        <textarea {...commonProps} type={type} />
      ) : (
        <input {...commonProps} type={type} />
      )}

      {errMsg && (
        <Typo
          className={`err-text ${typoStyles.textLgSemibold} ${errMsgClassName}`}
          content={errMsg}
        />
      )}
    </div>
  );
}
