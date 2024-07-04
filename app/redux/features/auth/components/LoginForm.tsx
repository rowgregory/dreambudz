import React, { useState } from 'react';
import { faLock, faLockOpen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { RootState, useAppSelector } from '@/app/redux/store';
import Spinner from '@/app/components/common/Spinner';

const LoginForm = ({ handleSubmit, handleInput, isLoading }: any) => {
  const auth = useAppSelector((state: RootState) => state.auth);
  const [type, setType] = useState(false);

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row items-center gap-3 mt-2"
    >
      <input
        autoComplete="off"
        name="username"
        type="search"
        onChange={handleInput}
        placeholder="Username"
        className="input-box text-lime-400 font-semibold text-sm focus:outline-none h-9 w-40 sm:w-48 rounded-sm px-3 bg-zinc-900 placeholder:text-zinc-600"
      />
      <input
        autoComplete="off"
        onClick={() => setType(true)}
        onKeyDown={() => setType(true)}
        type={type ? 'password' : 'search'}
        name="password"
        onChange={handleInput}
        placeholder="Password"
        className="input-box text-lime-400 font-semibold text-sm focus:outline-none h-9 w-40 sm:w-48 rounded-sm px-3 bg-zinc-900 placeholder:text-zinc-600"
      />
      {isLoading ? (
        <Spinner fill="fill-lime-400" />
      ) : (
        <button type="submit" className="text-sm font-bold">
          <FontAwesomeIcon
            icon={auth.isAuthenticated ? faLockOpen : faLock}
            className="fa-lg text-zinc-400 w-5 hover:text-zinc-500 duration-200"
          />
        </button>
      )}
    </form>
  );
};

export default LoginForm;
