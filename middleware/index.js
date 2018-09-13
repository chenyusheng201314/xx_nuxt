export default function ({ store, error }) {
  if (!store.state.posts) {
    error({
      message: 'You are not connected',
      statusCode: 403
    })
  }
}
