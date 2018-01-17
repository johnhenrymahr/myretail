
export default function getInitialState (source) {
  return {
    ui: {
      apiUrl: source.SERVICE_URL || SERVICE_URL, // defined by webpack define plugin
      loading: false,
      pageError: false,
      hydrated: false
    },
    data: {}
  }
}
