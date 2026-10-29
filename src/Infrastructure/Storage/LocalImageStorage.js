const fs = require('fs');
const path = require('path');

class LocalImageStorage {
    async deleteProfilePicture(filename) {
        if (!filename || filename === 'default-profile.png') return;
        
        // Caminho relativo à raiz do projeto (ajuste se necessário)
        const filePath = path.join(__dirname, '../../../../public/uploads/profiles', filename);
        
        fs.unlink(filePath, (err) => {
            if (err) console.error('Erro ao apagar foto de perfil antiga:', err);
            else console.log('Foto de perfil antiga apagada:', filePath);
        });
    }
}

module.exports = LocalImageStorage;
