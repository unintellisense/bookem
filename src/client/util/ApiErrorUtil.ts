export function apiErrorToText(e) {
  return (e.response && e.response.data && Array.isArray(e.response.data)) ?
    e.response.data.join('\n')
    : e.message;
}