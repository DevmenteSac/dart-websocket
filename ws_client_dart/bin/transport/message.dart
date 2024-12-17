import 'dart:convert';

// Modelo de datos que sera enviado y recibido
// Para enviar: objeto -> map -> json
// Para recibir: json -> map -> objeto
class Message {
  String usuario;
  String mensaje;

  // Constructor
  Message({
    required this.usuario,
    required this.mensaje,
  });

  // Convertir el objeto Message a un mapa
  Map<String, dynamic> toMap() {
    return {
      'usuario': usuario,
      'mensaje': mensaje,
    };
  }

  // Convertir el objeto Message a JSON (cadena de texto) Para enviar en websocket
  String toJson() {
    return jsonEncode(toMap()); // Serializar el mapa a JSON
  }

  // Crear un Message a partir de un mapa
  factory Message.fromMap(Map<String, dynamic> map) {
    return Message(
      usuario: map['usuario'],
      mensaje: map['mensaje'],
    );
  }

  // Crear un Message a partir de JSON  Para recibir en websocket
  factory Message.fromJson(String source) {
    return Message.fromMap(jsonDecode(source)); // Deserializar el JSON
  }
}
