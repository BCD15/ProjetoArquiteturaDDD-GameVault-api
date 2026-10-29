class IUserRepository {
    async findByEmail(email) { throw new Error('Método não implementado'); }
    async findByUsername(username) { throw new Error('Método não implementado'); }
    async findByEmailOrUsername(login) { throw new Error('Método não implementado'); }
    async findById(id) { throw new Error('Método não implementado'); }
    async save(userEntity) { throw new Error('Método não implementado'); }
    async update(id, updateData) { throw new Error('Método não implementado'); }
}

module.exports = IUserRepository;
