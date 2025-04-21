// middleware/authMiddleware.js
export const mockAuth = (req, res, next) => {
    // Fake user added to request (for now)
    req.user = { role: "doctor", email: "meena.sharma@example.com" };
    next();
  };
  