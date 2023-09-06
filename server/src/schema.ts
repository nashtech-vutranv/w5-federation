import { makeExecutableSchema } from '@graphql-tools/schema'
import { PubSub } from 'graphql-subscriptions';

const pubsub = new PubSub();

const messages: any[] = [];
 
const typeDefs = `
  type Message {
    id: ID!
    user: String!
    content: String!
  }

  type Query {
    messages: [Message!]
  }

  type Mutation {
    postMessage(user: String!, content: String!): ID!
  }

  type Subscription {
    messages: [Message!]
  }
`

const subscribers: any[] = [];
const onMessagesUpdate = (fn: any) => subscribers.push(fn);

const resolvers = {
  Query: {
    messages: () => messages,
  },
  Mutation: {
    postMessage: (_: any, {user, content} : {user: string, content: string}) => {
      const id = messages.length;
      messages.push({
        id, 
        user, 
        content
      });
      subscribers.forEach(fn => fn());
      return id; 
    }
  },
  Subscription: {
    messages: {
      subscribe: () => {
        const channel = Math.random().toString(36).slice(2, 15);
        onMessagesUpdate(() => pubsub.publish(channel, { messages }));
        setTimeout(() => pubsub.publish(channel, { messages }), 0);
        return pubsub.asyncIterator(channel);
      }
    }
  }
}

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});