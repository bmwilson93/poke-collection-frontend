const options = {
  headers: {
    'X-Api-Key': process.env.REACT_APP_API_KEY,
  }
}

export const fetchData = async (url) => {
  const response = await fetch(url, options);
  const data = await response.json();

  return data;
}