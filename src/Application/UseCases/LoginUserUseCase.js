const bcrypt = require('bcryptjs');

class LoginUserUseCase {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async execute(login, password) {
        const user = await this.userRepository.findByEmailOrUsername(login);

        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new Error('E-mail/Usuário ou senha incorretos.');
        }

        return user;
    }
}

module.exports = LoginUserUseCase;
