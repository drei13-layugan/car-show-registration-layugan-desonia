
const BASE_URL = import.meta.env.VITE_API_BASE_URL

async function request(path, params) {
  const url = new URL(`${BASE_URL}${path}`)
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      // skip empty filters so the API does not receive "type=" or "status="
      if (value !== '' && value !== null && value !== undefined) url.searchParams.set(key, value)
    })
  }

  let response
  try {
    response = await fetch(url)
  } catch {
    
    throw new Error('Cannot reach the API. Check that the backend is running and the URL in .env.development is correct.')
  }

  if (!response.ok) {
    let detail = ''
    try {
      const problem = await response.json()
      detail = problem.detail || problem.title || ''
    } catch {
      /* body was not JSON */
    }
    throw new Error(detail || `The API returned an error (HTTP ${response.status}).`)
  }

  return response.json()
}

export function getRegistrations({ participantName = '', type = '', status = '', page = 1, pageSize = 10 } = {}) {
  return request('/api/registrations', { participantName: participantName.trim(), type, status, page, pageSize })
}

export function getSummary() {
  return request('/api/registrations/summary')
}