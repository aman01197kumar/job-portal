import { User } from "../models/user.schema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const userSignup = async (req, res) => {
  try {
    const { firstName, lastName, email, password, contactNumber, user } =
      req.body;

    if (
      !email ||
      !firstName ||
      !lastName ||
      !contactNumber ||
      !password ||
      !user
    )
      return res
        .status(200)
        .json({ status: 401, message: "fill all the fields" });

    const userData = await User.findOne({ email: email });

    if (userData)
      return res
        .status(200)
        .json({ status: 409, message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const users = new User({
      email: email,
      first_name: firstName,
      last_name: lastName,
      phone_number: contactNumber,
      password: hashedPassword,
      user: user,
    });

    await users.save();
    return res
      .status(200)
      .json({ status: 200, message: "Data saved successfully", users });
  } catch (err) {
    console.error("Signup error:", err);
    return res
      .status(500)
      .json({ status: 500, message: "Internal server error" });
  }
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res
      .status(200)
      .json({ message: "Fill all the details", status: 400 });
  const user = await User.findOne({ email });

  if (!user)
    return res.status(200).json({ message: "User not found", status: 404 });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch)
    return res.status(200).json({ message: "Incorrect password", status: 401 });

  const token = await jwt.sign(
    { userid: user._id, username: user.first_name },
    process.env.SECRET_KEY
  );

  return res.status(200).json({
    message: "login successful",
    status: 200,
    user: user.user,
    userId: user._id,
    token: token,
  });
};
export { userSignup, userLogin };
