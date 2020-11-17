import { Request , Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';

import User from '../models/User';

export default {

  async index(request: Request, response: Response) {
    const userRepository = getRepository(User);
    const users = await userRepository.find();

    return response.status(200).json(users);
  },

  async show(request: Request, response: Response) {
    const { id } = request.params;    

    const userRepository = getRepository(User);
    const user = await userRepository.findOneOrFail(id);

    return response.status(200).json(user);
  },

  async create(request: Request , response: Response) {
    const { name, email, password, confirmPassword } = request.body;

    const userRepository = getRepository(User);
    const data = { name, email, password, confirmPassword };

    const schema = Yup.object().shape({
      name: Yup
        .string()
        .required('Nome obrigatório.')
        .max(100, 'Tamanho máximo de 100 caracteres.'),
      email: Yup
        .string()
        .required('Email é obrigatório.')  
        .email('Email inválido.'),
      password: Yup
        .string()
        .required('Senha obrigatória.')  
        .min(6, 'Senha deve ter no mínimo 6 caracteres')
        .max(20, 'Senha deve ter no máximo 20 caracteres'),
      confirmPassword: Yup
        .string()
        .required('Confirmação da senha obrigatória.')  
        .oneOf([Yup.ref('password'), ''], "As senhas não correspondem!")
    });

    await schema.validate(data, {
      abortEarly: false,
    }); 

    const user = userRepository.create(data);

    await userRepository.save(user);

    return response.status(201).json(user);

  }
  
}