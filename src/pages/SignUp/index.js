import React, { useState } from 'react';
import Input from '../../components/Input';
import { Link } from 'react-router-dom';
import { api } from '../../services/api';

import { Container } from '../SignIn/styles';
import Button from '../../components/Button';

function SignUp({ history }) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({
    name: null,
    email: null,
    password: null,
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) {
      setErrors((state) => ({ ...state, name: 'Please, type your name' }));
      return;
    }

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

    if (confirmPassword !== password) {
      setErrors((state) => ({
        ...state,
        confirmPassword: 'Passwords must be equals',
      }));
      return;
    }

    try {
      setLoading(true);
      await api({
        method: 'post',
        url: '/signup',
        data: {
          name,
          email,
          password,
        },
      });

      history.push(`/signin?email=${email}`);
    } catch (error) {
      if (error.response.data.field === 'email') {
        setErrors((state) => ({ ...state, email: error.response.data.error }));
        setEmail('');
        setLoading(false);
      }
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

  const handleChangeConfirmPass = (text) => {
    if (errors.confirmPassword)
      setErrors((state) => ({ ...state, confirmPassword: null }));

    setConfirmPassword(text);
  };

  const handleChangeName = (text) => {
    if (errors.name) setErrors((state) => ({ ...state, name: null }));

    setName(text);
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <h3>Sing Up</h3>

        <Input
          name="name"
          placeholder="Name"
          setValue={handleChangeName}
          error={errors.name}
          value={name}
        />

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

        <Input
          type="password"
          name="confirm-password"
          placeholder="Confirm password"
          setValue={handleChangeConfirmPass}
          error={errors.confirmPassword}
          value={confirmPassword}
        />

        <Button type="submit" text="Sign Up" isLoading={loading} />
        <span>
          Already have a account?
          <Link to="/signin">Sign in</Link>
        </span>
      </form>
    </Container>
  );
}

export default SignUp;
