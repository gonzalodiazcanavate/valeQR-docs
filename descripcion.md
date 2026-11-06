# Idea de Proyecto #

La idea es hacer un software de gestión de vales, que permita a los administradores de un negocio que use vales/tickets con qr, adjudicar los mismos a sus clientes, que sus empleados escaneen dichos vales para canjearlos, llevar un conteo de los vales canjeados por cliente y por empleado. En principio se trataría de una aplicacion web con versión para android y ios, estaría desplegada en un vps con un dominio y debería de ser ligera, eficiente y  sencilla pero escalable.

# Las practicas #

El desarrollo será agéntico, generaremos una documentación (Business Requirements Documents, directrices de diseño, logos, tecnologias skills, agentes, loop de trabajo, repositorios...) en base a los requsitos funcionales, no funcionales, el perfil de nuestros usuarios, las tecnologías que usaremos y demas. Dicha documentaación tambien estará presente a nivel técnico en cada repositorio, siguiendo una estructura de un AGENTS.md en la raíz de cada repositorio con una breve descripción del mismo, algunas practicas a seguir y la ubicación de un index.md en el que están listadas las funcionalidades de la página y los documentos de contexto que las describen en profundidad, la idea es que el AGENTS.md indique al agente que busque si lo que se le ha pedido encaja con alguna de las funcionalidades de index.md, que revise los archivos de contexto necesarios para saber donde mirar y que hacer y que incorpore los cambios a cada archivo de contexto o cree uno y lo añada al indice si la feauture no estaba incluida.

# Objetivos #
En principio la idea de esta app nace de las necesidades de una autoescuela, que quiere un sistema para gestionar los tickets que les da a sus alumnos a cambio de una clase práctica de conducir. Los objetivos serán los siguientes según el usuario:

Administrador (el desarrollador):
- Podrá dar de alta y de baja autoescuelas que usen la app (ya sea manuealmente o mandando un correo con un link de registro de un solo uso), asi como gestionar las mismas y a todos los usuarios, control total.

Autoescuelas:
- Podran añadir y eliminar clientes y empleados (ya sea manuealmente o mandando un correo con un link de registro de un solo uso) y otorgarle tickets a sus clientes, tambien podrán modificar el rolo de un cliente/empleado (de cliente a empleado y viceversa).
- Tienen acceso a todo tipo de estadísticas sobre sus empleados, clientes y tickets.

Empleados: 
- Pueden escanear los codigos qr para canjear los tickets de los clientes, así como modificar su información personal y de perfil como el resto de usuarios. Tambien podrán ver estadísticas e historial de tickets canjeados por ellos, con series temporales y por cliente.

clientes: 
- Pueden visualizar los tickets que tienen y los que han canjeado ya acceder a estadisticas sobre los mismos.
- Pueden enviar mensajes a su autoescuela para realizar reclamaciones o consultar dudas.

Los permisos son incrementales, los empleados pueden hacer todo lo de los clientes y las autoescuelas todo lo de los empleados, lo unico que no se puede modificar es el tema de los tickets canjeados, eso solo lo puede hacer el administrador. Otra cosa es que los roles van por autoescuela, un usuario puede estar en una autoescuela, varias o ninguna y en una autoescuela puede ser el jefe, en otra empleado e incluso en otra cliente.

# Plataformas #
Tendremos lo siguiente:
- Una web con su dashboard, notificaciones, estadisticas y demás.
- Aplicaciones de móvil para android y ios que ademas de lo de la web permiten el escaneo de loss tickets por los empleados.

# Que espero que saques de este documento #

Este documento es solo una descripción de lo que buscamos, de el espero que saques una documentación completa de todo lo necesario para un proyeccto de esta escala y que concretes todo, tecnologías, repositorios, despliegue y demás, pero solo a nivel documentacion ya lo implementarás más adelante. Si ves alguna incongruencia de seguridad o crees que algo se podría mejorar/añadir de mi descripcion, adelante toma la mejor decision y ya discutiremos luego. Genera en esta carpeta toda la documentación del proyecto y pide mas contexto si lo necesitas.