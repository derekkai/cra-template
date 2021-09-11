import { useCallback } from 'react'
import { ErrorBoundary as ErrorBoundaryWrapper } from 'react-error-boundary'
import PropTypes from 'prop-types'

const ErrorPage = ({ error, resetErrorBoundary }) => {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  )
}

ErrorPage.propTypes = {
  error: PropTypes.object.isRequired,
  resetErrorBoundary: PropTypes.func.isRequired,
}

const ErrorBoundary = ({ children }) => {
  const resetHandler = useCallback(() => {
    window.location.reload(false)
  }, [])
  return (
    <ErrorBoundaryWrapper FallbackComponent={ErrorPage} onReset={resetHandler}>
      {children}
    </ErrorBoundaryWrapper>
  )
}

ErrorBoundary.propTypes = {
  children: PropTypes.element.isRequired,
}

export default ErrorBoundary
