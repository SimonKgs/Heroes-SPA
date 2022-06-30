import { useContext } from 'react';
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext';

export const LoginPage = () => {

  const { onLogin } = useContext(AuthContext)

  const navigate = useNavigate();

  const handleLogin = () => {

    const lastPath = localStorage.getItem('lastpath') || '/';
    
    onLogin('simon')

    navigate(lastPath, {
      replace: true
    })

  }

  return (
    <div className='container'>
      <h1>Login</h1>
      <hr />
      <button
        className='btn btn-primary'
        onClick={handleLogin}
      >
        Login
      </button>
    </div>
  )
}
