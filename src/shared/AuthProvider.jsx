import { useState, useEffect, createContext, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Add isLoading state
  const navigate = useNavigate();

  axios.interceptors.request.use(
    (config) => {
      //get base url from .env file
      // config.baseURL = process.env.REACT_APP_API_URL;
      const token = localStorage.getItem("token");
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Sử dụng axios interceptor để xử lý các response lỗi
  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 401 || error.response.status === 403) {
        // Xóa JWT token khỏi localStorage và cập nhật trạng thái đăng nhập
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        // Chuyển hướnguser đến trang đăng nhập
        navigate("/login");
      }
      return Promise.reject(error);
    }
  );

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        setIsAuthenticated(true);

        // Wait for fetchInfo to complete before setting user state
        await fetchInfo();
      }

      // Set isLoading to false when authentication state is updated
      setIsLoading(false);
    };

    fetchUser();
  }, []);

  const login = async (username, password) => {
    console.log("=>>> login");
    try {
      const response = await axios.post("api/public/login", {
        username,
        password,
      });
      // console.log(response.data.data.jwt);
      if(response.data != null && response.data != undefined && response.data.code == 200){
        localStorage.setItem("token", response.data.data.jwt);
        axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.data.jwt}`;
        setIsAuthenticated(true);
        setUser(response.data.data);
        navigate("/");
      }
      else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const register = async (username, password, confirmPassword, fullname) => {
    const response = await axios.post("api/public/register", {
      username,
      password,
      confirmPassword,
      fullname
    });
    if(response.data != null && response.data != undefined && response.data.code == 200){
      toast.success("Register success!");
      //sleep 3s
      await new Promise(r => setTimeout(r, 3000));
      navigate("/login");
    }
    else if(response.data != null && response.data != undefined && response.data.code == 400){
      toast.error(response.data.message);
    }
  }

  const logout = () => {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
    setIsAuthenticated(false);
    navigate("/login");
  };

  const fetchInfo = async () => {
    try {
      const response = await axios.get("api/me");
      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };



  return (
    <AuthContext.Provider value={{ isAuthenticated,user,isLoading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}