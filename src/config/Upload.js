import multer from "multer";
import path from "path";

export default{
    //armazena a imagem enviada
    storage: multer.diskStorage({
        //destina o arquivo para a pasta "uploads" usando o path
        destination: path.resolve(__dirname, '..', '..', 'uploads'),
        filename: (req, file, callback) => {
            //captura a extensão da imagem
            const ext = path.extname(file.originalname)
            //captura o nome da imagem
            const name =  path.basename(file.originalname, ext)
            //passa os parametros do arquivo para a função de callback
            callback(null, `${name}-${Date.now()}${ext}`)
        },
    })
}