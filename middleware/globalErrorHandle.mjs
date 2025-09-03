export default function globalErr(error,req,res,next){
    res.status(500).send(error.message);

}