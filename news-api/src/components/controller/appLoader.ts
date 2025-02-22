import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super(process.env.API_URL || 'https://newsapi.org/v2/', {
            apiKey: process.env.API_KEY as string,
        });
    }
}

export default AppLoader;
