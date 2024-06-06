exports.deleteUser = async (req, res) => {
    try{
        const user = await User.findByIdAndDelete(req.params.id);
        if(!user) res.status(404).send("Nenhum usuário encontrado");
            res.status(200).send("Usuário deletado com sucesso");
        } catch (error) {
            res.status(500).send(err);
    }
}