# Pollate

Realtime question and debate platform.

### Table of Contents

[1 Frameworks](#1-frameworks)

- [1.1 Angular](#11-angular)
- [1.2 NestJS](#12-nestjs)
- [1.3 Nx Monorepo](#13-nx-monorepo)
- [1.4 CircleCI](#14-circleci)
- [1.5 SocketIO](#15-socketio)
- [1.6 Prisma](#16-prisma)

[2 Infrastructure and Deployment](#2-infrastructure-and-deployment)

- [2.1 API]()
- [2.2 Client App]()
- [2.3 Database]()

[3 Testing](#3-testing)

## 1 Frameworks

### 1.1 Angular

For the frontend of the app it is making use of Angular for the sake of that it's highly opinionated allows for very decoupled components. Separating the component logic from layout and styling, and allowing for simple use of dependency injection. Overall this framework is very hardened, and allows for a combination of Client Side Rendering and Server Side Rendering which is the plan in the future when tackling seo. Angular supports lazy loading modules which allows for incredible performance when used correctly.

My personal reason for choosing Angular currently is I've heard many good things about it's capabilities and the fact that it is highly opinionated, so there is less opportunity to over analyze code structure as I tend to fall in that trap sometimes c: - Jordan

### 1.2 NestJS

The server code on the api is taking advantage of the NestJS framework as it follows a very similar simple dependance injection schema as Angular. Has absolutely amazing support for things such as gateways, swagger documentation, validators, guards, etc.. Allows for great use of decorators, making development again quite opinionated. Allowing for simple extensibility.

### 1.3 Nx Monorepo

Nrwl's Nx Monorepo framework is by far the most important framework of this project. It structures the overall code and folder structure allowing for affected builds, tests, and deploys. It's main purpose is to increase multi-developer performance and speed up automated CI/CD pipelines. With simple extensibility.

### 1.4 CircleCI

### 1.5 SocketIO

### 1.6 Prisma

STILL TODO

This project was generated using [Nx](https://nx.dev)

- [Angular](https://angular.io)
- [Nest](https://nestjs.com)

## 2 Infrastructure and Deployment

### 2.1 API

Currently just have the one Monolithic API server to handle all server side code. The reason I've done this for now is the app is so simple and doesn't require anything more complex. With the future plans of the project I've used Nx so that the code is decoupled so that I could easily move an separate the Monolithic app into a micro-services based architecture.

It is using AWS Elastic Container Registry to store it's built docker images. Then, makes use of AWS Elastic Beanstalk for hosting the docker container in a horizontally scalable architecture with small instances. Catering to Javascript's single thread.

The [deploy script](tools/deploy/api/deploy.ts) is a little home made special, that makes use of the AWS-SDK on CircleCI to complete the continuous delivery portion of CI/CD.

### 2.2 Client App

### 2.3 Database

## 3 Testing
