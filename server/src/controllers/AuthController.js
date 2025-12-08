import jwt from "jsonwebtoken";

class AuthController {
  constructor(userService) {
    this.userService = userService;
  }

  register = async (req, res) => {
    try {
      const { fullName, email, password } = req.body;
      const user = await this.userService.register(fullName, email, password);
      return res.status(201).json({ message: "User created", userId: user.id });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  };

  login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await this.userService.login(email, password);

      const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET || 'secretkey',
        { expiresIn: "1h" }
      );

      res.json({ token, role: user.role });
    } catch (err) {
      return res.status(401).json({ error: err.message });
    }
  };
}

export default AuthController;