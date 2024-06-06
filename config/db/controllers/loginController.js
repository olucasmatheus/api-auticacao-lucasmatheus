const e = require('express');
const secretKey = require('./../../../jwt/autentication');
exports.loginUser = async (req, res) => {
    const {username, password} = req.body;

    try {
        const user = await User.findOne({username: username});
        const SenhaCorreta = await bcrypt.compare(password, user.password);
        if(!user){
            return res.status(404).send("Usuário não encontrado");
        }
        if(!SenhaCorreta){
            return res.status(400).send("Senha incorreta");
        }

        if(user && SenhaCorreta){
            const tokenAutenticacao = jwt.sign(
                {
                userId: user._id,
                },
                secretKey,
                {
                    expiresIn: 300,
                }
            );
            res.json({
            message: `Autenticado como ${username}!`,
            auth: true,
            tokenAutenticacao
            })
        }
    } catch (err) {
        return res.status(403).json({message: "Erro ao autenticar. Senha ou usuário incorretos."});
    }
}