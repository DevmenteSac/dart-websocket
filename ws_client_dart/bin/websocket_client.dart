import 'dart:async';

import 'package:web_socket_channel/web_socket_channel.dart';

class WebsocketClient {
  late WebSocketChannel _channel;
  final Uri wsUrl;
  final StreamController<String> _messageStreamController =
      StreamController<String>();

  WebsocketClient({required this.wsUrl});

  // Stream para escuchar mensajes
  Stream<String> get messages => _messageStreamController.stream;

  void connect() {
    try {
      // Para conectar el Cliente al Servidor WebSocket
      _channel = WebSocketChannel.connect(wsUrl);
      _listenMessages();
    } catch (error) {
      print("Error al intentar conectar al servidor WebSocket: $error");
    }
  }

  void sendMessages(String message) {
    // Para enviar mensaje se usa channel.sink.add()
    _channel.sink.add(message);
  }

  void _listenMessages() {
    // Para escuchar mensaje se usa channel.stream.listen((message)
    // Escuchar los mensajes del servidor, esto se ejecuta cada vez que el servidor envía datos.
    _channel.stream.listen((message) {
      print('Mensaje recibido del servidor: $message');
      _messageStreamController.add(message);
    }, onError: (error) {
      // Para manejar errores
      print('Error en la conexión: $error');
    }, onDone: () {
      // Para manejar la desconexion
      print('Conexión cerrada');
    });
  }

  void closedConnection() {
    // Para cerrar la conexión websocket
    _channel.sink.close();
  }
}
