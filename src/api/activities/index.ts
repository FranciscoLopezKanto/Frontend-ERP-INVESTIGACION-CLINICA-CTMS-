import axios from '../axiosInstance';

export const activitiesService = {
    async getActivities() {
        const response = await axios.get('/activities');
        return response.data;
    },

    async getActivityDetails (id: string) {
        try {
            const response = await axios.get(`/activities/${id}/detail`);
            return response.data;
        } catch (error: any) {
            console.error(`❌ Error al obtener detalles de la actividad (${id}):`, error.response?.data || error.message);
            return null;
        }

    }
}