class UpdateUserProfileUseCase {
    constructor(userRepository, imageStorageService) {
        this.userRepository = userRepository;
        this.imageStorageService = imageStorageService;
    }

    async execute(userId, fullName, bio, newProfilePictureFilename) {
        const updateData = { fullName, bio };
        let oldProfilePicture = null;

        if (newProfilePictureFilename) {
            const oldUser = await this.userRepository.findById(userId);
            if (oldUser && oldUser.profilePicture && oldUser.profilePicture !== 'default-profile.png') {
                oldProfilePicture = oldUser.profilePicture;
            }
            updateData.profilePicture = newProfilePictureFilename;
        }

        await this.userRepository.update(userId, updateData);

        if (oldProfilePicture) {
            await this.imageStorageService.deleteProfilePicture(oldProfilePicture);
        }

        return this.userRepository.findById(userId);
    }
}

module.exports = UpdateUserProfileUseCase;
