import { gql } from "apollo-server-express";

const typeDefs = gql`
	type Query {
		enhanceText(text: String!, type: String!): EnhancedText!
	}

	type EnhancedText {
		result: String!
	}
`;

export default typeDefs;
