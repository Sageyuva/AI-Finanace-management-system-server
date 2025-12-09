const { z } = require("zod");

const registervalidationSchema = z.object({
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(6),
})

const loginValidationSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
})

const verifyValidationSchema = z.object({
    userId: z.string(),
    token: z.string(),
})

const forgotValidationSchema = z.object({
    email: z.string().email(),
})

const resetValidationSchema = z.object({
    userId: z.string(),
    token: z.string(),
    password: z.string().min(6),
})
module.exports = {registervalidationSchema,loginValidationSchema,verifyValidationSchema,forgotValidationSchema,resetValidationSchema}