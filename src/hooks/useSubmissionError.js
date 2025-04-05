import { useState, useEffect } from 'react'

export const useSubmissionError = () => {
  const [submissionError, setSubmissionError] = useState(false);
  const [submissionErrorMessage, setSubmissionErrorMessage] = useState('');

  const showError = (message) => {
    setSubmissionError(true);
    setSubmissionErrorMessage(message);
  }

  const clearError = () => {
    setSubmissionError(false);
    setSubmissionErrorMessage('');
  }

  return { submissionError, submissionErrorMessage, showError, clearError };
};