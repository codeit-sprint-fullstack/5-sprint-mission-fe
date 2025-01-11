import logoImage from "../../assets/logo.png";

const Logo = () => {
  return (
    <div className="flex items-center">
      <img src={logoImage} alt="로고 이미지" className="h-8 w-8" />
      {/* 이미지로 바꿔야 함 */}
      <span className="ml-2 text-lg font-bold text-blue-600">판다마켓</span>
    </div>
  );
};

export default Logo;
