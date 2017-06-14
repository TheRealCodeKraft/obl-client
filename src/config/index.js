import DevConfig from 'config/config.dev';
import ProdConfig from 'config/config.prod';

var config = DevConfig;
if(process.env.NODE_ENV === "production") {
    config = ProdConfig;
}

export default config;
