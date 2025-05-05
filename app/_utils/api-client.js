// app/_utils/api-client.js
import { API_BASE_URL } from "@/app/_config/api";

class ApiError extends Error {
  constructor(message, status, code, details) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

export async function apiClient(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    const result = await response.json();

    // Handle non-2xx responses
    if (!response.ok) {
      throw new ApiError(
        result.error?.message || "Request failed",
        response.status,
        result.error?.code || "API_ERROR",
        result.error?.details
      );
    }

    // Handle business logic errors (success: false)
    if (result.success === false) {
      throw new ApiError(
        result.error?.message || "Operation failed",
        response.status,
        result.error?.code || "OPERATION_FAILED",
        result.error?.details
      );
    }

    // Return successful response
    return {
      data: result.data,
      metadata: result.metadata || {},
      response, // Original response object
    };
  } catch (error) {
    // Handle network errors or JSON parsing errors
    if (error instanceof ApiError) {
      console.error(`API Error [${error.code}]:`, error.message);
      throw error;
    }

    const errorMessage =
      error instanceof Error ? error.message : "Network error";
    throw new ApiError(
      errorMessage,
      500,
      "NETWORK_ERROR",
      error instanceof Error ? error.stack : null
    );
  }
}

// Utility functions for common methods
export const api = {
  get: (endpoint, options = {}) =>
    apiClient(endpoint, { ...options, method: "GET" }),
  post: (endpoint, body, options = {}) =>
    apiClient(endpoint, {
      ...options,
      method: "POST",
      body: JSON.stringify(body),
    }),
  put: (endpoint, body, options = {}) =>
    apiClient(endpoint, {
      ...options,
      method: "PUT",
      body: JSON.stringify(body),
    }),
  delete: (endpoint, options = {}) =>
    apiClient(endpoint, { ...options, method: "DELETE" }),
};
