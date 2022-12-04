async function loginUser(endpoint, userData) {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  const jsonResponse = await response.json();

  if (response.ok) {
    console.log(jsonResponse);

    const user = {
      name: jsonResponse.name,
      email: jsonResponse.email,
      avatar: jsonResponse.avatar,
    };

    const saveUserData = {
      user,
      accessToken: jsonResponse.accessToken,
      credits: jsonResponse.credits,
    };

    return saveUserData;
  }
  const errorMessage = `${jsonResponse.errors[0].message}`;
  throw Error(errorMessage);
}

export default loginUser;
