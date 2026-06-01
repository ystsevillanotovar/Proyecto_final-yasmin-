export const useApi = () => {
  const { $api } = useNuxtApp()

  const get = (endpoint, options = {}) => {
    return $api(endpoint, { ...options, method: 'GET' })
  }

  const post = (endpoint, body, options = {}) => {
    return $api(endpoint, { ...options, method: 'POST', body })
  }

  const put = (endpoint, body, options = {}) => {
    return $api(endpoint, { ...options, method: 'PUT', body })
  }

  const patch = (endpoint, body, options = {}) => {
    return $api(endpoint, { ...options, method: 'PATCH', body })
  }

  const del = (endpoint, options = {}) => {
    return $api(endpoint, { ...options, method: 'DELETE' })
  }

  return {
    get,
    post,
    put,
    patch,
    delete: del,
    api: $api
  }
}
