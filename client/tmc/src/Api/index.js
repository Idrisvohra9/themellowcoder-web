import axios from "axios";

const url = "https://localhost:5000/users"// Get users
export const fetchUsers = () => axios.get(url)
