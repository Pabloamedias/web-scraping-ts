export default   {
    BASE_URL : process.env.BASE_URL || 'https://chileservicios.com',
    TOPIC_TO_SCRAP : process.env.TOPIC_TO_SCRAP || '/videojuegos/',
    OUTPUT_DATA_DIRECTORY : process.env.OUTPUT_DATA_DIRECTORY || './outputData'
}