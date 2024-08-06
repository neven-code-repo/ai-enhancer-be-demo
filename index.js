import express from "express";
import { ApolloServer } from "apollo-server-express";
import typeDefs from "./src/graphql/schema.js";
import resolvers from "./src/graphql/resolvers.js";
import cors from "cors";

const app = express();
const port = 3001;

async function startApolloServer() {
	const server = new ApolloServer({ typeDefs, resolvers });
	await server.start();
	server.applyMiddleware({ app });
	app.listen(port, () => {
		console.log(`Server running at http://localhost:${port}`);
		console.log(`GraphQL endpoint: http://localhost:${port}${server.graphqlPath}`);
	});
	app.use(
		cors({
			origin: "*", // Allow all origins, should be changed to the frontend URL in production
		})
	);
}

startApolloServer();
