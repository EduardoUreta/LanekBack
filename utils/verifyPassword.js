import argon2 from 'argon2';

export const verifyPassword = async (providedPassword, storedPassword) => {
    try {
        return await argon2.verify(storedPassword, providedPassword); 
    } catch (error) {
        console.error('Error al verificar la contraseña:', error);
        return false;  
    }
};
