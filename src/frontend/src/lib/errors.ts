export function normalizeError(error: unknown): string {
  if (typeof error === "string") {
    return error;
  }

  if (error instanceof Error) {
    const message = error.message;

    if (message.includes("Age must be 65 or older")) {
      return "You must be 65 years or older to use this service.";
    }

    if (message.includes("already exists")) {
      return "You have already completed your check-in for today. You can view your submitted answers.";
    }

    if (message.includes("Unauthorized")) {
      return "Please sign in to continue.";
    }

    if (message.includes("Actor not available")) {
      return "Connection issue. Please try again.";
    }

    return message;
  }

  return "An unexpected error occurred. Please try again.";
}
