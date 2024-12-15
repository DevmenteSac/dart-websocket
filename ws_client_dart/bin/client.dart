import 'websocket_client.dart';

void main() {
  // URL del websocket a hacer conexion
  final wsUrl = Uri.parse('ws://localhost:8080');
  // En emuladores Android es ws://10.0.2.2:8080
  // En emuladores IOS es ws://localhost:8080
  // En emuladores WEB es ws://localhost:8080

  final webSocketClient = WebsocketClient(wsUrl: wsUrl);

  webSocketClient.connect();

  print('Enviando mensaje al servidor...');

  webSocketClient.sendMessages("Hola desde el cliente Dart");

  // Mantener el programa corriendo por un tiempo para que veamos la interacción
  Future.delayed(Duration(seconds: 5), () {
    webSocketClient.closedConnection;
    print('Conexión cerrada desde el cliente');
  });
}
