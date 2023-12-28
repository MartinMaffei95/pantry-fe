import axios, { AxiosError } from "axios";

export default class ProductService {
  async getAllProducts() {
    try {
      const request = await axios({
        baseURL: `${import.meta.env.VITE_BASE_URL}/product`,
        method: "GET",
      });

      console.log(request.data);
      return request.data;
    } catch (error: any | AxiosError) {
      console.error(error);
      throw new Error("ROMPIDO");
    }
  }
}
