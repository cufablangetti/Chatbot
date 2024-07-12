const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot');

const QRPortalWeb = require('@bot-whatsapp/portal');
const BaileysProvider = require('@bot-whatsapp/provider/baileys');
const MockAdapter = require('@bot-whatsapp/database/mock');

// Flujo para mostrar productos
const flowProductos = addKeyword(['productos', 'catalogo', 'catálogo']).addAnswer([
    '👗 Aquí tienes nuestro catálogo de productos:',
    '- *1* Vestidos',
    '- *2* Camisetas',
    '- *3* Pantalones',
    '\nPor favor, escribe el número del producto que deseas ver.'
]);

// Flujo para promociones
const flowPromociones = addKeyword(['promociones', 'ofertas']).addAnswer([
    '🎉 ¡Estas son nuestras promociones actuales!',
    '- 20% de descuento en vestidos',
    '- 15% de descuento en camisetas',
    '- 10% de descuento en pantalones',
    '\nEscribe *productos* para ver nuestro catálogo.'
], null, null, [flowProductos]);

// Flujo para horarios de atención
const flowHorarios = addKeyword(['horarios', 'horario', 'atencion']).addAnswer([
    '🕒 Nuestros horarios de atención son:',
    '- Lunes a Viernes: 9:00 AM - 6:00 PM',
    '- Sábado: 10:00 AM - 4:00 PM',
    '- Domingo: Cerrado',
    '\nEscribe *productos* para ver nuestro catálogo o *promociones* para ver nuestras ofertas.'
]);

// Flujo para contacto
const flowContacto = addKeyword(['contacto', 'contacto', 'soporte']).addAnswer([
    '📞 Puedes contactarnos a través de:',
    '- Teléfono: +123456789',
    '- Email: tienda@ropa.com',
    '- WhatsApp: +123456789',
    '\nEscribe *productos* para ver nuestro catálogo o *promociones* para ver nuestras ofertas.'
]);

// Flujo principal
const flowPrincipal = addKeyword(['hola', 'hi', 'buenos días', 'buenas tardes'])
    .addAnswer('🙌 ¡Hola! Bienvenido a *Tienda de Ropa*')
    .addAnswer([
        'Te podemos ayudar con lo siguiente:',
        '👉 *productos* para ver nuestro catálogo',
        '👉 *promociones* para ver nuestras ofertas',
        '👉 *horarios* para conocer nuestros horarios de atención',
        '👉 *contacto* para saber cómo contactarnos'
    ], null, null, [flowProductos, flowPromociones, flowHorarios, flowContacto]);

// Función principal para configurar y ejecutar el bot
const main = async () => {
    const adapterDB = new MockAdapter(); // Adaptador de base de datos para pruebas
    const adapterFlow = createFlow([flowPrincipal]); // Crear flujo principal
    const adapterProvider = createProvider(BaileysProvider); // Proveedor de WhatsApp

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    });

    QRPortalWeb(); // Iniciar portal web para mostrar el código QR
}

main(); // Ejecutar la función principal
