import { customErrorData } from "@/constants";

export interface RequestConfig {
  method: string;
  headers: Record<string, string>;
  body?: string;
  cache?: RequestCache;
  url: string;
}

export interface ResponseData<T> {
  data?: T;
  message?: string;
}

export interface ErrorData {
  statusCode?: number;
  message?: string;
  error?: unknown;
}
export function isErrorData(object: unknown): boolean {
  const potatialErrData = object as ErrorData;
  return "statusCode" in potatialErrData || "message" in potatialErrData;
}
export class CustomFetch {
  private baseURL: string;
  private requestInterceptors: Array<(config: RequestConfig) => RequestConfig> = [];
  private responseInterceptors: Array<(data: ResponseData<unknown>) => ResponseData<unknown>> = [];

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  // Register a request interceptor
  requestInterceptor(callback: (config: RequestConfig) => RequestConfig): void {
    this.requestInterceptors.push(callback);
  }

  // Register a response interceptor
  responseInterceptor<T>(callback: (data: ResponseData<unknown>) => ResponseData<T>): void {
    this.responseInterceptors.push(callback);
  }

  async get<T>(
    url: string,
    params?: Record<string, string>,
    options: RequestInit = {}
  ): Promise<ResponseData<T>> {
    return this._request<T>("GET", url, params, options);
  }

  async post<T>(url: string, data?: unknown, options: RequestInit = {}): Promise<ResponseData<T>> {
    return this._request<T>("POST", url, data, options);
  }

  async put<T>(url: string, data?: unknown, options: RequestInit = {}): Promise<ResponseData<T>> {
    return this._request("PUT", url, data, options);
  }

  async patch<T>(url: string, data?: unknown, options: RequestInit = {}): Promise<ResponseData<T>> {
    return this._request("PATCH", url, data, options);
  }

  async delete<T>(
    url: string,
    params?: Record<string, string>,
    options: RequestInit = {}
  ): Promise<ResponseData<T>> {
    return this._request("DELETE", url, params, options);
  }

  private async _request<T>(
    method: string,
    url: string,
    body: unknown,
    options: RequestInit
  ): Promise<ResponseData<T>> {
    let config: RequestConfig = {
      method,
      headers: {
        ...options.headers,
        "Content-Type": "application/json",
      } as Record<string, string>,
      body: body ? JSON.stringify(body) : undefined,
      cache: options.cache ?? "default",
      url,
    };

    // Apply request interceptors
    for (const interceptor of this.requestInterceptors) {
      config = interceptor(config);
    }

    try {
      const response = await fetch(this.baseURL + url, config);

      if (!response.ok) {
        const errorResponse: unknown = await response.json();
        if (isErrorData(errorResponse)) {
          const errorData: ErrorData = errorResponse as ErrorData;
          throw errorData;
        } else {
          throw customErrorData;
        }
      }

      let data = (await response.json()) as ResponseData<T>;

      // Apply response interceptors
      for (const interceptor of this.responseInterceptors) {
        data = interceptor(data) as ResponseData<T>;
      }

      return data;
    } catch (error) {
      console.error("Fetch error:", error);
      throw error;
    }
  }
}
