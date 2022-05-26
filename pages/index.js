import Head from 'next/head'
import Image from 'next/image'
import React, { useState } from 'react';

import { gql, useQuery } from "@apollo/client";
import client from "../apollo-client";

import gql_functions from "../gql-utilities"

import styles from '../styles/Home.module.css'

// Chakra UI Imports
import { Button, ButtonGroup, Icon, Heading, Textarea, VStack, StackDivider, Box } from '@chakra-ui/react'
import { BsPlusCircle } from "react-icons/bs";


export async function getStaticProps() {
    
    const data = await gql_functions.get_articles();
    console.log(data)

    return {
        props: {
            articles: data,
        },
    };
}

const openEditor = () => {

}

export default function Home({ articles }) {
    //const { loading, error, books } = useQuery(GET_BOOKS, { client: client })

    //if (loading) return 'Loading...';
    //if (error) return `Error! ${error.graphQLErrors}`
    const [editing, setEditing] = React.useState(false);


  return (
    <div className={styles.container}>
      <Head>
        <title>Hawaii-CMS</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to Hawaii-CMS!
        </h1>

        <p className={styles.description}>
                  Made with <a href="https://nextjs.org">Next.js</a>, apollo gql, and Azure data gateway.
          
        </p>
              {editing &&
                  <Box backgroundColor="white" padding="20px" width="33%" borderRadius="20px">
                  <VStack width="100%" spacing={0}  borderWidth="5px" borderRadius="10px" divider={<StackDivider borderColor='gray.200' />}>'
                    <Heading borderRadius="5px" textAlign="center" color="white" width="100%" backgroundColor="gray" fontSize='xl'> Create Article </Heading>
                      <Textarea id="title" size="lg" overflow="auto" resize="none" rows={1} placeholder='Title' />
                      <Textarea id="body" size="lg" rows={5} placeholder='Markdown Body' /> 
                          <Button colorScheme='twitter' width="100%" onClick={() => { setEditing(false); gql_functions.create_article(document.getElementById("title").innerHTML, document.getElementById("body").innerHTML); }}> Post </Button>
                  </VStack>
                  </Box>}
              {!editing && <Button onClick={()=>setEditing(true)} size="lg" rightIcon={<BsPlusCircle />}> Create Post </Button>}
              <div className={styles.grid}>
                      {articles.slice(0).reverse().map((article) => (
                          <div key={article.id} className={styles.card}>
                              <Heading> 
                                { article.title }
                              </Heading>
                              <code className={styles.code}>{article.body}</code>
                          </div>

                          ))} 
                     
                      {/*
{ books.map((book) => (
                          <div key={book.id} className={styles.card}>
                              <h3><a href="#country-name" aria-hidden="true" class="aal_anchor" id="country-name"><svg aria-hidden="true" class="aal_svg" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>{book.title}</h3>
                              <p>
                              </p>
                          </div>
))}
                      */}
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}
