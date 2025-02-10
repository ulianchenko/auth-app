import { getServerSession } from "next-auth/next";
import { hashPassword, verifyPassword } from "../../../lib/auth";
import { connectToDatabase } from "../../../lib/db";
import { authOptions } from "../auth/[...nextauth]";

async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (req.method !== "PATCH") {
    return;
  }

  if (!session) {
    res.status(401).json({ message: "Not authenticated!" });
    return;
  }

  const userEmail = session.user.email;
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;

  const client = await connectToDatabase();

  const userCollection = client.db().collection("users");

  const user = await userCollection.findOne({ email: userEmail });

  if (!user) {
    res.status(404).json({ message: "User not found." });
    client.close();
    return;
  }

  const currentPassword = user.password;
  const passwordsAreEqual = await verifyPassword(oldPassword, currentPassword);

  if (!passwordsAreEqual) {
    res.status(403).json({ message: "Invalid password." });
    client.close();
    return;
  }

  const hashedPassword = await hashPassword(newPassword);

  const result = await userCollection.updateOne(
    { email: userEmail },
    { $set: { password: hashedPassword } }
  );

  client.close();
  res.status(200).json({message: 'Password updated'});
}

export default handler;
