const { readFileSync } = require("fs");
const { ApolloServer } = require("apollo-server-express");
const { ApolloServerPluginDrainHttpServer } = require("apollo-server-core");
const { ApolloGateway } = require("@apollo/gateway");
const express = require("express");
const http = require("http");
const supergraphSdl = readFileSync("./supergraph.graphql").toString();

async function startApolloServer(typeDefs, resolvers) {
  const gateway = new ApolloGateway({
    supergraphSdl,
  });
  const app = express();
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    gateway,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();
  server.applyMiddleware({ app });
  await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

startApolloServer();
