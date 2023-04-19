import axios from 'axios';
export const sendOtp = async (email) => {
    const response = await axios.post("http://localhost:5000/sendemail/verify", { email });
    return response.data;
}

export const welcomeMail = async (email, name) => {
    const response = await axios.post("http://localhost:5000/sendemail/welcome", { email, name });
    return response.status;
}
