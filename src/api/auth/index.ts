import axios from '../axiosInstance';
import { IAuthPasswordContext, IAuthRegisterContext, IResetPassword } from './types';

export const authService = {
    async register (registerData: IAuthRegisterContext): Promise<string> {
        const response = await axios.post('/auth/register', registerData);
        return response.data;
    },
    
    async changePassword(updateData: IAuthPasswordContext): Promise<string> {
        const response = await axios.post('/auth/change-password', updateData);
        return response.data;
    },

    async requestChangePassword(email: string): Promise<string> {
        const response = await axios.post('/auth/request-password-change', { email });
        return response.data;
    },

    async verifyEmail(token: string): Promise<string> {
        const response = await axios.get(`/auth/verify-email?token=${token}`);
        return response.data;
    },

    async recoverPassword(email: string): Promise<string> {
        const response = await axios.post('/auth/recover-password', { email });
        return response.data;
    },

    async resetPassword(updateData: IResetPassword): Promise<string> {
        const response = await axios.post('/auth/reset-password', updateData);
        return response.data;
    },
}

