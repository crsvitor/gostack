const express = require('express');
const cors = require('cors');
const { uuid, isUuid } = require('uuidv4');

const app = express();

app.use(cors());
app.use(express.json());

/*
  Métodos HTTP:

  GET: buscar informações do back-end
  POST: Criar uma informaçãp no back-end
  PUT/PATCH: Alterar uma informação no back-end
    PUT -> Todos os dados
    PATCH -> Somente um dado específico
  DELETE: Deletar uma informação no back-end



  Tipos de parâmetros:

  Query Params: Filters e paginação ?NomeDaQuery=ValorDaQuery.
  Route Params: Identificar recursos (Atualizar/Deletar).
  Request body: Conteúdo na hora de criar ou editar um recurso (json).

  Middleware:

  Interceptador de requisições que interromper totalmente a requisição ao alterar dados da requisição.
  Quando codamos após o next, estamos atribuindo um código que será executado depois da próxima middleware ou função final
  ex: início da middleware, next, próxima middleware da rota, resto do código da primeira middleware.
*/

const projects = [];

function logRequests(request, response, next) {
  const { method, url } = request;

  const logLabel = `[${method.toUpperCase()}] ${url}`;

  console.time(logLabel);

  next(); // Próximo middleware

  // resto do código sendo executado após a próxima middleware
  console.timeEnd(logLabel);
}

function validateProjectId(request, response, next) {
  const { id } = request.params;

  if(!isUuid(id)) {
    return response.status(400).json({ error: 'Invalid project ID.' });
  }

  return next();
}

//app.use('/projects', logRequests);
app.use(logRequests);

app.get('/projects', (request, response) => {
  const { title } = request.query;

  const results = title
    ? projects.filter(project => project.title.includes(title))
    : projects;

  return response.status(200).json(results);
});

app.post('/projects', (request, response) => {
  const { title, owner } = request.body;

  const project = { id: uuid(), title, owner }

  projects.push(project);

  return response.status(201).json(project);
});

app.put('/projects/:id', validateProjectId, (request, response) => {
  const { id } = request.params;
  const { title, owner } = request.body;
  
  const projectIndex = projects.findIndex(project => project.id === id);

  if (projectIndex < 0) {
    return response.status(400).json({error: 'Project not found.'});
  }

  const project = {
    id,
    title,
    owner,
  };
  
  projects[projectIndex] = project;

  return response.json(project);
});

app.delete('/projects/:id', validateProjectId, (request, response) => {
  const { id } = request.params;

  const projectIndex = projects.findIndex(project => project.id === id);

  if (projectIndex < 0) {
    return response.status(400).json({error: 'Project not found.'});
  }
  
  projects.splice(projectIndex, 1);
  
  return response.status(204).send();
});

app.listen(3333, () => {
  console.log('Back-end started!');
});