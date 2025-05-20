import usersModel from "../../../models/users";
import ConnectToDB from "../../../utils/db";
import {hashPassword} from '../../../utils/auth'
const handler = async (req, res) => {
  if (req.method !== "POST") {
    return false;
  }

  try {
    ConnectToDB();
    const { name, lastName, userName, email, password } = req.body;

    if (
      !name.trim() ||
      !lastName.trim() ||
      !userName.trim() ||
      !email.trim() ||
      !password.trim()
    ) {
      return res.status(422).json({ message: "Data is not valid !!" });
    }

    const isUserExist = await usersModel.findOne({
      $or: [{ userName }, { email }],
    });
    if (isUserExist) {
      return res.status(422).json({ message: "user already exist" });
    } else {
      const hashedPassword = await hashPassword(password);
      const user = await usersModel.create({
        name,
        lastName,
        userName,
        email,
        hashedPassword,
        role: "USER",
      });
      return res
        .status(201)
        .json({ message: "user created Successfully", user });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "UnKnown Internal Server Erorr !!" });
  }
};
export default handler;
