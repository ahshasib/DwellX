import axios from "axios";


export const imageUpload = async(imageData) =>{
    const formData = new FormData();
    formData.append("image", imageData);

    const imgbbApiKey = import.meta.env.VITE_IMGBB_API_KEY;
    const response = await axios.post(
      `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
      formData
    );

    return response?.data.data.url;
}

// save or update user in db
export const saveUserDB = async user =>{
  const {data} = await axios.post(`${import.meta.env.VITE_API_URL}/user`,
    user
  )
}