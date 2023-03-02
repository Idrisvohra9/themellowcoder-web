import axios from "axios";

const url = "https://localhost:5000/users"// Get users
const fetchUsers = () => axios.get(url)
