import api from "./Api";


export const uploadFile = async (file: File, isPrivate: boolean = false): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);


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
