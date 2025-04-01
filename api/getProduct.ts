import api from "@/utils/axiosInstance";

export default async function getProduct(id : string) {
  const res = await api.get(
    `/products/${id}`
  );
  console.log("product", res);
  return res.data;
}
