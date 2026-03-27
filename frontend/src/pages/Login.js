import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, registerUser } from '../utils/api';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await loginUser(email, password);
        navigate('/dashboard');
      } else {
        await registerUser(name, email, password);
        setSuccessMessage('Registration successful! Please login with your credentials.');
        setEmail('');
        setPassword('');
        setName('');
        setError('');
        setTimeout(() => {
          setIsLogin(true);
          setSuccessMessage('');
        }, 2000);
      }
    } catch (err) {
      setError(err);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError('');
    setSuccessMessage('');
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center">{isLogin ? 'Login' : 'Register'}</h2>
              <form onSubmit={handleSubmit}>
                {!isLogin && (
                  <div className="mb-3">
                    <label>Name:</label>
                    <input
                      type="text"
                      className="form-control"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required={!isLogin}
                    />
                  </div>
                )}
                <div className="mb-3">
                  <label>Email:</label>
                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label>Password:</label>
                  <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                {error && <div className="alert alert-danger">{error}</div>}
                {successMessage && <div className="alert alert-success">{successMessage}</div>}
                <button type="submit" className="btn btn-primary w-100" disabled={successMessage}>
                  {isLogin ? 'Login' : 'Register'}
                </button>
              </form>
              <div className="text-center mt-3">
                {isLogin ? (
                  <p>Don't have an account? <button className="btn btn-link p-0" onClick={toggleMode}>Sign up</button></p>
                ) : (
                  <p>Already have an account? <button className="btn btn-link p-0" onClick={toggleMode}>Login</button></p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;