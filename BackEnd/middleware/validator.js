const validatorUser=(req, res, next)=>{
    const {email, password}=req.body;

    const emailRegex= /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex= /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

    if(!emailRegex.test(email) || !passwordRegex.test(password)){
        return res.status(400).json({message:"Email ou mot de passe invalide."});
    }

    next();
    //Test verifie si la valeur de l'email ou mot de passe corresponde aux models definit
}
module.exports = validatorUser;