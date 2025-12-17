import { fetchFromLaravel } from '../services/laravelService.js';

export const getHomeData = async (req, res, next) => {
    try {
        const response = await fetchFromLaravel(); 
        const widgets = response.data || [];
        res.json({
            success: true,
            data: widgets
        });
    } catch (error) {
        console.error('Error in getHomeData:', error);
        next(error);
    }
};
