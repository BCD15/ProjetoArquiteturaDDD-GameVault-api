const bcrypt = require('bcryptjs');

class RegisterUserUseCase {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async execute(username, email, password, fullName) {
        const emailExists = await this.userRepository.findByEmail(email);
        const usernameExists = await this.userRepository.findByUsername(username);

        if (emailExists || usernameExists) {
            throw new Error('Este e-mail ou usuário já está cadastrado.');
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await this.userRepository.save({
            username,
            email,
            password: hashedPassword,
            fullName
        });

        return {
            id: newUser.id,
            username: newUser.username,
            email: newUser.email
        };
    }
}

module.exports = RegisterUserUseCase;
