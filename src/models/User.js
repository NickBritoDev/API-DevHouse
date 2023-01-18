import {Schema, model} from "mongoose";

//criação da tabela de usuario com o campo email para requisição de login
const UserSchema = new Schema({
    email: String,
});

//exportando user e sua respectiva schema
export default model('User', UserSchema);