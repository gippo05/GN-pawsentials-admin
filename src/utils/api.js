

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";


//Endpoints

const API = {
      PRODUCTS: `${BASE_URL}/api/products`,
      TOTALORDERS: `${BASE_URL}/api/dashboard`,
      TOTALREVENUE: `${BASE_URL}/api/dashboard/totalsales`,
      ORDERS: `${BASE_URL}/api/orders`,
      ADMINLOGIN: `${BASE_URL}/api/admin/login`
}

export default API;
export {BASE_URL};
