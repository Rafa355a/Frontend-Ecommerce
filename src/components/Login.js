// src/components/Login.js

import { GoogleLogin } from 'react-google-login';

const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

function Login() {
  const responseGoogle = (response) => {
    console.log(response);
  };

  return (
    <div>
      <h2>Login</h2>
      <GoogleLogin
        clientId={CLIENT_ID}
        buttonText="Sign in with Google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
      />
    </div>
  );
}

export default Login;
