const express = require('express');
const {  graphqlExpress, graphiqlExpress, ApolloServer, gql } = require('apollo-server-express');
const { makeExecutableSchema, mergeSchemas } = require('graphql-tools');

class SA_Graphql {
    constructor() {
        const _config = require('./config')
        this.config = Object.assign({}, _config, Sapp.config.graphql||{});
        this.schemas = [
            this.helloSchema()
        ]       
        
        let server = new ApolloServer({schema : this.helloSchema()});

        Sapp['Core/Hook'].Action.add('Www/Init', async (args) => {
            server.applyMiddleware({ app : Sapp['Core/Www'].app });
        })

        this.server = server
    }

    helloSchema() {
        const typeDefs = gql`
            type Query {
                hello: String
            }
            `;

            // Provide resolver functions for your schema fields
        const resolvers = {
            Query: {
                hello: () => 'Hello world11!',
            },
        };

        const schema = makeExecutableSchema({
            typeDefs: typeDefs,
            resolvers: resolvers
        });

        return schema
    }

    addSchema(schemaNew) {
        const schema = mergeSchemas({
            schemas: [
                ...this.schemas,
                schemaNew
            ],
            // resolvers: resolvers2
          });

        this.server.schema = schema
    }


    async init() {
        console.debug('SA_Graphql Init')
        
        await Sapp['Core/Hook'].Action.do('Graphql/Init')

        // const typeDefs = gql`
        //     type Query {
        //         hello2: String
        //     }
        //     `;

        //     // Provide resolver functions for your schema fields
        // const resolvers = {
        //     Query: {
        //         hello2: () => 'Hello world!',
        //     },
        // };

        // const schema2 = makeExecutableSchema({
        //     typeDefs: typeDefs,
        //     resolvers: resolvers
        // });
        


          
        // const server = new ApolloServer({ schema: schema });
        // const app = express();
        // server.applyMiddleware({ app : Sapp.Www.app });
    }

}
module.exports = SA_Graphql