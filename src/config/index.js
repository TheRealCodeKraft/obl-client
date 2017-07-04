import DevConfig from 'config/config.dev';
import ProdConfig from 'config/config.prod';

var config = DevConfig;
if(process.env.NODE_ENV === "production") {
    config = ProdConfig;
}

config.moodle = {
  url: "https://proto.openbusinesslabs.com/"
}

export default config;
