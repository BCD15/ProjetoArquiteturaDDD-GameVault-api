const IUserRepository = require('../../Domain/Repositories/IUserRepository');
const UserModel = require('../Database/userModel');
const { Op } = require('sequelize');

class UserRepositoryMySQL extends IUserRepository {
    async findByEmail(email) {
        return await UserModel.findOne({ where: { email } });
    }
    
    async findByUsername(username) {
        return await UserModel.findOne({ where: { username } });
    }
    
    async findByEmailOrUsername(login) {
        return await UserModel.findOne({
            where: {
                [Op.or]: [{ email: login }, { username: login }]
            }
        });
    }
    
    async findById(id) {
        return await UserModel.findByPk(id, {
            attributes: ['id', 'username', 'email', 'fullName', 'bio', 'profilePicture', 'followersCount', 'followingCount', 'gamesCount', 'isAdmin']
        });
    }
    
    async save(userData) {
        return await UserModel.create(userData);
    }
    
    async update(id, updateData) {
        await UserModel.update(updateData, { where: { id } });
    }
}

module.exports = UserRepositoryMySQL;
