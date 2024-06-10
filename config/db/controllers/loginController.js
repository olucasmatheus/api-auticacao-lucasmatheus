const e = require('express');
const secretKey = require('./../../../jwt/autentication');
exports.loginUser = async (req, res) => {
    const {email, password} = req.body;

    try {
        console.log("encontrando user");
        // Verificar se o usuário existe
        const user = await User.findOne({email: email});
        // Verificar se a senha está correta
        console.log("usuario encontrado");
        
        if(!user){
            return res.status(404).send("Usuário não encontrado");
        }
        console.log("verificando senha");
        const SenhaCorreta = await bcrypt.compare(password, user.password);
        if(!SenhaCorreta){
            return res.status(400).send("Senha incorreta");
        }
        // Gerar token de autenticação
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
            message: `Autenticado como ${email}!`,
            auth: true,
            tokenAutenticacao
            })
        }
    } catch (err) {
        return res.status(403).json({message: "Erro ao autenticar. Senha, email ou CPF incorretos."});
    }
}