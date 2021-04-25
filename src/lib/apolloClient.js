import {ApolloClient, InMemoryCache, createHttpLink, ApolloLink} from '@apollo/client';

const httpLink = createHttpLink({
  uri: 'http://localhost:3000/graphql',
});
const authLink = new ApolloLink((operation, forward) => {
  // Retrieve the authorization token from local storage.
  const token = localStorage.getItem('token');

  // Use the setContext method to set the HTTP headers.
  operation.setContext({
    headers: {
      authorization: token ? `${token}` : ''
    }
  });

  // Call the next link in the middleware chain.
  return forward(operation);
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
