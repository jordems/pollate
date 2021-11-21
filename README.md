# Pollate

Realtime question and debate platform. More of a learning project playing around with SocketIO's ability to have realtime front-ends, and setting up a CI/CD. I am by no means a UI/UX expert. The functionality was the goal, not the aesthetics.

### Table of Contents

[1 Frameworks](#1-frameworks)

- [1.1 Angular](#11-angular)
- [1.2 NestJS](#12-nestjs)
- [1.3 Nx Monorepo](#13-nx-monorepo)
- [1.4 CircleCI](#14-circleci)

[2 Infrastructure and Deployment](#2-infrastructure-and-deployment)

- [2.1 API](#21-api)
- [2.2 Client App](#22-client-app)
- [2.3 Database](#23-database)

[3 Testing](#3-testing)

## 1 Frameworks

### 1.1 Angular

For the frontend of the app it is making use of Angular for the sake of that it's highly opinionated and allows for very decoupled components. Separating the component logic from layout and styling, and allowing for simple use of dependency injection. Overall this framework is very hardened, and allows for a combination of Client Side Rendering and Server Side Rendering which is the plan in the future when tackling per question seo. Angular supports lazy loading modules which allows for incredible performance when used correctly.

My personal reason for choosing Angular currently is I've heard many good things about it's capabilities and the fact that it is highly opinionated, so there is less opportunity to over analyze code structure as I tend to fall in that trap sometimes.

### 1.2 NestJS

The server code on the api is taking advantage of the NestJS framework as it follows a very similar simple dependance injection schema as Angular. Has absolutely amazing support for things such as gateways, swagger documentation, validators, guards, etc.. Allows for great use of decorators, making development again quite opinionated. Allowing for simple extensibility.

### 1.3 Nx Monorepo

Nrwl's Nx Monorepo framework is by far the most important framework of this project. It structures the overall code and folder structure allowing for affected builds, tests, and deploys. It's main purpose is to increase developer performance and speed up automated CI/CD pipelines. With simple extensibility.

### 1.4 CircleCI

Framework for Continuous Deployment and Integration. It is setup to run a suite of test jobs when committing to a pull request. Then once the pull request is merged into `master` it will automatically deploy the new version to the live site.

## 2 Infrastructure and Deployment

### 2.1 API

Currently just have the one Monolithic API server to handle all server side code. The reason I've done this for now is the app is so simple and doesn't require anything more complex. With the future plans of the project I've used Nx so that the code is decoupled so that I could easily move an separate the Monolithic app into a micro-services based architecture.

It is using AWS Elastic Container Registry to store it's built docker images. Then, makes use of AWS Elastic Beanstalk for hosting the docker container in a horizontally scalable architecture with small instances. Catering to Javascript's single thread.

The [deploy script](tools/deploy/api/deploy.ts) is a little home made special, that makes use of the AWS-SDK on CircleCI to complete the continuous delivery portion of CI/CD.

### 2.2 Client App

The client app is stored in an AWS S3 bucket, which all traffic is first funneled through a AWS CloudFront CDN before it reaches to the bucket. To take advantage of caching.

### 2.3 Database

Using the free tier mongo atlas database. Using simple distributed counters so all required data can be stored on the questions collection without the need for db joins.

## 3 Testing

Wrote unit test for the api features, however not really worrying about testing the frontend for how simple it is. And if this product is to be expanded on the frontend will be re-written.
