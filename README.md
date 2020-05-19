# API de cadastro de projetos, cadastro e login de usuários (PostgreSQL rodando no RDS da AWS)

## Objetivos

- Desenvolver uma API, utilizando o Sequelize, integrando o PostgreSQL (instância RDS da AWS), ao Node.js.

- Utilizar login seguro autenticando com JWT.

- Desenvolver rotas protegidas por middlewares que verificam o usuário logado.

- Criar relacionamentos utilizando Sequelize e PostgreSQL.

## Descrição

Esse projeto integra o Node.js à uma instância RDS da AWS. O BD utilizado na implementação do código foi o PostgreSQL.

A API está utilizando JWT para autenticar os usuários. Foram criadas rotas que necessitam que o usuário esteja logado para serem acessadas.

![](https://github.com/AlbertDev33/Autenticacao-Com-JWT/blob/master/img/JWT.PNG)

Os dados para login estão sendo requisitados através de Basic Authentication para melhorar a segurança no tráfego das informações dos usuários.

![](https://github.com/AlbertDev33/Autenticacao-Com-JWT/blob/master/img/Login.PNG)
![](https://github.com/AlbertDev33/Autenticacao-Com-JWT/blob/master/img/CodigoLogin.PNG)

As requisições de presquisa retornam apenas as informações necessárias, sem o retorno de informações sensíveis, como o password do usuário ou algum token.

![](https://github.com/AlbertDev33/Autenticacao-Com-JWT/blob/master/img/Pesquisa.PNG)
![](https://github.com/AlbertDev33/Autenticacao-Com-JWT/blob/master/img/CodigoPesquisa.PNG)

O usuário pode resetar a senha recebendo um e-mail com um token, que deverá ser informado no momento do reset do password. Esse token tem a expiração de 1 hora. Foi utilizado o Nodemailer para o envio dos e-mail's.

![](https://github.com/AlbertDev33/Autenticacao-Com-JWT/blob/master/img/Reset.PNG)

## Recursos utilizados

Instância RDS da AWS rodando o PostegreSQL

Nodemailer.

JWT.

## Por que usar o RDS?

O RDS é um serviço de banco de dados da AWS que entrega uma instância pronta e configurada para o cliente apenas inserir os recursos desejados nesse banco. Em um ambiente de produção, a agilidade para subir uma instância de BD pode ser bastante vantajosa.

O RDS permite diversas configurações automatizadas, sem a necessidade da ação do desenvolvedor, como por exemplo, snapshots, agendamento de janeja de manutenção, autoscaling de recursos e outros.

Uma das maiores vantagens que eu vejo na utilização do RDS é a possibilidade de Alta Disponibilidade, ou seja, nessa configuração seu BD tem uma disponibilidade de 99,99% do tempo, ou seja, é praticamente impossível que esse recurso fique fora, ou seja, garantindo que sua aplicação praticamente nunca tenha indisponibilidade por causa do BD.

## Algumas observações importantes

A região escolhida para rodar o RDS foi a Virgínia. Isso pode causar maior latência nas respostas. Em um projeto rodando em produção, pode ser verificada a utilização da região de São Paulo, apesar do maior preço nesta.

# References

[Sequelize](https://sequelize.org/master/manual/model-basics.html#data-types)

[Informações Sobre o RDS](https://aws.amazon.com/pt/rds/)

[Nodemailer](https://nodemailer.com/about/)

[JWT](https://jwt.io/)
