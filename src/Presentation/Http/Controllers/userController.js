const { generateToken } = require('../../../../config/jwt');
const { success } = require('../Middlewares/apiResponse');

// Infraestrutura
const UserRepositoryMySQL = require('../../../Infrastructure/Repositories/UserRepositoryMySQL');
const LocalImageStorage = require('../../../Infrastructure/Storage/LocalImageStorage');

// Casos de Uso
const RegisterUserUseCase = require('../../../Application/UseCases/RegisterUserUseCase');
const LoginUserUseCase = require('../../../Application/UseCases/LoginUserUseCase');
const GetUserProfileUseCase = require('../../../Application/UseCases/GetUserProfileUseCase');
const GetPublicProfileUseCase = require('../../../Application/UseCases/GetPublicProfileUseCase');
const UpdateUserProfileUseCase = require('../../../Application/UseCases/UpdateUserProfileUseCase');

// Injeção de Dependências
const userRepository = new UserRepositoryMySQL();
const imageStorage = new LocalImageStorage();

const registerUseCase = new RegisterUserUseCase(userRepository);
const loginUseCase = new LoginUserUseCase(userRepository);
const getMyProfileUseCase = new GetUserProfileUseCase(userRepository);
const getPublicProfileUseCase = new GetPublicProfileUseCase(userRepository);
const updateProfileUseCase = new UpdateUserProfileUseCase(userRepository, imageStorage);

exports.register = async (req, res) => {
    const { username, email, password, fullName } = req.body;
    const newUser = await registerUseCase.execute(username, email, password, fullName);
    return success(res, newUser, 'Conta criada com sucesso! Faça login para continuar.', 201);
};

exports.login = async (req, res) => {
    const { login, password } = req.body;
    const user = await loginUseCase.execute(login, password);
    const userData = await getMyProfileUseCase.execute(user.id);
    
    const token = generateToken({
        id: userData.id,
        username: userData.username,
        isAdmin: userData.isAdmin
    });
    
    return success(res, { token, user: userData }, `Bem-vindo de volta, ${userData.username}!`);
};

exports.logout = (req, res) => {
    return success(res, null, 'Logout realizado com sucesso.');
};

exports.getMyProfile = async (req, res) => {
    const userData = await getMyProfileUseCase.execute(req.user.id);
    return success(res, userData);
};

exports.getPublicProfile = async (req, res) => {
    const user = await getPublicProfileUseCase.execute(req.params.username);
    return success(res, user);
};

exports.updateProfile = async (req, res) => {
    const { fullName, bio } = req.body;
    const userId = req.user.id;
    const newProfilePictureFilename = req.file ? req.file.filename : null;
    
    const updatedUser = await updateProfileUseCase.execute(userId, fullName, bio, newProfilePictureFilename);
    return success(res, updatedUser, 'Perfil atualizado com sucesso!');
};
