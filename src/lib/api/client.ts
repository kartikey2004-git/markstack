/**
 * Thin fetch wrapper for client-side calls to our own `/api/*` routes.
 *
 * Centralises the "response not ok → user-facing message" mapping that was
 * previously copy-pasted in every hook and page. Callers supply the messages
 * they want shown; this module only decides which one applies to the status.
 */

export class ApiError extends Error {
  readonly status: number;
  /** The `error` field from the JSON body, when the server sent one. */
  readonly serverMessage: string | null;

  constructor(message: string, status: number, serverMessage: string | null) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.serverMessage = serverMessage;
  }
}

export interface ApiErrorMessages {
  /** Used for any failed status that has no more specific message. */
  fallback: string;
  /** Used for 401 responses. */
  unauthorized?: string;
  /** Used for 404 responses. */
  notFound?: string;
}

export function jsonRequestInit(method: string, body?: unknown): RequestInit {
  return {
    method,
    headers: { "Content-Type": "application/json" },
    body: body === undefined ? undefined : JSON.stringify(body),
  };
}

async function readServerMessage(response: Response): Promise<string | null> {
  try {
    const payload = (await response.json()) as { error?: unknown };
    return typeof payload.error === "string" ? payload.error : null;
  } catch {
    return null;
  }
}

async function assertOk(
  input: string,
  init: RequestInit | undefined,
  messages: ApiErrorMessages,
): Promise<Response> {
  const response = await fetch(input, init);
  if (response.ok) return response;

  let message = messages.fallback;
  if (response.status === 401 && messages.unauthorized) {
    message = messages.unauthorized;
  } else if (response.status === 404 && messages.notFound) {
    message = messages.notFound;
  }

  const serverMessage = await readServerMessage(response);
  throw new ApiError(message, response.status, serverMessage);
}

/** Calls an endpoint whose response body is not needed. */
export async function requestOk(
  input: string,
  init: RequestInit | undefined,
  messages: ApiErrorMessages,
): Promise<void> {
  await assertOk(input, init, messages);
}

/** Calls an endpoint and parses its JSON body. */
export async function requestJson<T>(
  input: string,
  init: RequestInit | undefined,
  messages: ApiErrorMessages,
): Promise<T> {
  const response = await assertOk(input, init, messages);
  return (await response.json()) as T;
}
