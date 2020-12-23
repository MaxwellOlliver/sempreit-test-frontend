import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

import { useQuery } from '../../hooks/useQuery';
import { UserContext } from '../../context/UserContext';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { api } from '../../services/api';
import { Container } from './styles';

function SignIn({ history }) {
  const query = useQuery();
  const fallback = query.get('fallback');
  const [email, setEmail] = useState(query.get('email') || '');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({
    email: null,
    password: null,
  });
  const [loading, setLoading] = useState(false);

  const { setUser, setToken } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setErrors((state) => ({ ...state, email: 'Please, type your email' }));
      return;
    }
    if (email && !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/i.test(email)) {
      setErrors((state) => ({ ...state, email: 'Invalid email' }));
      return;
    }

    if (password && password.length < 8) {
      setErrors((state) => ({
        ...state,
        password: 'Password must be at least 8 characters',
      }));
      return;
    }

    if (!password) {
      setErrors((state) => ({
        ...state,
        password: 'Please, type your password',
      }));
      return;
    }

    try {
      setLoading(true);
      const response = await api({
        method: 'post',
        url: '/session',
        data: {
          email,
          password,
        },
      });

      setUser(response.data.user);
      setToken(response.data.token);
      history.push('/products');
    } catch (error) {
      if (error.response.data.field === 'password') {
        setErrors((state) => ({
          ...state,
          password: error.response.data.error,
        }));
        setPassword('');
      } else if (error.response.data.field === 'email') {
        setErrors((state) => ({ ...state, email: error.response.data.error }));
        setEmail('');
      }
      setLoading(false);
    }
  };

  const handleChangeEmail = (text) => {
    if (errors.email) setErrors((state) => ({ ...state, email: null }));

    setEmail(text);
  };

  const handleChangePass = (text) => {
    if (errors.password) setErrors((state) => ({ ...state, password: null }));

    setPassword(text);
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        {fallback === 'true' && (
          <div className="fallback">
            <span>You must be signed in to access the Products page</span>
          </div>
        )}
        <h3>Sign In</h3>

        <Input
          name="email"
          placeholder="Email"
          setValue={handleChangeEmail}
          error={errors.email}
          value={email}
        />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          setValue={handleChangePass}
          error={errors.password}
          value={password}
        />

        <Button type="submit" text="Sign In" isLoading={loading} />
        <span>
          Don't you have a account?
          <Link to="/signup">Create account</Link>
        </span>
      </form>
    </Container>
  );
}

export default SignIn;
