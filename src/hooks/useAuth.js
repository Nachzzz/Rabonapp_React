export const isAuthenticated = () => {
    const token = localStorage.getItem("auth_token");
    if (!token) return false;
  
    try {
      const payload = JSON.parse(atob(token.split(".")[1])); // Decodificar el token
      const isExpired = payload.exp * 1000 < Date.now();
      return !isExpired;
    } catch (e) {
      return false;
    }
  };
  

  //commit