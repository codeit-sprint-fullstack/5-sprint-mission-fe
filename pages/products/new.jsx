export default function NewProductPage() {
  return (
    <>
      <div className="max-w-screen-xl mx-auto my-10 px-[15px] ">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-xl font-semibold">제품 등록하기</h1>
          <button className="bg-gray-400 text-white px-4 py-2 rounded">
            등록
          </button>
        </div>

        <div className="mb-6">
          <label className="block font-semibold mb-2">*제목</label>
          <textarea
            type="text"
            placeholder="제목을 입력해주세요"
            className="w-full bg-gray-100 p-4 rounded-lg outline-none resize-none"
          />
        </div>

        <div>
          <label className="block font-semibold mb-2">*내용</label>
          <textarea
            placeholder="내용을 입력해주세요"
            className="w-full bg-gray-100 p-4 rounded-lg outline-none h-60 resize-none"
          />
        </div>
      </div>
    </>
  );
}
