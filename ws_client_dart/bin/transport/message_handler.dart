import 'dart:convert';
import 'message_type.dart';

// Para transformar el mensaje si se envia o se recibe
class MessageHandler {
  // Método para crear un mensaje JSON, Para enviar
  String encodeMessageJson(MessageType type, dynamic object) {
    return jsonEncode({
      'type': type.toString().split(".").last,
      'object': object is String
          ? object
          : object.toJson(), // Convertimos a String si es necesario
    });
  }

// Método para manejar un mensaje JSON, Para recibir
  Map<String, dynamic> decodeMessageJson(String message) {
    // Paso 1: Convertir el mensaje JSON en un Map
    final Map<String, dynamic> jsonData = jsonDecode(message);

    // Paso 2: Leer el tipo de mensaje y convertirlo de nuevo al enum
    final String typeString = jsonData['type'];
    final MessageType type = MessageType.values.firstWhere(
      (e) => e.toString().split('.').last == typeString,
      orElse: () => MessageType
          .unknow, // Valor por defecto en caso de no encontrar el tipo
    );

    // Paso 3: Leer el objeto
    final object = jsonData['object'];

    // Retornar el tipo como enum y el objeto
    return {
      'type': type,
      'object': object,
    };
  }
}
