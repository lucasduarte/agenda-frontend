import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import { API_URL } from "@/common/config";

const ApiService = {
  init() {
    Vue.use(VueAxios, axios);
    Vue.axios.defaults.baseURL = API_URL;
  },

  setHeader() {
  },

  query(resource, params) {
    return Vue.axios.get(resource, params).catch(error => {
      throw new Error(`ApiService ${error}`);
    });
  },

  get(resource, slug = "") {
    return Vue.axios.get(`${resource}/${slug}`).catch(error => {
      throw new Error(`ApiService ${error}`);
    });
  },

  post(resource, params) {
    return Vue.axios.post(`${resource}`, params);
  },

  update(resource, slug, params) {
    return Vue.axios.put(`${resource}/${slug}`, params);
  },

  put(resource, params) {
    return Vue.axios.put(`${resource}`, params);
  },

  delete(resource) {
    return Vue.axios.delete(resource).catch(error => {
      throw new Error(`ApiService ${error}`);
    });
  }
};

export default ApiService;

export const SalasService = {
  get() {
    return ApiService.get("sala");
  },
  query(params) {
    return ApiService.query("sala", params);
  }
};

export const ResponsaveisService = {
  get() {
    return ApiService.get("responsavel");
  }
}

export const EventosService = {
  get() {
    return ApiService.get("evento");
  },
  create(params) {
    return ApiService.post('evento', params);
  },
  update(slug, params) {
    return ApiService.update("evento", slug, params);
  },
  destroy(slug) {
    return ApiService.delete(`evento/${slug}`);
  }
}