export const injectParamsToPath = (endpoint= '', args = {}) => {
  return endpoint.concat(new URLSearchParams(args).toString());
}
