// Función para obtener la IP del cliente
function getClientIp(req) {
    return req.socket.remoteAddress;
}

module.exports = { getClientIp };
