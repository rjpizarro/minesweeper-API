const ENV = {
    port: process.env.PORT || 8000,
    mongoConnect: process.env.MONGO_URI,
};

const getEnvVars = () => ENV

export default getEnvVars;