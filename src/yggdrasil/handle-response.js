module.exports = function (req) {
  return req
    .then(res => res.body)
    .catch(err => {
      if (err.response) {
        err.name = err.response.body.error
        err.message = err.response.body.errorMessage
        err.cause = err.response.body.cause
        throw err
      } else {
        throw err
      }
    })
}
