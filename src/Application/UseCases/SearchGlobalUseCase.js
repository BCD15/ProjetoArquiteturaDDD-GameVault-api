class SearchGlobalUseCase {
    constructor(searchProvider) {
        this.searchProvider = searchProvider;
    }

    async execute(query) {
        return this.searchProvider.search(query);
    }
}

module.exports = SearchGlobalUseCase;
