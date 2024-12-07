const fetchAPI = async (route, method, body) => {
  console.log('fetchAPI')
  try {
    const result = await fetch(`${process.env.REACT_APP_API_PATH}/${route}`, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true

      },
      body: body,
      credentials: "include"
    });
    if (result.ok) {
      const data = await result.json();
      console.log("data:")
      console.log(data);
      return data;
    }
    return null;
  } catch (error) {
    console.log(error);
    return null
  }
}

module.exports = {fetchAPI}