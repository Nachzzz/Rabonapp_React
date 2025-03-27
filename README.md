## Aplicación para organizar partidos de fútbol 5 ⚽

El emprendedor y fanático del fútbol, Ryan Reynolds tiene la idea de crear una aplicación
para organizar partidos de fútbol 5 que permita a jugadores y equipos crear y organizar
partidos con amigos o desconocidos en la ciudad de Salta. Y ha elegido a tu equipo de
desarrollo para llevar a cabo dicha aplicación.

La aplicación debe permitir registrar jugadores, los cuales deberán tener, al menos, nombre
y apellido, edad, apodo y nivel de habilidad general (1 al 10).
Los jugadores pueden crear equipos incluyendo jugadores registrados en la aplicación. Un
equipo debe tener un nombre, y puede incluir un escudo (o logo). Además, un equipo debe
tener al menos un jugador, el creador, (agregado automáticamente) que será su
administrador.

Para agregar jugadores, un equipo (a través de su administrador) puede buscar jugadores
(que deben estar registrados), filtrando por nombre, edad o nivel. Una vez seleccionado el
jugador debe enviarle una solicitud. El jugador puede aceptar o rechazar la solicitud.
Por otro lado, un jugador puede enviar una solicitud para ingresar a un equipo. En tal caso,
el administrador del equipo puede aceptar o rechazar la solicitud.

Los equipos con menos de 5 jugadores se considerarán "incompletos", mientras que con 5
o más jugadores se considerarán "completos".

Los equipos completos tendrán un nivel de habilidad que será el promedio del nivel de
habilidad de sus integrantes y de manera similar tendrán un promedio de edad de acuerdo
a sus integrantes.

Un jugador puede pertenecer a uno o más equipos (o ninguno).

A su vez, un equipo (a través de su administrador) puede crear partidos y habilitarlos para
que otros equipos soliciten participar del mismo. Un partido debe tener un lugar (cancha:
nombre y dirección), fecha y hora de inicio. Se asume que un partido dura 1 hora. La reserva
y abono de la cancha no será gestionada por la aplicación, en esta primera versión. Se
asume que un equipo que crea un partido ya tiene reservada una cancha.

Un equipo puede buscar partidos “abiertos” filtrando por nivel. Una vez seleccionado el
partido, puede ver la información del equipo creador y decidir si enviar una solicitud para
participar.

Si un equipo solicita participar de un partido “abierto” (es decir, que todavía no tiene equipo
rival establecido), el equipo que lo creó puede aceptar o rechazar la solicitud.

Si se rechaza, el partido se mantiene “abierto”. Si se acepta la solicitud se considerará que
el partido ya está “listo” para jugar.

Un equipo invitado puede cancelar su participación a un partido "listo" para jugar. En tal
caso, el partido deberá volver a estar "abierto" para que otro equipo envíe una solicitud de
participación.

El equipo creador puede cancelar el partido, aún si este se encuentra "listo" para jugar.
Si el equipo creador desea que un equipo específico participe del partido, puede
compartirle un link al partido para que solicite participar.

Solo equipos "completos" pueden crear o solicitar participar de partidos.

Un equipo puede reportar a un equipo rival si este último no cumplió con las expectativas
de un encuentro. El reporte debe incluir comentario detallando lo sucedido.

## 🎯 Objetivo

 Nuestro objetivo es desarrollar un sitio funcional, en el que el usuario puede gestionar

## 🗂️ Estructura del proyecto 

```bash

rabonapp/
│ public/
│ src/
│ ├── assets/
│ ├── components/
│ │ ├── RegisterForm.jsx
│ │ ├── LoginForm.jsx
│ ├── contexts/
│ │ ├── AuthContext.jsx
│ ├── hooks/
│ │ ├── useAuth.js
│ ├── pages/
│ │ ├── UserProfile/
│ │ │ ├── UserProfile.jsx
│ │ ├── Home/
│ │ │ ├── Home.jsx
│ ├── routes/
│ │ ├── PrivateRoute.jsx
│ │ ├── Layout.jsx
│ │ ├── Router.jsx
│ ├── services/
│ │ ├── api.js
│ │ ├── authService.js
│ │ ├── projectService.js
│ │ ├── activityService.js
│ ├── main.jsx
├── .eslintrc.cjs
├── index.html
├── index.js
├── package-lock.json
├── package.json
├── vite.config.js

```

## Requerimientos

- Node.js 18.16.1+
- Vite 6.0.5+
- React 18.3.1+
- React Router 7.1.1+
- React Router DOM 7.1.1+

## 📝 Instalación

1. Clonar el repositorio

```shell
git clone https://github.com/Nachzzz/Rabonapp_React.git
```
2. Instalar las dependencias

```bash
npm install
```

3. Iniciar el servidor de desarrollo

```bash
npm run dev
```

Cambios