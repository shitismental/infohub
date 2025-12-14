import API from "../services/api";

export const useCheckCode = () => {

  const checkCode = async (passedCode) => {
    try {
      const response = await API.post("/codes/activate/", { code: passedCode });
      return response.data;
    } catch (err) {
      throw err;
    }
  };

  return { checkCode };
};