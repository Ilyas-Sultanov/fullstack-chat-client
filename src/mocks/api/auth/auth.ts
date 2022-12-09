import { rest } from 'msw';

const signInResponse = {
  user: {
    _id: "63808c88d01d737336e01a4a",
    name: 'user1',
    email: 'zerocool174@mail.ru',
    avatar: 'img/no-avatar.jpg',
    roles: [ 'user' ],
    isActivated: true
  },
  accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzgwOGM4OGQwMWQ3MzczMzZlMDFhNGEiLCJuYW1lIjoidXNlcjEiLCJlbWFpbCI6Inplcm9jb29sMTc0QG1haWwucnUiLCJhdmF0YXIiOiJpbWcvbm8tYXZhdGFyLmpwZyIsInJvbGVzIjpbInVzZXIiXSwiaXNBY3RpdmF0ZWQiOnRydWUsImlhdCI6MTY3MDI1NzE1NSwiZXhwIjoxNjcwMjU4OTU1fQ.r3NuVKiKLliHUOtzOjNkXyVfFEY8_sEJ52RRx9ojnSE'
}

export const authHandlers = [
  rest.post("http://localhost:5000/api/auth/login", async (req, res, ctx) => {
    const body: {email: string, password: string} = await req.json();

    if (body.email === 'notRegistred@mail.ru' || body.password === 'invalidPassword') {
      return res(
        ctx.status(401),
        ctx.json({ message: 'Invalid email or password' }),
      )
    }
    else {
      return res(
        ctx.status(200), 
        ctx.json(signInResponse),
      )
    }
  }),

  rest.get('http://localhost:5000/api/auth/refresh', (req, res, ctx) => {
    return res(
      ctx.status(200), 
    )
  }),

  rest.post("http://localhost:5000/api/auth/registration", async (req, res, ctx) => {
    const body: {name: string, email: string, password: string} = await req.json();

    if (body.email === 'existing@mail.ru') {
      return res(
        ctx.status(409),
        ctx.json({ message: 'User with this email already exist' }),
      )
    }
    else {
      return res(
        ctx.status(200), 
        ctx.json({ message: 'You have successfully registered!' }),
      )
    }
  }),

  rest.post("http://localhost:5000/api/auth/forgotPassword", async (req, res, ctx) => {
    const body: {email: string} = await req.json();

    if (body.email === 'notRegistred@mail.ru') {
      return res(
        ctx.status(409),
        ctx.json({ message: 'Email not found!' }),
      )
    }
    else {
      return res(
        ctx.status(200), 
        ctx.json({ message: 'Check your email!' }),
      )
    }
  }), 

  rest.patch("http://localhost:5000/api/auth/resetPassword", async (req, res, ctx) => {
    const body: {resetLink: string, newPassword: string} = await req.json();
    
    if (body.resetLink === '456') {
      return res(
        ctx.status(409),
        ctx.json({ message: 'Invalid or expiration link!' }),
      )
    }
    else {
      return res(
        ctx.status(200), 
        ctx.json({ message: 'Check your email!' }),
      )
    }
  }), 
]