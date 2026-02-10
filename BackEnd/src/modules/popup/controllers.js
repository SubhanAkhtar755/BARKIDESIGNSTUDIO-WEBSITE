import Popup from './models.js';

export const createPopupController = async (req, res) => {
    try {
        const { email, message } = req.body;

        if (!email || !message) {
            return res.status(400).json({
                success: false,
                message: 'Email and message are required'
            });
        }

        // Create new popup submission
        const newPopup = new Popup({
            email,
            message
        });

        await newPopup.save();

        res.status(201).json({
            success: true,
            message: 'Popup submission saved successfully',
            data: newPopup
        });
    } catch (error) {
        console.error('Error in createPopupController:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

export const getAllPopupsController = async (req, res) => {
    try {
        const { page = 1, limit = 10, startDate, endDate, search } = req.query;
        
        const filter = { isActive: true };
        
        if (startDate || endDate) {
            filter.createdAt = {};
            if (startDate) filter.createdAt.$gte = new Date(startDate);
            if (endDate) filter.createdAt.$lte = new Date(endDate);
        }
        
        if (search) {
            filter.$or = [
                { email: { $regex: search, $options: 'i' } },
                { message: { $regex: search, $options: 'i' } }
            ];
        }

        const popups = await Popup.find(filter)
            .sort({ createdAt: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit);

        const total = await Popup.countDocuments(filter);

        res.status(200).json({
            success: true,
            data: popups,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total,
                pages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        console.error('Error in getAllPopupsController:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};
