import axios from 'axios';

export default class Api {
    constructor(urlWorpress) {
        this.apiURL = `${urlWorpress}/wp-json`;
        this.idPages = {};
        this.types = []
    }

    get_page(page) {
        let idPage = this.idPages[page];
        if (!idPage) return;
        return axios.get(`${this.apiURL}/wp/v2/pages/${idPage}`, {});
    }
    get_posts(type) {
        if (!this.types.includes(type)) return;
        return axios.get(`${this.apiURL}/wp/v2/${type}?per_page=100`, {});
    }
    get_n_posts(type, n) {
        if (!this.types.includes(type)) return;
        return axios.get(`${this.apiURL}/wp/v2/${type}?per_page=${n}`, {});
    }
    get_n_posts_page(type, n, page) {
        if (!this.types.includes(type)) return;
        return axios.get(`${this.apiURL}/wp/v2/${type}?per_page=${n}&page=${page}`, {});
    }
    get_posts_category(type, category) {
        let idPosts = category
        if (!idPosts) return
        return axios.get(`${this.apiURL}/wp/v2/${type}?categories=${idPosts}&per_page=100`, {});
    }
    get_post(type, slug) {
        if (!this.types.includes(type)) return;
        return axios.get(`${this.apiURL}/wp/v2/${type}?slug=${slug}`, {});
    }
    get_post_by_id(type, id) {
        if (!this.types.includes(type)) return;
        return axios.get(`${this.apiURL}/wp/v2/${type}?id=${id}`, {});
    }
    get_post_by_slug(type, slug) {
        if (!this.types.includes(type)) return;
        return axios.get(`${this.apiURL}/wp/v2/${type}?slug=${slug}`, {});
    }
    get_categories() {
        return axios.get(`${this.apiURL}/wp/v2/categories?per_page=100`, {});
    }
    get_categories_from_parent(parent) {
        return axios.get(`${this.apiURL}/wp/v2/categories?parent=${parent}&per_page=100`, {});
    }
    get_category(type, slug) {
        if (!this.types.includes(type)) return;
        return axios.get(`${this.apiURL}/wp/v2/categories?slug=${slug}`, {});
    }
    get_xml() {
        return axios.get(this.xmlURL);
    }


    post_mail(formData) {
        return axios.post(`${this.apiURL}/contact-form-7/v1/contact-forms/292/feedback`, 
            formData
        ).then(function (response) {
            console.log(response);
            return true
        }).catch(function (error) {
            console.log(error)
            return false
        });
    }
    post_subscribe(formData) {
        return axios.post('', 
            formData
        ).then(function (response) {
            console.log(response);
            return true
        }).catch(function (error) {
            console.log(error)
            return false
        });
    }
    
    get(page, param = null) {
        switch(page) {
            case 'index':
                return this.get_home();
                break;
        }
    }
    get_home() {
        const requestPageCurrent = this.get_page('home');
        return axios.all([requestPageCurrent])
            .then(axios.spread((...responses) => {
                const responsePageCurrent = responses[0].data.acf;    
                const home = {
                    api: {
                        page: responsePageCurrent
                    }
                };
                return home;
            }))
            .catch(e => {
                return { error: e };
            });
    } 
}