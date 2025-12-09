const validate = (schema) => (req,res , next)=> {
    try {
        const valdaite = schema.safeParse(req.body)
        if(valdaite.success){
            req.body = valdaite.data
            next()
        }
        else{
            return res.status(400).json({message:"Invalid request"})
        }
    } catch (error) {
        return res.status(500).json({message:"Internal server error"})
    }
}

module.exports = validate