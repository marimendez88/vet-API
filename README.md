# Notas:

Veterinaria API

Recuerde usar siempre al inicio

```
npm install
```

## Documentacion del API:

Se realizó la documentacion necesaria de todas las consultas en el modulo de [Documentacion de Postman](https://documenter.getpostman.com/view/6496490/SzmYAMkL?version=latest#80f916d5-ce4e-4d3a-be63-848971a61953)

## URL Produccion

Para probar el API via directa, puede consultar el siguiente link:
https://mjmendez-vet-api.herokuapp.com/

> Puede que la base de datos esté un poco vacia, pero puede siempre utilizar los endpoints para crear registros.

## SOCKETS

Para escuchar informacion desde el servidor, en el index de la aplicación
El archivo que contiene los listeners es:

```
public/js/socket-custom.js
```

Utilizar todos los listeners
---> sockets.on("")

### Cliente

Nuevo Cliente: "clienteNuevo"

Actualiza Cliente: "clienteActualizado"

Elimina Cliente: "clienteEliminado"

### Mascota

Nueva Mascota: "mascotaNuevo"

Actualiza Mascota: "mascotaActualizado"

Elimina Mascota:"mascotaEliminado"
