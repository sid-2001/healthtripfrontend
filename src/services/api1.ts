/* eslint-disable no-useless-catch */
import axios, {
  AxiosInstance,
  AxiosResponse,
  AxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosProgressEvent,
} from "axios";
import { redirect } from "react-router-dom";
import { BACKEND_URL } from "../configraion";

interface AdaptAxiosRequestConfig extends AxiosRequestConfig {
  headers: AxiosRequestHeaders;
}

const BaseUrl = BACKEND_URL + "/api/v1";

const baseUrl = BaseUrl;

const instance: AxiosInstance = axios.create({
  baseURL: baseUrl,
  responseType: "json",
});

// Response interceptor
instance.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log("Response Interceptor:", response);
    return response;
  },
  (error: any) => {
    // Handle response error
    if (error.response.status === 401) {
      redirect("/");
      return Promise.reject(error);
    } else {
      console.log("Response Interceptor Error:");
    }
  }
);

instance.defaults.headers["Cache-Control"] = "no-cache";

instance.defaults.headers["Access-Control-Allow-Origin"] = "*";

const get = async (url: string) => {
  console.log(baseUrl);

  try {
    const { data } = await instance.get(url);
    return data;
  } catch (error) {
    throw error;
  }
};

const post = async (url: string, object: any) => {
  try {
    const { data } = await instance.post(url, object);
    return data;
  } catch (error) {
    throw error;
  }
};

const put = async (url: string, object: any) => {
  try {
    const { data } = await instance.put(url, object);
    return data;
  } catch (error) {
    throw error;
  }
};
//
const patch = async (url: string, object: any) => {
  try {
    const { data } = await instance.patch(url, object);
    return data;
  } catch (error) {
    throw error;
  }
};

const del = async (url: string, object: any) => {
  try {
    const { data } = await instance.delete(url, object);
    return data;
  } catch (error) {
    throw error;
  }
};

const upload = async (
  url: string,
  formData: any,
  onUploadProgress: (progressEvent: AxiosProgressEvent) => void
) => {
  try {
    const { data } = await instance.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress,
    });
    return data;
  } catch (error) {
    throw error;
  }
};

const api1 = {
  baseUrl,
  instance,
  get,
  post,
  put,
  del,
  upload,
  patch,
};

export default api1;
