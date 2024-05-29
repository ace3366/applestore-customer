import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element }) => {
  const [loaded, setLoaded] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  // Nếu đã đăng nhập thì sẽ vào route, còn không sẽ bị navigate tới /login
  useEffect(() => {
    const checkAuth = async () => {
      try {
        setLoaded(false);
        const response = await fetch(
          `${process.env.REACT_APP_API}/check-auth`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        if (!response.ok) {
          throw new Error("Can not get auth");
        }
        const resData = await response.json();
        setLoaded(true);
        return resData.isAuth;
      } catch (err) {
        console.log(err);
      }
    };
    const verifyAuth = async () => {
      const auth = await checkAuth();
      setIsAuthenticated(auth);
    };
    verifyAuth();
  }, []);

  if (isAuthenticated === null) {
    return <div className="text-center h-screen">Loading...</div>;
  }

  return isAuthenticated ? element : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
