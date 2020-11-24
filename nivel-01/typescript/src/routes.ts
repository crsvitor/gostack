import { Request, Response } from 'express';
import createUser from './services/CreateUser';

// string, number, boolean, object, array
// interfaces 
export function helloWorld(request: Request, response: Response) {
  const user = createUser({
    email: 'a@hotmail.com',
    password:'123',
    techs: [
      'Node.js', 
      'ReactJs', 
      'React Native', 
      { title: 'JavaScript', experience: 100 },
    ]
  });
  
  return response.json({ message: "Hello World"});
} 