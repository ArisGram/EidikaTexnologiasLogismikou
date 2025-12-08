import bcrypt from "bcrypt";

class UserService {
  constructor(userModel) {
    this.userModel = userModel;
  }

  async register(fullName, email, password) {
    const exists = await this.userModel.findOne({ where: { email } });
    if (exists) throw new Error("Email already exists");

    const hashed = await bcrypt.hash(password, 10);

    return this.userModel.create({
      fullName,
      email,
      password: hashed,
      role: 'customer'
    });
  }

  async login(email, password) {
    const user = await this.userModel.findOne({ where: { email } });
    if (!user) throw new Error("Invalid credentials");

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new Error("Invalid credentials");

    return user;
  }
}

export default UserService;