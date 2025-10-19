---
title: "Ingeniero de Software Senior"
company: "Motive (formerly KeepTruckin)"
period: "October 2019 - Present"
location: "San Francisco, CA"
order: 1
pdf: true
---

Motive ha sido un viaje increíble. Desde el principio, creí profundamente en nuestra misión. Como chileno y estudiante de la historia de mi país, entiendo lo esenciales que son la logística y la distribución de bienes para mantener un contrato social funcional.

Me uní cuando nuestro equipo de ingeniería aún era pequeño—alrededor de 40 ingenieros trabajando de cerca con el CTO en el centro de San Francisco. Aquellos primeros días fueron de los más inspiradores de mi carrera.

Comenzando como contribuidor individual, entregué mejoras fundamentales a nuestros sistemas principales. Mi primer proyecto fue construir una [capa de caché de consultas puntuales independiente del lenguaje](https://medium.com/motive-eng/how-we-reduced-db-load-with-our-language-agnostic-point-query-cache-3a628edfee4e), que redujo la carga de las bases de datos y sigue en producción seis años después, manejando cientos de miles de solicitudes por segundo en horas pico.

Con el tiempo, lideré varias iniciativas clave en el backend, enfocadas en el rendimiento, la evolución y la confiabilidad, incluyendo:

- Introducción de conexión con agrupamiento (pooling) para recursos de I/O de alta demanda como Redis.  
- Establecimiento de la práctica de usar feature-flags en lanzamientos críticos — ahora un estándar a nivel compañía.  
- Desarrollo de librerías de trazabilidad tanto en Golang como en Rails, creadas inicialmente para mis propias necesidades pero que luego fueron adoptadas orgánicamente por más de 100 proyectos como el estándar de facto.  

A medida que la compañía crecía, nuestro equipo monolítico de “plataforma” se dividió en grupos especializados, y yo transicioné al equipo de Plataforma IoT—crítico para la identidad de Motive como empresa de IoT e IA. En ese entonces, el equipo era solo de dos ingenieros. Me hice cargo de uno de nuestros principales pipelines de ingestión para transferencias de datos de edge a la nube, que hoy gestiona aproximadamente el 40% de todas las cargas: unas 60 millones por semana.

**Sin embargo, el trabajo del que estoy más orgulloso** es liderar la reinvención completa de nuestro sistema de configuración—la columna vertebral de las operaciones de Motive. Durante el periodo de fiestas de 2023, asumí la responsabilidad del sistema, que estaba en crisis pero era crucial para varios lanzamientos importantes.

En ese momento, las actualizaciones de configuración podían tardar **hasta 60 horas** en llegar al edge, y aprovisionar una nueva configuración podía tomar **dos semanas**. Trabajé incansablemente para revivir el sistema y lograr que la configuración fuera **en tiempo real** y **observable** en todas las líneas de producto.

## **Contribuciones clave**

- Diseñé una **estructura de perfiles jerárquica** (empresa → vehículo → dispositivo) que permite una configuración detallada para distintas poblaciones de dispositivos.  
- Introduje **visibilidad y monitoreo completos** en todos los flujos de configuración.  
- Re-ingeniericé el pipeline para que fuera **orientado a eventos**, reduciendo la latencia de días a segundos.  
- Implementé una **nueva experiencia de back-office**, permitiendo crear y desplegar nuevas configuraciones al instante.  

## **Impacto**

- Hicimos posibles los **despliegues globales de configuración** — ahora podemos reconfigurar millones de camiones varias veces al día.  
- Se convirtió en la base para más de **15 modelos de IA** distribuidos en distintos continentes; cada modelo depende de la flexibilidad de este sistema.  
- Habilitamos la capacidad de realización de **pruebas A/B** como resultado natural del diseño.  
- Ofrecimos una experiencia de prueba sin igual, permitiendo cambios de comportamiento bajo demanda para clientes empresariales como **Cintas** y **FedEx**.  
- Integramos la configuración directamente en el **flujo de trabajo de desarrollo en edge**, de modo que declarar una configuración en el código la expone automáticamente a las flotas en vivo a través de herramientas administrativas.
