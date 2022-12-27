import type { NextApiRequest, NextApiResponse } from 'next'
import {prisma} from '../../../server/db/client'
import cuid from 'cuid';
import bcrypt from "bcrypt";

// POST /api/post
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const { name, email, password } = req.body
  const hashedPassword = await bcrypt.hash(password, 10);
  const result = await prisma.user.create({
    data: {
        id: cuid(),
        name: name,
        email: email,
        password: hashedPassword,

    },
  })
  res.json(result)
}