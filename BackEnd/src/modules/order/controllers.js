import Order from './models.js';
import path from 'path';

export const createOrderController = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            phone,
            country,
            address,
            serviceName,
            packagePrice,
            cardNumber,
            cardName,
            expiryDate,
            cvv
        } = req.body;

        // Validate required fields
        const requiredFields = [
            firstName, lastName, email, phone, country, 
            address, serviceName, packagePrice, 
            cardNumber, cardName, expiryDate, cvv
        ];

        if (requiredFields.some(field => !field)) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }

        let priceProofFile = null;
        
        // Handle file upload if present
        if (req.files && req.files.priceProofFile) {
            const file = req.files.priceProofFile;
            const fileName = `${Date.now()}_${file.name}`;
            const uploadPath = path.join(process.cwd(), 'uploads', fileName);
            
            // Create uploads directory if it doesn't exist
            const fs = await import('fs');
            if (!fs.existsSync(path.join(process.cwd(), 'uploads'))) {
                fs.mkdirSync(path.join(process.cwd(), 'uploads'), { recursive: true });
            }
            
            // Move file to uploads directory
            await file.mv(uploadPath);
            priceProofFile = `/uploads/${fileName}`;
        }

        const newOrder = new Order({
            firstName,
            lastName,
            email,
            phone,
            country,
            address,
            serviceName,
            packagePrice: parseFloat(packagePrice),
            priceProofFile,
            cardNumber,
            cardName,
            expiryDate,
            cvv
        });

        await newOrder.save();

        res.status(201).json({
            success: true,
            message: 'Order submitted successfully',
            data: newOrder
        });
    } catch (error) {
        console.error('Error in createOrderController:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

export const getAllOrdersController = async (req, res) => {
    try {
        const { page = 1, limit = 10, startDate, endDate, search } = req.query;
        
        const filter = {};
        
        if (startDate || endDate) {
            filter.createdAt = {};
            if (startDate) filter.createdAt.$gte = new Date(startDate);
            if (endDate) filter.createdAt.$lte = new Date(endDate);
        }
        
        if (search) {
            filter.$or = [
                { firstName: { $regex: search, $options: 'i' } },
                { lastName: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } },
                { serviceName: { $regex: search, $options: 'i' } }
            ];
        }

        const orders = await Order.find(filter)
            .sort({ createdAt: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit);

        const total = await Order.countDocuments(filter);

        res.status(200).json({
            success: true,
            data: orders,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total,
                pages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        console.error('Error in getAllOrdersController:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};
