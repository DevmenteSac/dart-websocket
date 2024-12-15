import 'package:web_socket_channel/web_socket_channel.dart';

class WebsocketClient {
  late WebSocketChannel _channel;
  final Uri wsUrl;

  WebsocketClient({required this.wsUrl});

  void connect() {
    // Para conectar el Cliente al Servidor WebSocket
    _channel = WebSocketChannel.connect(wsUrl);
    _listenMessages();
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
