import {z} from "zod";
import bcrypt from "bcrypt";
import {router, publicProcedure} from "../trpc";

export const UserRouter = router({
    createUser: publicProcedure
        .input(z.object({name: z.string(), email: z.string(), password: z.string()}))
        .query(async ({input, ctx}) => {
            const hashedPassword = await bcrypt.hash(input.password, 10);
            const user = await ctx.prisma.user.create({
                data: {
                    name: input.name,
                    email: input.email,
                    password: hashedPassword,
                },
            });
            return user;
        }
    ),
});