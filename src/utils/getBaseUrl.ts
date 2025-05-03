export function getBaseUrl() {
  return process.env.BASE_URL || 'http://localhost:3000';
}

export function getAPIUrl() {
  return getBaseUrl() + '/api';
}
