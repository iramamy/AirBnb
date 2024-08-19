"use server";

import { cookies } from "next/headers";

export async function handleLogin(
  userId: string,
  accessToken: string,
  refreshToken: string) 
  {
  cookies().set('session_userid', userId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7, // one week
    path: '/',
    sameSite: 'lax'
  });
  cookies().set('session_access_token', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60, // 1h
    path: '/',
    sameSite: 'lax'
  });
  cookies().set('session_refresh_token', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60, // 1h
    path: '/',
    sameSite: 'lax'
  });
  // Log the cookies being set in handleLogin
  console.log('Setting session_userid:', userId);
  console.log('Setting session_access_token:', accessToken);
  console.log('Setting session_refresh_token:', refreshToken);

};

// Clear session for log out
export async function resetAuthCookes() {

  cookies().set("session_userid", '');
  cookies().set("session_access_token", '');
  cookies().set("session_refresh_token", '');
  
};


export async function getUserId() {
  const userId = cookies().get("session_userid")?.value
  console.log('Retrieved session_userid:', userId);
  return userId ? userId : null
}

export async function getAccessToken() {
  const accessToken= cookies().get("session_access_token")?.value;

  return accessToken
}