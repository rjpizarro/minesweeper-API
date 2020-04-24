const ENV = {
    port: process.env.PORT || 8000,
    mongoConnect: process.env.MONGO_CONNECT,
};

const getEnvVars = () => ENV

export default getEnvVars;