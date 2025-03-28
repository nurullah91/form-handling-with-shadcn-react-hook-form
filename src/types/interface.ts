import { Resolver } from "react-hook-form";
import { z, ZodSchema } from "zod";

export type ZodResolver<T extends ZodSchema> = Resolver<z.infer<T>, T>;
