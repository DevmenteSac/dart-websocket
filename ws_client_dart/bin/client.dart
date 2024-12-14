import 'package:web_socket_channel/web_socket_channel.dart';

// Para recibir mensaje se usa channel.stream.listen((message) {
// Para enviar mensaje se usa channel.sink.add()
void main() {
  // URL del websocket a hacer conexion
  final wsUrl = Uri.parse('ws://localhost:8080');
  // En emuladores Android es ws://10.0.2.2:8080

  // Conectamos el Cliente al Servidor WebSocket
  final channel = WebSocketChannel.connect(wsUrl);
  // Ahora tenemos una conexión abierta, y podemos empezar a enviar y recibir mensajes.

  // Escuchar los mensajes del servidor, esto se ejecuta cada vez que el servidor envía datos.
  channel.stream.listen((message) {
    print('Mensaje recibido del servidor: $message');
  }, onError: (error) {
    // Para manejar errores
    print('Error en la conexión: $error');
  }, onDone: () {
    // Para manejar la desconexion
    print('Conexión cerrada');
  });

  print('Enviando mensaje al servidor...');

  // Usamos channel.sink.add para enviar un mensaje al servidor WebSocket
  channel.sink.add('Hola desde el cliente Dart');

  // Mantener el programa corriendo por un tiempo para que veamos la interacción
  Future.delayed(Duration(seconds: 5), () {
    // Para cerrar la conexión websocket
    channel.sink.close();
    print('Conexión cerrada desde el cliente');
  });
}
