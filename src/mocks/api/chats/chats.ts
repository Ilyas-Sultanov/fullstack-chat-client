import { rest } from 'msw';
import { dataChats1, dataChats2 } from './groupChatContacts';
import { dataUsers1, dataUsers2 } from './userContacts';
import { userChats } from './userChats';
import { IChat } from '../../../types/chat';


export const chatHandlers = [
  rest.get("http://localhost:5000/api/chat/search", async (req, res, ctx) => {
    const name = req.url.searchParams.get('name');
    const page = req.url.searchParams.get('page');
    // const limit = req.url.searchParams.get('limit'); 
        
    if (name === 'test group chat' && Number(page) === 1) {
      return res(
        ctx.status(200),
        ctx.json(dataChats1),
      )
    }

    if (name === 'test group chat' && Number(page) === 2) {
      return res(
        ctx.status(200),
        ctx.json(dataChats2),
      )
    }

    return res(
      ctx.status(404),
      ctx.json({message: 'Not found'}),
    )
  }),

  rest.get("http://localhost:5000/api/users", async (req, res, ctx) => {
    const name = req.url.searchParams.get('name');
    const page = req.url.searchParams.get('page');
    // const limit = req.url.searchParams.get('limit'); 
        
    if (name === 'user' && Number(page) === 1) {
      return res(
        ctx.status(200),
        ctx.json(dataUsers1),
      )
    }

    if (name === 'user' && Number(page) === 2) {
      return res(
        ctx.status(200),
        ctx.json(dataUsers2),
      )
    }

    return res(
      ctx.status(404),
      ctx.json({message: 'Not found'}),
    )
  }),

  rest.get("http://localhost:5000/api/chat", async (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(userChats),
    )
  }),

  rest.post("http://localhost:5000/api/chat/groupCreate", async (req, res, ctx) => {
    const { name }:{ name: string } = await req.json();

    return res(
      ctx.status(200),
    )
  }),
]



