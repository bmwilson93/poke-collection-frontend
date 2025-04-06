import React from 'react'

const ErrorDisplay = ({ submissionError, submissionErrorMessage }) => {
  return (
    <div>{submissionError ? <p className='error-msg'>{submissionErrorMessage}</p> : <></>}</div>
  )
}

export default ErrorDisplay