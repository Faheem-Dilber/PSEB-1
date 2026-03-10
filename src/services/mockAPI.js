// Mock API service for authentication
export const mockLoginAPI = async (username, password) => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  // Mock valid credentials
  const validCredentials = {
    username: "kminchelle",
    password: "0lelplR",
  };

  if (
    username.toLowerCase() === validCredentials.username &&
    password === validCredentials.password
  ) {
    // Successful login response
    return {
      ok: true,
      data: {
        id: 15,
        username: "kminchelle",
        email: "kminchelle@qq.com",
        firstName: "Jeanne",
        lastName: "Halvorson",
        gender: "female",
        image: "https://i.dummyjson.com/data/u/15/profile_img.jpg",
        accessToken:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUsInVzZXJuYW1lIjoia21pbmNoZWxsZSIsImVtYWlsIjoia21pbmNoZWxsZUBxcS5jb20iLCJpYXQiOjE2NjMzOTM0OTd9",
        refreshToken:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUsInVzZXJuYW1lIjoia21pbmNoZWxsZSIsImVtYWlsIjoia21pbmNoZWxsZUBxcS5jb20iLCJpYXQiOjE2NjMzOTM0OTd9",
      },
    };
  } else {
    // Failed login response
    return {
      ok: false,
      data: {
        message: "Invalid credentials. Please use kminchelle / 0lelplR",
      },
    };
  }
};
