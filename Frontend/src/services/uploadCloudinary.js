export const uploadToCloudinary = async (file) => {
  if (!file) {
    console.error("Không có file nào được chọn để upload.");
    return null;
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "PoliticalTheory"); // ✅ Thay bằng preset thật của bạn

  try {
    const response = await fetch(
      "https://api.cloudinary.com/v1_1/doyjostnc/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error(`Lỗi HTTP: ${response.status}`);
    }

    const data = await response.json();

    if (data.secure_url) {
      return data.secure_url;
    } else {
      console.error("Upload thành công nhưng không có secure_url:", data);
      return null;
    }

  } catch (error) {
    console.error("Lỗi khi upload ảnh lên Cloudinary:", error);
    return null;
  }
};
