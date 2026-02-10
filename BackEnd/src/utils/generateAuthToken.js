import jwt from "jsonwebtoken";

const generateAuthToken = (userId) => {
    const secret = process.env.JWT_SECRET;

    if (!secret) {
        throw new Error("JWT_SECRET is missing in .env");
    }

    return jwt.sign({ id: userId }, secret, {
        expiresIn: "7d",
    });
};

export default generateAuthToken;
