# 🚀 Dart WebSocket Client-Server Project

[![Flutter](https://img.shields.io/badge/Flutter-Framework-blue)](https://flutter.dev)
![Dart](https://img.shields.io/badge/Dart-Language-blue)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

![Screen Timer](captura.png)

## 📚 Descripción

Este proyecto tiene como objetivo la implementación de un sistema de comunicación bidireccional en tiempo real entre un servidor y un cliente utilizando WebSockets. El servidor está desarrollado en **Node.js** utilizando la librería `ws`, y el cliente está desarrollado en **Dart** utilizando el paquete `web_socket_channel`.

Recientemente se han agregado nuevas características tanto al servidor como al cliente. El servidor ahora soporta el manejo de varios tipos de mensajes (chat, alertas, unirse) y el cliente permite enviar y recibir mensajes con diferentes tipos, como mensajes de chat y alertas.

## 🎯 Objetivo del Proyecto

- Comprender cómo funcionan las conexiones WebSocket con Dart para luego implementarlo en Flutter.
- Implementar un servidor WebSocket en **Node.js**.
- Crear un cliente WebSocket en **Dart**.
- Practicar la comunicación en tiempo real entre servidor y cliente.
- Mejorar la estructura del cliente para manejar tipos de mensajes más diversos.

## 🛠️ Características

- **Servidor WebSocket en Node.js**: Usando la librería `ws` para manejar las conexiones.
- **Cliente WebSocket en Dart**: Usando el paquete `web_socket_channel` para la comunicación.
- **Mensajes bidireccionales**: Envío y recepción de mensajes entre cliente y servidor.
- **Conexiones simultáneas**: El servidor puede manejar múltiples conexiones al mismo tiempo.
- **Manejo de múltiples tipos de mensajes**: El cliente y servidor ahora manejan mensajes de tipo chat, alert y join.
- **Cliente robusto**: El cliente puede enviar y recibir diferentes tipos de mensajes, como chats y alertas.

## 📂 Estructura del Proyecto

### Dart
```plaintext
bin/
├── client.dart                 # Código raíz del cliente Dart
├── websocket_client.dart       # Lógica del cliente para conectarse al WebSocket
├── transport/
│   ├── message.dart            # Modelo de datos para los mensajes
│   ├── message_handler.dart    # Manejador de los mensajes (decodificación y codificación)
│   ├── message_type.dart       # Tipos de mensajes (chat, alert, join, tc)
```

### NodeJs
```plaintext
src/
├── transport/
│   ├── message.js              # Modelo de datos para los mensajes
│   ├── messageHandler.js       # Manejador de los mensajes (decodificación y codificación)
│   ├── messageType.js          # Tipos de mensajes (chat, alert, join, tc)
├── handleConnection.js         # maneja la conexion y los diferentes eventos (igual que el server pero mas estructurado)
├── handleMessages.js           # maneja exactamente el evento de message, el listen (igual que el server pero mas estructurado)
├── server.js                   # maneja la raiz del server (igual que el server pero mas estructurado)
├── utils.js                    # maneja metodo utiles del server (igual que el server pero mas estructurado)
server.js                       # Código raiz del servidor WebSocket, codigo basico

```

## 🚀 Cómo Ejecutar el Proyecto

### Servidor
1. Asegúrate de tener Node.js instalado. Si no, sigue las instrucciones en la [documentación oficial](https://nodejs.org/en).

2. Clona este repositorio:

```bash
git clone https://github.com/DevmenteSac/dart_websocket
```

3. Navega al directorio del servidor:

```bash
cd ws_server_node
```

4. Instala las dependencias:

```bash
npm install
```

5. Ejecuta el servidor:

```bash
node src/server.js
```

### Cliente
1. Asegúrate de tener Dart instalado.

2. Navega al directorio del cliente:

```bash
cd ws_client_dart
```

3. Instala las dependencias:

```bash
dart pub get
```

5. Ejecuta el cliente:

```bash
dart run bin/client.dart
```

## 🧰 Herramientas Usadas

- **Node.js**: Entorno de ejecución JavaScript para el servidor.
- **ws**: Librería para WebSockets en Node.js.
- **Dart**: Lenguaje de programación para el cliente.
- **web_socket_channel**: Paquete de Dart para la comunicación WebSocket.
- **VS Code**: Entorno de Desarrollo.


## 📖 Lo que He Aprendido

- 🌟 Cómo establecer una conexión WebSocket desde un cliente en Dart hacia un servidor en Node.js.
- 🌟 Cómo manejar la recepción y envío de mensajes a través de WebSockets.
- 🌟 Cómo gestionar múltiples conexiones de clientes en el servidor.
- 🌟 Cómo implementar y manejar diferentes tipos de mensajes (chat, alertas, unirse) en WebSockets.

## 📋 Próximos Pasos

- Mejorar el manejo de errores en el servidor y cliente.
- Implementar reconexiones automáticas en caso de desconexión.
- Implementar pruebas unitarias y de integración.

## 🤝 Contribuciones

Este proyecto es principalmente para aprendizaje personal, pero siéntete libre de proponer mejoras o sugerencias.

## 📞 Contacto
Bastian Naitsab - [devmentesacontacto@gmail.com](mailto:devmentesacontacto@gmail.com)  
GitHub: [DevmenteSac](https://github.com/DevmenteSac)