const LoginButton = ({ onClick }) => {
  return (
    <button
      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500"
      onClick={onClick}
    >
      로그인
    </button>
  );
};

export default LoginButton;
