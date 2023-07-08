import { shuffle } from 'lodash';

const parseReponse = (response) => {
    const {
        messages,
        suggestions: { search_terms, show }
    } = response;
    const allProducts = Object.values(search_terms).map((term) => term.products);

    const formattedResponse = {
        message: messages,
        searchTermMap: search_terms,
        products: shuffle(allProducts.flat()),
        show
    };

    return formattedResponse;
};

export default parseReponse;
