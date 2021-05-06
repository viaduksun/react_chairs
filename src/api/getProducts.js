const getProducts = async () => {
  const response = await fetch("./products.json");
  const productCards = await response.json();
  return productCards;
};

export default getProducts;
