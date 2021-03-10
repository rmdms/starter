export const state = () => ({
    window: {
        device: {
            desktop: null,
            mac: null,
            windows: null,
            device: null,
            ios: null,
            droid: null,
            tablet: null,
            ipad: null,
            droidTablet: null,
            phone: null,
            iphone: null,
            droidPhone: null
        },
        navigator: {
            chrome: null,
            firefox: null,
            safari: null,
            opera: null,
            edge: null,
            ie: null
        },
        aspect: {
            horizontal: null,
            vertical: null,
            square: null
        },
        scroll: {
            can: true
        },
        mouse: {},
        cookies: {}
    },
    pages: {},
    components: {
        header: {
            menu: {
                open: false
            }
        },
        footer: {}
    },
    loading: true
})

export const mutations = {
    // SETTER
    setScroll(state, param) {
        state.window.scroll = Object.assign(state.window.scroll, param);
    },
    setLoading(state, param) {
        state.loading = param;
    },
    // ACTION
    actionMenu(state) {
        state.components.header.menu.open = !state.components.header.menu.open;
        document.body.classList.toggle('is-open', state.components.header.menu.open);
    },
    // CONTROL
    controlDevice(state) {
        const ua = navigator.userAgent.toLowerCase();
        const p = navigator.platform.toLowerCase();
        state.window.device.droidPhone = /android.*mobile/.test(ua);
        state.window.device.droidTablet = !state.window.device.droidPhone && (/android/i).test(ua);
        state.window.device.droid = state.window.device.droidPhone || state.window.device.droidTablet;
        state.window.device.ios = (/ip(hone|od|ad)/i).test(ua) && !window.MSStream;
        state.window.device.iphone = (/iphone/i).test(ua) && state.window.device.ios;
        state.window.device.ipad = (/ipad/i).test(ua) && state.window.device.ios;
        state.window.device.tablet = state.window.device.droidTablet || state.window.device.ipad;
        state.window.device.phone = state.window.device.droidPhone || (state.window.device.ios && !state.window.device.ipad);
        state.window.device.device = state.window.device.phone || state.window.device.tablet;
        state.window.device.desktop = !state.window.device.phone && !state.window.device.tablet;
        state.window.device.mac = /mac/i.test(p) && state.window.device.desktop;
        state.window.device.windows = /win/i.test(p) && state.window.device.desktop;
        for (const property in state.window.device) {
            document.body.classList.toggle(`is-${property}`, state.window.device[property]);
        }
    },
    controlNavigator(state) {
        const ua = navigator.userAgent.toLowerCase();
        const av = navigator.appVersion.toLowerCase();
        state.window.navigator.firefox = ua.indexOf('firefox') > -1;
        state.window.navigator.safari = !!ua.match(/version\/[\d\.]+.*safari/);
        state.window.navigator.opera = ua.indexOf('opr') > -1;
        state.window.navigator.ie = av.indexOf('msie') > -1 || av.indexOf('edge') > -1;
        state.window.navigator.edge = ua.indexOf('edge') > -1;
        state.window.navigator.chrome = window.chrome !== null && window.chrome !== undefined && navigator.vendor.toLowerCase() == 'google inc.' && !state.window.navigator.opera && !state.window.navigator.edge;
        for (const property in state.window.navigator) {
            document.body.classList.toggle(`is-${property}`, state.window.navigator[property]);
        }
    },
    controlAspect(state) {
        const aspect = window.innerWidth - window.innerHeight;
        state.window.aspect.horizontal = aspect > 0;
        state.window.aspect.vertical = aspect < 0;
        state.window.aspect.square = aspect == 0;
        for (const property in state.window.aspect) {
            document.body.classList.toggle(`is-${property}`, state.window.aspect[property]);
        }
    }
}