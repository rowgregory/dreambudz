const extractAndDecodeJWT = (token: string) => {
  try {
    const decodedToken = JSON.parse(atob(token.split('.')[1]));

    const currentTimestamp = Math.floor(Date.now() / 1000);
    if (decodedToken.exp && decodedToken.exp < currentTimestamp) {
      return null;
    }

    return true;
  } catch (error: any) {
    console.error('Error decoding JWT:', error.message);
    return null;
  }
};

export default extractAndDecodeJWT;
