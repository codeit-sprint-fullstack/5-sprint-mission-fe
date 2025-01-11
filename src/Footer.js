const Footer = () => {
  return (
    <footer className="bg-[#1C1C1C] h-[160px]">
      <div className="max-w-[1520px] mx-auto h-full px-6">
        <div className="pt-8 flex items-center justify-between ">
          <div>
            <p className="text-gray-300">©codeit - 2024</p>
          </div>
          <div className="flex gap-8">
            <a href="/privacy" className="text-gray-300 hover:text-white">
              Privacy Policy
            </a>
            <a href="/faq" className="text-gray-300 hover:text-white">
              FAQ
            </a>
          </div>
          {/* sns asset 추가 */}
          <div className="flex gap-4">
            <button className="w-8 h-8 rounded-full border border-gray-300 text-gray-300 hover:text-white hover:border-white flex items-center justify-center">
              f
            </button>
            <button className="w-8 h-8 rounded-full border border-gray-300 text-gray-300 hover:text-white hover:border-white flex items-center justify-center">
              t
            </button>
            <button className="w-8 h-8 rounded-full border border-gray-300 text-gray-300 hover:text-white hover:border-white flex items-center justify-center">
              y
            </button>
            <button className="w-8 h-8 rounded-full border border-gray-300 text-gray-300 hover:text-white hover:border-white flex items-center justify-center">
              i
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
