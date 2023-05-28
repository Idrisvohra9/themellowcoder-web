import axios from 'axios';
export const sendOtp = async (email) => {
    const response = await axios.post(`${process.env.REACT_APP_SERVER}sendemail/verify`, { email });
    return response.data;
}

export const welcomeMail = async (email, name) => {
    const response = await axios.post(`${process.env.REACT_APP_SERVER}sendemail/welcome`, { email, name });
    return response.status;
}

export const emailVerify = async (email, name) => {
    const response = await axios.post(`${process.env.REACT_APP_SERVER}sendemail/verify`, { email, name });
    return response.data;
}