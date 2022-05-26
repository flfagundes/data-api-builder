import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const httpLink = new HttpLink({
    uri: "https://localhost:5001/graphql/",
    credentials: 'same-origin',
    headers: {
        'Content-Type': 'application/graphql',
        'X-MS-CLIENT-PRINCIPAL': 'eyJhdXRoX3R5cCI6ImFhZCIsImNsYWltcyI6W3sidHlwIjoiYXVkIiwidmFsIjoiYmJmZjhmZGItYzA3My00NDY2LTk0NjMtMTcwNzQ0Y2JkMmUyIn0seyJ0eXAiOiJpc3MiLCJ2YWwiOiJodHRwczpcL1wvbG9naW4ubWljcm9zb2Z0b25saW5lLmNvbVwvMjkxYmYyNzUtZWE3OC00Y2RlLTg0ZWEtMjEzMDlhNDNhNTY3XC92Mi4wIn0seyJ0eXAiOiJpYXQiLCJ2YWwiOiIxNjM3MDQzMjA5In0seyJ0eXAiOiJuYmYiLCJ2YWwiOiIxNjM3MDQzMjA5In0seyJ0eXAiOiJleHAiLCJ2YWwiOiIxNjM3MDQ4MTkzIn0seyJ0eXAiOiJhaW8iLCJ2YWwiOiJBVFFBeVwvOFRBQUFBR2ZcL1cwSTdzdE1yM1lINWlIRnZFU2llMzgrSU5QVCtaZlwvcCtCeVlqVEU1VHNmZVp1ZFwvNWdxcnBCcEMxcVVzRCJ9LHsidHlwIjoiYXpwIiwidmFsIjoiYTkwM2UyZTYtZmQxMy00NTAyLThjYWUtOWUwOWY4NmI3YTZjIn0seyJ0eXAiOiJhenBhY3IiLCJ2YWwiOiIxIn0seyJ0eXAiOiJuYW1lIiwidmFsIjoiU2VhbiJ9LHsidHlwIjoiaHR0cDpcL1wvc2NoZW1hcy5taWNyb3NvZnQuY29tXC9pZGVudGl0eVwvY2xhaW1zXC9vYmplY3RpZGVudGlmaWVyIiwidmFsIjoiOTg3ZmNiZDgtZjA1ZS00MWFiLWFmYzEtN2M2MzRmMTMzZGQ4In0seyJ0eXAiOiJwcmVmZXJyZWRfdXNlcm5hbWUiLCJ2YWwiOiJzZWFuQGxlb25hcmRzZWFubWUub25taWNyb3NvZnQuY29tIn0seyJ0eXAiOiJyaCIsInZhbCI6IjAuQVRZQWRmSWJLWGpxM2t5RTZpRXdta09sWi1iaUE2a1RfUUpGaks2ZUNmaHJlbXcyQUdBLiJ9LHsidHlwIjoiaHR0cDpcL1wvc2NoZW1hcy5taWNyb3NvZnQuY29tXC9pZGVudGl0eVwvY2xhaW1zXC9zY29wZSIsInZhbCI6IkdyYXBoUUwuUmVhZFdyaXRlIn0seyJ0eXAiOiJodHRwOlwvXC9zY2hlbWFzLnhtbHNvYXAub3JnXC93c1wvMjAwNVwvMDVcL2lkZW50aXR5XC9jbGFpbXNcL25hbWVpZGVudGlmaWVyIiwidmFsIjoiQWNfMlZJU1F3bUctZ2lTMkhiMWhFS1F2TEtCQWk5MjNrSzhpSHFKWlVaUSJ9LHsidHlwIjoiaHR0cDpcL1wvc2NoZW1hcy5taWNyb3NvZnQuY29tXC9pZGVudGl0eVwvY2xhaW1zXC90ZW5hbnRpZCIsInZhbCI6IjI5MWJmMjc1LWVhNzgtNGNkZS04NGVhLTIxMzA5YTQzYTU2NyJ9LHsidHlwIjoidXRpIiwidmFsIjoiX3NTUDNBd0JZMFN1Y3VxcUp5akVBQSJ9LHsidHlwIjoidmVyIiwidmFsIjoiMi4wIn1dLCJuYW1lX3R5cCI6Imh0dHA6XC9cL3NjaGVtYXMueG1sc29hcC5vcmdcL3dzXC8yMDA1XC8wNVwvaWRlbnRpdHlcL2NsYWltc1wvbmFtZSIsInJvbGVfdHlwIjoiaHR0cDpcL1wvc2NoZW1hcy5taWNyb3NvZnQuY29tXC93c1wvMjAwOFwvMDZcL2lkZW50aXR5XC9jbGFpbXNcL3JvbGUifQ=='
    },
    //fetchOptions: {
    //    mode: 'no-cors'
    //}
})

const client = new ApolloClient({
    cache: new InMemoryCache({
        addTypename: false
    }),
    link: httpLink,
});

//const client = new ApolloClient({
//    uri: "https://localhost:5001/graphql",
//    cache: new InMemoryCache(),
//    rejectUnauthorized: false,
    
//});

export default client;