import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import { apiConnector } from "../../api/apiConnector";
import { authEndpoints, profileEndpoints } from "../../api/endpoints";
import toast from "react-hot-toast";

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchLoggedInUser = async () => {
    try {
      const res = await apiConnector("GET", profileEndpoints.MY_PROFILE_API);

      if (res.data.success) {
        setUser(res.data.user);
      }
    } catch (err) {
      // Suppress expected 401 Unauthorized when there's no session yet.
      // Log other unexpected errors for debugging.
      if (err.response?.status && err.response.status !== 401) {
        console.error(err);
      }
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLoggedInUser();
  }, []);

  const signup = async (formData) => {
    const toastId = toast.loading("Signing up..");
    try {
      const res = await apiConnector(
        "POST",
        authEndpoints.SIGNUP_API,
        formData,
      );

      if (!res.data.success) {
        throw new Error(res.data.message);
      }

      toast.success("Signup successful!");
      return true;
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed.");
      return false;
    } finally {
      toast.dismiss(toastId);
    }
  };

  const login = async (formData) => {
    const toastId = toast.loading("Logging in...");
    try {
      const res = await apiConnector("POST", authEndpoints.LOGIN_API, formData);

      if (!res.data.success) {
        throw new Error(res.data.message);
      }

      setUser(res.data.user);
      return true;
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
      return false;
    } finally {
      toast.dismiss(toastId);
    }
  };

  const logout = async () => {
    const toastId = toast.loading("Logging out...");
    try {
      await apiConnector("POST", authEndpoints.LOGOUT_API);
      setUser(null);
      toast.success("Logged out");
      navigate("/auth");
    } catch (err) {
      console.log(err);
      toast.error("Logout failed");
    } finally {
      toast.dismiss(toastId);
    }
  };

  const value = {
    fetchLoggedInUser,
    signup,
    login,
    logout,
    user,
    setUser,
    loading,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
