const axios = require('axios');
const Dev = require('../models/Dev')
const parseStringAsArray = require('../utils/parseStringAsArray');

// Controllers são uma abstração na parte de back-end
// São criados um para cada recurso do sistema, no caso os desenvolvedores
// normalmente possuem no maximo  5 funções: index, show, store, update, destroy
// index => mostrar uma lista de recursos
// show =>  mostrar uma unica recurso
// store => criar uma recurso
// update => atualizar uma recurso
// destroy => destruir uma recurso

module.exports = {
  async index(request, response){
      const devs = await Dev.find();

      // exemplo busca filtrada
      //    const devs = await Dev.find({
      //        name: 'Augusto',
      //    });

      return response.json(devs);
  },

  async store(request, response) {
    //Do corpo da requisição, pega as 4 seguintes informações
    const { github_username, techs, latitude, longitude } = request.body;
    
    //Busca no banco de dados um dev a partir do github_username
    let dev = await Dev.findOne({ github_username });
    
    //se o dev não existir no banco de dados, cria um novo registro
    if (!dev){
      // utilizando o axios, busca os dados dos dev pela api do github 
      const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
      // com a resposta da api, pega o nome (caso não exista, pega o login), avatar_url e a bio
      const { name = login, avatar_url, bio } = apiResponse.data;
      // divide a string de techs do corpo da requisição, em um array
      const techsArray = parseStringAsArray(techs);
      // cria um objeto location para geolocalização, seguindo o PointSchema
      const location = {
        type: 'Point',
        coordinates: [longitude, latitude],
      };
      // cria o dev no Banco de dados seguindo o schema dentro de models
      dev = await Dev.create({
        github_username,
        name,
        avatar_url,
        bio,
        techs: techsArray,
        location,
      })
    }

    return response.json(dev);
  },

  async update(){
    // atualizar os dados de um unico dev
  },

  async destroy(){
    // deletar o egistro de um dev
  },
}


// async = diz que a função é assincrona, e que partes de seu codigo
//         podem demorar mais que o tempo de execução do servidor.

// await = diz que a função/comando seguinte pode demorar, e que o servidor 
//         deve esperar a resposta para proseguir a execução.