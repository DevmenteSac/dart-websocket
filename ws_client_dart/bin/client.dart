import 'websocket_client.dart';
import 'transport/message.dart';
import 'transport/message_handler.dart';
import 'transport/message_type.dart';

void main() {
  // URL del websocket a hacer conexion
  final wsUrl = Uri.parse('ws://localhost:8080');
  // En emuladores Android es ws://10.0.2.2:8080
  // En emuladores IOS es ws://localhost:8080
  // En emuladores WEB es ws://localhost:8080

  final webSocketClient = WebsocketClient(wsUrl: wsUrl);

  webSocketClient.connect();

  // para enviar/recibir types y messages, transformar los mensjaes con tipos
  MessageHandler messageHandler = MessageHandler();

  // Para recibir
  webSocketClient.messages.listen(
    (message) {
      // dependiendo el type del message se decide que hacer
      try {
        // se hace decodeMessageJson para obtener el type y message
        Map<String, dynamic> decodeMessage =
            messageHandler.decodeMessageJson(message);

        MessageType type = decodeMessage["type"];
        final object = decodeMessage["object"];

        print("Mensaje decodificado $decodeMessage");

        switch (type) {
          case MessageType.chat:
            // Si el object es de tipo mensaje lo desetructuramos con mensaje

            Message message = Message.fromJson(object);

            print("Mensaje chat recibido: ${message.mensaje}");
            print("Mensaje de: ${message.usuario}");
            break;

          case MessageType.join:
            // Si el object es de tipo join lo desetructuramos con join, etc, etc

            print("Mensaje join, entraste");
            break;
          case MessageType.alert:
            // Si el object es de tipo alert lo desetructuramos con alert, etc, etc
            Message message = Message.fromJson(object);

            print("Mensaje alert recibido: ${message.mensaje}");
            print("Mensaje de: ${message.usuario}");

            break;
          default:
            print("Tipo de mensaje desconocido");
        }
      } catch (error) {
        print('Error al recibir el mensaje: $error');
      }
    },
  );

  // Se crea el mensaje base
  Message message = Message(
    usuario: "sebas",
    mensaje: "Hola como tas",
  );

  // se agrega el type al message, se hace encodeMessageJson
  String encodeMessage =
      messageHandler.encodeMessageJson(MessageType.chat, message);

  // Para enviar
  webSocketClient.sendMessages(encodeMessage);
}
