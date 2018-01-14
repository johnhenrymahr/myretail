

export default function getInitialState (source) {
  return {
    ui: {
      apiUrl: source.apiUrl || '/api/lineItem',
      loading: false,
      pageError: false
    },
    data: {}
  }
}  