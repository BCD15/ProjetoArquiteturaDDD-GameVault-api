class GetUserProfileUseCase {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async execute(userId) {
        const user = await this.userRepository.findById(userId);

        if (!user) {
            throw new Error('Usuário não encontrado.');
        }

        return user;
    }
}

module.exports = GetUserProfileUseCase;
