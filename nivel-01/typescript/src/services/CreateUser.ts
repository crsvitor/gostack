// Para criar: name, email, password

// export default function createUser(name: string, email='', password: numebr, okay: boolean) {

interface TechObject {
  title: string;
  experience: number;
}

interface createUserData {
  name?: string;
  email: string;
  password: string;
  techs: Array<string | TechObject>;
  // techs: string[];
}

export default function createUser({name="", email, password}: createUserData) {
  const user = {
    name, 
    email,
    password,
  }

  return user;
}