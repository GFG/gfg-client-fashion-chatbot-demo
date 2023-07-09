import { shuffle } from "lodash";

const getUniqueProducts = (products) => {
  const isExisted = {};
  const uniqueProducts = [];
  products.forEach((product) => {
    if (!isExisted[product.ConfigSku]) {
      isExisted[product.ConfigSku] = true;
      uniqueProducts.push(product);
    }
  });

  return uniqueProducts;
};

const parseReponse = (response) => {
  const {
    messages,
    suggestions: { search_terms, show },
  } = response;
  const allProducts = Object.values(search_terms)
    .map((term) => term.products)
    .flat();
  const formattedResponse = {
    message: messages,
    searchTermMap: search_terms,
    products: shuffle(getUniqueProducts(allProducts)),
    show,
  };

  return formattedResponse;
};

export default parseReponse;
