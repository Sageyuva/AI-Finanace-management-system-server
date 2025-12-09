const { z } = require("zod");

const registervalidationSchema = z.object({
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(6),
})

module.exports = {registervalidationSchema}