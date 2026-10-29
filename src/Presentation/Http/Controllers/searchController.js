const { success } = require('../Middlewares/apiResponse');
const SearchGlobalUseCase = require('../../../Application/UseCases/SearchGlobalUseCase');

// Provedor de busca em Mock (Infraestrutura)
class MockSearchProvider {
    async search(query) {
        return { games: [], users: [] };
    }
}

const searchProvider = new MockSearchProvider();
const searchUseCase = new SearchGlobalUseCase(searchProvider);

exports.search = async (req, res) => {
    const query = req.query.q || '';
    let searchResults = { games: [], users: [] };
    
    if (query) {
        searchResults = await searchUseCase.execute(query);
    }
    
    return success(res, { query, ...searchResults });
};
