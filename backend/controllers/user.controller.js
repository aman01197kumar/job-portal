import { User } from "../models/user.schema.js";

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
      return res.status(200).json({status:401, message: "fill all the fields" });

    const userData = await User.findOne({ email:email });
    
    console.log(userData,'nk')
    if (userData)
      return res
        .status(200)
        .json({ status: 409, message: "User already exists" });

    const users = new User({
      email,
      first_name: firstName,
      last_name: lastName,
      phone_number: contactNumber,
      password,
      user,
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
  const data = await User.findOne({ email, password });

  if (!data)
    return res.status(400).json({ message: "User not found", status: 400 });

  return res
    .status(200)
    .json({ message: "login successful", status: 200, user: data.user });
};
export { userSignup, userLogin };
