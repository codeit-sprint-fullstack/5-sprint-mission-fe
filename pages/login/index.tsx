import { useTogglePassword } from "@/hooks/useTogglePassword";
import { useState, useCallback } from "react";
import { useRouter } from "next/router";
import {
  validateEmail,
  validatePassword,
  checkFormValidity,
} from "@/utils/formValidation";
import styles from "@/styles/login.module.css";
import Image from "next/image";
import Link from "next/link";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { showPassword, toggle: togglePassword } = useTogglePassword();
  const [formErrors, setFormErrors] = useState({ email: "", password: "" });
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  // 각 필드의 유효성 결과 객체 생성
  const validationResults = {
    email: email.trim() !== "" && validateEmail(email).isValid,
    password: password.trim() !== "" && validatePassword(password).isValid,
  };

  // checkFormValidity 활용
  const isFormValid = checkFormValidity(validationResults);

  const handleValidation = useCallback(
    (field: "email" | "password") => {
      let result;
      switch (field) {
        case "email":
          result = validateEmail(email);
          break;
        case "password":
          result = validatePassword(password);
          break;
      }
      setFormErrors((prev) => ({ ...prev, [field]: result.errorMessage }));
      return result.isValid;
    },
    [email, password]
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validations = {
      email: handleValidation("email"),
      password: handleValidation("password"),
    };

    if (checkFormValidity(validations)) {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_CODEIT_URL}/auth/signIn`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
          }
        );

        if (res.status === 200) {
          const data = await res.json();
          // accessToken을 localStorage에 저장
          console.log(data);
          localStorage.setItem("accessToken", data.accessToken);
          localStorage.setItem(
            "user",
            JSON.stringify({
              nickname: data.user.nickname,
              profileImg: data.user.image,
            })
          );
          // 로그인 성공 시 /items 페이지로 이동
          router.push("/items");
        } else {
          // 응답 상태 코드가 200이 아니면 로그인 실패
          setShowModal(true);
        }
      } catch (error) {
        setShowModal(true);
      }
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.logoBox}>
        <Link href={"/"}>
          <Image
            src={"/assets/login_logo.svg"}
            alt={"loginPandaImg"}
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

        {/* 로그인 버튼 (유효할 때만 활성화 및 배경색 변경) */}
        <div className={styles.submitButton}>
          <button
            type="submit"
            disabled={!isFormValid}
            style={{
              backgroundColor: isFormValid ? "#3692FF" : undefined,
            }}
          >
            로그인
          </button>
        </div>
      </form>
      <div className={styles.socialLogin}>
        <p>간편 로그인하기</p>
        <div>
          <a
            href="https://www.google.com/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.google}
          >
            <Image
              src={"/assets/ic_google.svg"}
              alt="Google login"
              width={42}
              height={42}
            />
          </a>
          <a
            href="https://www.kakaocorp.com/page/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.kakao}
          >
            <Image
              src={"/assets/ic_kakao.svg"}
              alt="Kakao login"
              width={42}
              height={42}
            />
          </a>
        </div>
      </div>
      {/* 회원가입 버튼 */}
      <div>
        판다마켓이 처음이신가요? <Link href={"/signup"}>회원가입</Link>
      </div>

      {/* 로그인 실패 모달 */}
      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <p>로그인에 실패했습니다. 다시 시도해주세요.</p>
            <button onClick={() => setShowModal(false)}>닫기</button>
          </div>
        </div>
      )}
    </div>
  );
}
