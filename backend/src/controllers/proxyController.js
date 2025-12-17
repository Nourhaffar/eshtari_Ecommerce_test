import { fetchFromLaravel } from '../services/laravelService.js';


export const getHomeData = async (req, res, next) => {
    try {
        const response = await fetchFromLaravel();
        const widgets = response.data || [];
        const e_widgets = widgets.map((widget) => {
            if (widget.type === 'banner' && widget.display === 'slider') {
                if (Array.isArray(widget.banner_images) && widget.banner_images.length === 1) {
                    const img0 = widget.banner_images[0];
                    return {
                        ...widget,
                        banner_images: Array.from(
                            { length: 6 },
                            () => ({ ...img0 })
                        )
                    };
                }
            }
            if (widget.type === 'banner' && widget.display === 'grid') {
                return {
                    ...widget,
                    banner_images: Array.isArray(widget.banner_images)
                        ? widget.banner_images.flatMap(img => [{ ...img }, { ...img }])
                        : []
                };
            }
            return widget;
        });
        res.json({
            success: true,
            data: e_widgets
        });
    } catch (error) {
        console.error('Error in getHomeData:', error);
        next(error);
    }
};
