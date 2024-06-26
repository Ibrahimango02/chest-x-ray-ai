/*
 * Author: Allison Cook
 * Date Created: March 2024
 * Purpose: Display the account creation page
 */
'use client';
import Image from 'next/image';
import React, { useState } from 'react';

import Button from '@/components/buttons/Button';
import UnderlineLink from '@/components/links/UnderlineLink';

import { createANewUser } from '../../../../backend/database/backend';

export default function SignUpPage() {
  const [emailError, setEmailError] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSignUp = () => {
    setEmail((document.getElementById('email') as HTMLInputElement).value);
    setPassword(
      (document.getElementById('password') as HTMLInputElement).value,
    );
    const firstName = (document.getElementById('firstName') as HTMLInputElement)
      .value;
    const lastName = (document.getElementById('lastName') as HTMLInputElement)
      .value;
    const userName = firstName + lastName;
    const medInsts = 'MedInsts';
    const isAdmin = false;
    const signUpTxt = document.getElementById('signUpSuccess');

    function verifyFields() {
      if (email === '') {
        setEmailError(true);
      } else {
        setEmailError(false);
      }
      return !emailError;
    }

    if (verifyFields()) {
      createANewUser(
        userName,
        email,
        password,
        firstName,
        lastName,
        medInsts,
        isAdmin,
      )
        .then((_userId) => {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          signUpTxt!.innerHTML = 'Sign Up Successful! Welcome!';
          window.location.href = '/Main';
        })
        .catch((_error) => {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          signUpTxt!.innerHTML = 'Sign Up Failed! Error in User Creation!';
        });
    } else {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      signUpTxt!.innerHTML =
        'Sign Up Failed! Invalid Username/Email or Password!';
    }
  };

  return (
    <main
      className='min-h-screen bg-indigo-100'
      style={{
        backgroundImage:
          'linear-gradient(to bottom right, rgb(224, 231, 255), rgb(165, 180, 252))',
      }}
    >
      <section>
        <div className='layout relative flex min-h-screen flex-col items-center justify-center gap-5 py-2 text-center'>
          <h2 className='text-indigo-500'>Sign up</h2>
          <div className='bg-gray-500'>
            <Image
              //className='flex'
              src='/images/loginImage.png'
              alt='x-ray results'
              sizes='100vw'
              //fill
              style={{ width: '100%', height: 'auto' }}
              width={500}
              height={500}
            />
          </div>
          <div
            className='gap-2 bg-white py-5'
            style={{ width: '35%', height: '50%', zIndex: 5 }}
          >
            {/* input form with elements to create a new user */}
            <form className='mt-3'>
              <label
                className='text-gray-500 '
                style={{ textAlign: 'left', paddingRight: '55%' }}
              >
                Email
              </label>
              <input
                type='text'
                id='email'
                placeholder='Email'
                style={{
                  background: 'url("/images/person.png") no-repeat left',
                  paddingLeft: '10%',
                  backgroundColor: 'rgb(229, 231, 235)',
                  width: '65%',
                }}
              />
              <label
                className='text-gray-500 '
                style={{ textAlign: 'left', paddingRight: '47%' }}
              >
                Password
              </label>
              <input
                type='password'
                id='password'
                placeholder='Password'
                style={{
                  background: 'url("/images/lock.png") no-repeat left',
                  paddingLeft: '10%',
                  backgroundColor: 'rgb(229, 231, 235)',
                  width: '65%',
                }}
              />
              <br></br>
              <label
                className='text-gray-500 '
                style={{ textAlign: 'left', paddingRight: '45%' }}
              >
                First Name
              </label>
              <input
                type='text'
                id='firstName'
                placeholder='First Name'
                style={{
                  background: 'url("/images/person.png") no-repeat left',
                  paddingLeft: '10%',
                  backgroundColor: 'rgb(229, 231, 235)',
                  width: '65%',
                }}
              />
              <br></br>
              <label
                className='text-gray-500 '
                style={{ textAlign: 'left', paddingRight: '45%' }}
              >
                Last Name
              </label>
              <input
                type='text'
                id='lastName'
                placeholder='Last Name'
                style={{
                  background: 'url("/images/person.png") no-repeat left',
                  paddingLeft: '10%',
                  backgroundColor: 'rgb(229, 231, 235)',
                  width: '65%',
                }}
              />
            </form>
            <br></br>

            <Button id='signUpBtn' onClick={onSignUp} variant='primary'>
              Create Account
            </Button>
          </div>
          <div>
            <label id='signUpSuccess'></label>
            <br></br>
          </div>

          <div
            style={{
              paddingLeft: '2%',
              paddingTop: '14%',
              position: 'absolute',
              zIndex: 1,
              width: '37%',
              height: '82%',
            }}
          >
            <br></br>
            <br></br>
            <br></br>
            <div
              className='bg-indigo-500 '
              style={{ width: '100%', height: '60%' }}
            ></div>
          </div>

          <p className='text-gray-500' style={{ zIndex: 2 }}>
            Have an account?
            <br></br>
            <UnderlineLink href='/' className='text-sm text-gray-500'>
              Sign in.
            </UnderlineLink>
          </p>
        </div>
      </section>
    </main>
  );
}
