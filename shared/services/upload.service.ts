import api from "./Api";

// 👇 پارامتر isPrivate رو اضافه کردیم با مقدار پیش‌فرض false
export const uploadFile = async (file: File, isPrivate: boolean = false): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);

  // 👇 فقط اگر پرایوت بود، این فیلد رو به فرم‌دیتا اضافه کن
  if (isPrivate) {
    formData.append('isPrivate', 'true');
  }

  try {
    const response = await api.post('/uploads/file', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    });

    console.log("🔥 Raw Response:", response); 

    return response.data.data.id;
  } catch (error) {
    console.error('Upload Error:', error);
    throw error;
  }
};
