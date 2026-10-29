class GetPublicProfileUseCase {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async execute(username) {
        const user = await this.userRepository.findByUsername(username);

        if (!user) {
            const error = new Error('Usuário não encontrado.');
            error.status = 404;
            throw error;
        }

        return {
            id: user.id,
            username: user.username,
            fullName: user.fullName,
            bio: user.bio,
            profilePicture: user.profilePicture,
            followersCount: user.followersCount,
            followingCount: user.followingCount,
            gamesCount: user.gamesCount
        };
    }
}

module.exports = GetPublicProfileUseCase;
