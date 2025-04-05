// fetchAPI
// Makes calls to the backend API for user related functionaolity
// always returns an object {}

const fetchAPI = async (route, method, body) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_PATH}/${route}`, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: body,
      credentials: "include"
    });


    const data = await response.json().catch(() => ({})); 

    return data;

  } catch (error) {
    console.log(error);
    return {error: error}
  }
}

module.exports = {fetchAPI}