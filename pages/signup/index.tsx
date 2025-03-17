import { useTogglePassword } from "@/hooks/useTogglePassword";
import { useState, useCallback } from "react";
import { useRouter } from "next/router";
import {
  validateEmail,
  validatePassword,
  checkFormValidity,
} from "@/utils/formValidation";
import styles from "@/styles/signup.module.css";
import Image from "next/image";
import Link from "next/link";

export default function SignupForm() {
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const { showPassword, toggle: togglePassword } = useTogglePassword();
  const { showPassword: showPasswordConfirm, toggle: togglePasswordConfirm } =
    useTogglePassword();

  const [formErrors, setFormErrors] = useState({
    email: "",
    nickname: "",
    password: "",
    passwordConfirmation: "",
  });
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  // 각 필드의 유효성 결과 객체 생성
  const validationResults = {
    email: email.trim() !== "" && validateEmail(email).isValid,
    nickname: nickname.trim() !== "",
    password: password.trim() !== "" && validatePassword(password).isValid,
    passwordConfirmation:
      passwordConfirmation.trim() !== "" && password === passwordConfirmation,
  };

  const isFormValid = checkFormValidity(validationResults);

  const handleValidation = useCallback(
    (field: "email" | "nickname" | "password" | "passwordConfirmation") => {
      let result = { isValid: false, errorMessage: "" };
      switch (field) {
        case "email":
          result = validateEmail(email);
          break;
        case "nickname":
          if (!nickname.trim()) {
            result = { isValid: false, errorMessage: "닉네임을 입력해주세요." };
          } else {
            result = { isValid: true, errorMessage: "" };
          }
          break;
        case "password":
          result = validatePassword(password);
          break;
        case "passwordConfirmation":
          if (!passwordConfirmation.trim()) {
            result = {
              isValid: false,
              errorMessage: "비밀번호를 입력해주세요.",
            };
          } else if (password !== passwordConfirmation) {
            result = {
              isValid: false,
              errorMessage: "비밀번호가 일치하지 않습니다.",
            };
          } else {
            result = { isValid: true, errorMessage: "" };
          }
          break;
      }
      setFormErrors((prev) => ({ ...prev, [field]: result.errorMessage }));
      return result.isValid;
    },
    [email, nickname, password, passwordConfirmation]
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const isEmailValid = handleValidation("email");
    const isNicknameValid = handleValidation("nickname");
    const isPasswordValid = handleValidation("password");
    const isPasswordConfirmationValid = handleValidation(
      "passwordConfirmation"
    );

    if (
      checkFormValidity({
        email: isEmailValid,
        nickname: isNicknameValid,
        password: isPasswordValid,
        passwordConfirmation: isPasswordConfirmationValid,
      })
    ) {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_CODEIT_URL}/auth/signUp`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email,
              nickname,
              password,
              passwordConfirmation,
            }),
          }
        );
        if (res.status === 200) {
          const data = await res.json();
          // accessToken을 localStorage에 저장
          localStorage.setItem("accessToken", data.accessToken);
          localStorage.setItem(
            "user",
            JSON.stringify({
              nickname: data.nickname,
              profileImg: data.image,
            })
          );
          // 회원가입 성공 시 /items 페이지로 이동
          router.push("/items");
        } else {
          setShowModal(true);
        }
      } catch (error) {
        setShowModal(true);
      }
    }
  };

  return (
    <div className={styles.signupContainer}>
      <div className={styles.logoBox}>
        <Link href="/">
          <Image
            src={"/assets/login_logo.svg"}
            alt="Panda"
            width={396}
            height={132}
          />
        </Link>
      </div>
      <form onSubmit={handleSubmit} className={styles.formContainer}>
        {/* 이메일 입력 필드 */}
        <div className={styles.formBox}>
          <p className={styles.explain}>이메일</p>
          <input
            className={styles.inputField}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => handleValidation("email")}
            type="email"
            placeholder="이메일을 입력해주세요"
          />
          {formErrors.email && (
            <p className={styles.errorText}>{formErrors.email}</p>
          )}
        </div>
        {/* 닉네임 입력 필드 */}
        <div className={styles.formBox}>
          <p className={styles.explain}>닉네임</p>
          <input
            className={styles.inputField}
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            onBlur={() => handleValidation("nickname")}
            type="text"
            placeholder="닉네임을 입력해주세요"
          />
          {formErrors.nickname && (
            <p className={styles.errorText}>{formErrors.nickname}</p>
          )}
        </div>
        {/* 비밀번호 입력 필드 */}
        <div className={styles.formBox}>
          <p className={styles.explain}>비밀번호</p>
          <div className={styles.inputDiv}>
            <input
              className={styles.inputField}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => handleValidation("password")}
              type={showPassword ? "text" : "password"}
              placeholder="비밀번호를 입력해주세요"
            />
            <button
              type="button"
              onClick={togglePassword}
              className={styles.pwdImg}
              style={{
                backgroundImage: `url(${
                  showPassword
                    ? "/assets/pw-img-on.svg"
                    : "/assets/pw-img-off.svg"
                })`,
              }}
              aria-label={showPassword ? "비밀번호 숨기기" : "비밀번호 표시"}
            />
          </div>
          {formErrors.password && (
            <p className={styles.errorText}>{formErrors.password}</p>
          )}
        </div>
        {/* 비밀번호 확인 입력 필드 */}
        <div className={styles.formBox}>
          <p className={styles.explain}>비밀번호 확인</p>
          <div className={styles.inputDiv}>
            <input
              className={styles.inputField}
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              onBlur={() => handleValidation("passwordConfirmation")}
              type={showPasswordConfirm ? "text" : "password"}
              placeholder="비밀번호를 입력해주세요"
            />
            <button
              type="button"
              onClick={togglePasswordConfirm}
              className={styles.pwdImg}
              style={{
                backgroundImage: `url(${
                  showPasswordConfirm
                    ? "/assets/pw-img-on.svg"
                    : "/assets/pw-img-off.svg"
                })`,
              }}
              aria-label={
                showPasswordConfirm ? "비밀번호 숨기기" : "비밀번호 표시"
              }
            />
          </div>
          {formErrors.passwordConfirmation && (
            <p className={styles.errorText}>
              {formErrors.passwordConfirmation}
            </p>
          )}
        </div>
        {/* 회원가입 버튼 (유효할 때만 활성화 및 배경색 변경) */}
        <div className={styles.submitButton}>
          <button
            type="submit"
            disabled={!isFormValid}
            style={{
              backgroundColor: isFormValid ? "#3692FF" : undefined,
            }}
          >
            회원가입
          </button>
        </div>
      </form>
      {/* 간편 로그인 */}
      <div className={styles.socialLogin}>
        <div className={styles.simpleBox}>
          <p>간편 로그인하기</p>
        </div>
        <div className={styles.simpleImg}>
          <Link
            href="https://www.google.com/"
            passHref
            className={styles.google}
          >
            <Image
              src={"/assets/ic_google.svg"}
              alt="Google login"
              width={42}
              height={42}
            />
          </Link>
          <Link
            href="https://www.kakaocorp.com/page/"
            passHref
            className={styles.kakao}
          >
            <Image
              src={"/assets/ic_kakao.svg"}
              alt="Kakao login"
              width={42}
              height={42}
            />
          </Link>
        </div>
      </div>
      {/* 로그인 링크 */}
      <div className={styles.loginLink}>
        <p>
          이미 회원이신가요? <Link href="/login">로그인</Link>
        </p>
      </div>
      {/* 회원가입 실패 모달 */}
      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <p>회원가입에 실패했습니다. 다시 시도해주세요.</p>
            <button onClick={() => setShowModal(false)}>닫기</button>
          </div>
        </div>
      )}
    </div>
  );
}
