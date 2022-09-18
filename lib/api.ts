export class ApiError extends Error {
  status: number;
  constructor(url: string, status: number) {
    super(`'${url}' returned ${status}`)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApiError)
    }
    this.name = 'ApiError'
    this.status = status
  }
}

type fetchOptions = {
  method?: "POST" | "GET" | "PATCH" | "PUT" | 'DELETE',
  headers?: any,
  body?: string,
}

export async function fetchJson(url: string, options?: fetchOptions) {
  const response = await fetch(url, options);

  if (!response.ok) {
    throw new ApiError(url, response.status);
  }

  return await response.json();
}

