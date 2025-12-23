const BASE_URL = "http://10.0.2.2:8080";

export const fetchProducts = async () => {
  const response = await fetch(`${BASE_URL}/api/products`);
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  return response.json();
};

export const createProduct = async(product)=>{
  const response = await fetch(`${BASE_URL}/api/products`,{
    method:'POST',
    headers:{
      "Content-Type":"application/json",
    },
    body:JSON.stringify(product),
  });

  if (!response.ok) {
    throw new Error("Failed to create product");
  }

  return response.json();
}