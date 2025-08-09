import axios from '../axiosInstance';
import { IComment } from './types';

export const commentsService = {
    async createComment(data: IComment) {
        const response = await axios.post('/comments', data);
        return response.data;
    },

    async getCommentsByActivity(activityId: string) {
        const response = await axios.get(`/comments?activity=${activityId}`);
        return response.data;
    },
}