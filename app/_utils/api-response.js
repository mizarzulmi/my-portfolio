// app/api/_utils/api-response.js
import { NextResponse } from "next/server";

class ApiResponse {
  static success(data, metadata = {}) {
    return NextResponse.json({
      success: true,
      data,
      metadata: {
        ...metadata,
        timestamp: new Date().toISOString(),
      },
    });
  }

  static error(code, message, status = 500, details = null) {
    const errorObj = { code, message };
    if (details) errorObj.details = details;

    return NextResponse.json(
      {
        success: false,
        error: errorObj,
      },
      { status }
    );
  }

  static serverError(message = "Internal Server Error") {
    return this.error("INTERNAL_ERROR", message, 500);
  }

  static notFound(message = "Resource not found") {
    return this.error("NOT_FOUND", message, 404);
  }

  static badRequest(message = "Invalid request") {
    return this.error("BAD_REQUEST", message, 400);
  }
}

export default ApiResponse;
