
import sequelize from '@/models/db';

export default async function handler(req, res) {
  await sequelize.sync({ force: true });
  res.status(200).json({ name: "John Doe" });
}
