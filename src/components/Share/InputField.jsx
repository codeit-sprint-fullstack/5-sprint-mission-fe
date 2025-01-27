const InputField = ({
  title,
  type,
  placeholder,
  value,
  setKeyword,
  error,
  px,
  py,
  h,
  onKeyPress,
}) => {
  const isTextarea = h ? true : false;
  return (
    <div className="w-full flex flex-col gap-4">
      <h2 className="text-xl font-bold text-gray-900">{title}</h2>
      <div className="w-full">
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyPress={onKeyPress}
          className={`w-full flex rounded-lg bg-gray-100 text-gray-600 placeholder-gray-400 focus:outline-none 
            ${px ? `px-${px}` : ""} 
            ${py ? `py-${py}` : ""}
            ${h ? `h-[${h}]` : ""}
            ${error ? "border-2 border-red-500" : ""}
             ${isTextarea ? "align-text-top" : ""}`}
          style={h ? { height: h, paddingTop: "1rem" } : {}}
        />
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};
export default InputField;
