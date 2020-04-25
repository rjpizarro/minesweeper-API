const ENV = {
    port: process.env.PORT || 8000,
    mongoURI: process.env.MONGO_URI,
    accessToken: process.env.ACCESS_TOKEN
};

const getEnvVars = () => ENV

export default getEnvVars;