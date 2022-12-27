
import { router } from "../trpc";
import { authRouter } from "./auth";
import { exampleRouter } from "./example";
import { UserRouter } from "./createUser";

export const appRouter = router({
  example: exampleRouter,
  auth: authRouter,
  user: UserRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
