// const baseUrl = process.env.API || " https://nhom-xanh-1.herokuapp.com";
const baseUrl = "http://localhost:8000";
export const api = `${baseUrl}/api`;

export const generatePublicUrl = (fileName) => {
  return `${baseUrl}/public/${fileName}`;
};
