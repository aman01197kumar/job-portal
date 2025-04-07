import { User } from "../models/user.schema.js";

const userSignup = async (req, res) => {
  const { firstName, lastName, email, password, contactNumber } = req.body;

  if (!email || !firstName || !lastName || !contactNumber || !password || !user)
    return res.status(401).json({ message: "fill all the fields" });

  const user = new User({
    email: email,
    first_name: firstName,
    last_name: lastName,
    phone_number: contactNumber,
    password: password,
  });

  await user.save();
  return res
    .status(200)
    .json({ status: 200, message: "Data saved successfully", user });
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  const data = await User.findOne({ email, password });

  if (!data)
    return res.status(400).json({ message: "User not found", status: 400 });

  return res.status(200).json({ message: "login successful", status: 200 });
};
export { userSignup, userLogin };
