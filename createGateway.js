const { readFileSync } = require("fs");
const { ApolloServer } = require("apollo-server");
const { ApolloGateway } = require("@apollo/gateway");
const supergraphSdl = readFileSync("./supergraph.graphql").toString();

const gateway = new ApolloGateway({
  supergraphSdl,
});

const server = new ApolloServer({ gateway });
server.listen(4001, () => console.log(4001));
