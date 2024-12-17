class Message {
    constructor(usuario, mensaje) {
        this.usuario = usuario;
        this.mensaje = mensaje;
    }

    // Convertir el objeto Message a un mapa
    toMap() {
        return {
            usuario: this.usuario,
            mensaje: this.mensaje
        };
    }

    // Convertir el objeto Message a JSON (cadena de texto)
    toJson() {
        return JSON.stringify(this.toMap()); // Serializar el mapa a JSON
    }

    // Crear un Message a partir de un mapa
    static fromMap(map) {
        return new Message(map.usuario, map.mensaje);
    }

    // Crear un Message a partir de JSON
    static fromJson(source) {
        return Message.fromMap(JSON.parse(source)); // Deserializar el JSON
    }
}

module.exports = Message;
