import React, { useState } from "react";
import axios from "axios";

const ImageUploader = ({ onUpload }) => {
  const [file, setFile] = useState(null); // 선택한 파일
  const [uploading, setUploading] = useState(false); // 업로드 상태
  const [imageUrl, setImageUrl] = useState(""); // 업로드된 URL

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("이미지를 선택하세요!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploading(true);
      const response = await axios.post(
        "https://panda-market-api.vercel.app/images/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const url = response.data.url; // 업로드된 이미지의 URL
      setImageUrl(url);
      onUpload(url); // 부모 컴포넌트로 URL 전달
      alert("이미지 업로드 성공!");
    } catch (error) {
      console.error("이미지 업로드 실패:", error);
      alert("이미지 업로드 실패");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={uploading}>
        {uploading ? "업로드 중..." : "이미지 업로드"}
      </button>
      {imageUrl && (
        <div>
          <p>업로드된 이미지:</p>
          <img src={imageUrl} alt="Uploaded" style={{ maxWidth: "200px" }} />
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
