function logRequest(req,res,next){
    console.log(`request received: ${req.method} ${req.url}`)
    next();
}

module.exports = logRequest;