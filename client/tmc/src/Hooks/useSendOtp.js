import axios from 'axios';
const sendOtp = async (email) => {
    let otp;
    const response = await axios.post("http://localhost:5000/sendemail/verify", { email }).then((response) => { });
    return response.data;
}
export default sendOtp;