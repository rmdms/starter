import Api from '~/assets/scripts/api.js';

export default (context, inject) => {
    const api = new Api(context.env.apiURL, context.env.fullURL);
    inject('api', api);
}