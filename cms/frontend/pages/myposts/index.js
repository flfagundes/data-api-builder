// Next Imports
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

// React Imports
import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

// Styles
import styles from '../../styles/Home.module.css'
import mdStyles from '../../styles/github-markdown.module.css'

// Chakra UI Imports
import { Button, ButtonGroup, Icon, Heading, Textarea, VStack, StackDivider, Box, CircularProgress, useColorModeValue, Text, Tooltip, Tag, HStack } from '@chakra-ui/react'
import { BsPlusCircle, BsTrash } from "react-icons/bs";

// Module Imports
//import { gql_functions as func } from "../../utils/gql"
import { rest_functions as func } from "../../utils/rest"
import { human_time_diff } from "../../utils/misc"
import Footer from "../../components/footer"

// Welcome UI Imports
import { MarkdownEditor } from '@welcome-ui/markdown-editor'
import { Field } from '@welcome-ui/field'
import { createTheme, WuiProvider } from '@welcome-ui/core'


export default function MyPosts({ user, setUser, accessToken, cacheChecked }) {
    const [articles, setArticles] = useState([]);
    const [isFetched, setIsFetched] = useState(false);
    const [editing, setEditing] = useState(false);
    const [titleInput, setTitleInput] = useState("");
    const [bodyInput, setBodyInput] = useState("");

    // Utility function for (re)fetching articles
    const fetch_articles = async () => {
        func.get_my_articles(accessToken).then(data => {
            if (data != null && data != undefined) {
                setArticles(data);
            } else {
                console.log('null/undefined data')
                // let the loader know to stop on edge case of no data
                setIsFetched(true);
            }
        }).catch(err => {
            console.log(err);
            setIsFetched(true);
        });
    }

    // Initial data fetching (wait for cache to be checked)
    useEffect(() => {
        if (!isFetched && cacheChecked) {
            fetch_articles();
        }
    }, [cacheChecked])

    // Remove loading animation on data being fetched
    useEffect(() => {
        if (cacheChecked) {
            setIsFetched(true);
        }
    }, [articles])

    // Create an article and trigger data refetch, which triggers page rerender
    const post = async () => {
        closeEditor();
        setIsFetched(false); //triggers loading animation
        await func.create_article(accessToken, titleInput, bodyInput);
        await fetch_articles();
    }

    // Utility function for closing the editor interface
    const closeEditor = () => {
        setEditing(false);
        setTitleInput("");
        setBodyInput("");
    }
    const basecolor = useColorModeValue('whitesmoke', 'gray.800');
    const bgcolor = useColorModeValue('white', 'gray.800');
    const codebgcolor = useColorModeValue('#fafafa', 'black');

    return (
        <Box bg={basecolor} className={styles.container}>
            <Head>
                <title>Hawaii-CMS</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <Box bg={bgcolor} className={styles.header}>
                    <h1 className={styles.title}>
                        View Your Posts
                    </h1>

                    <p className={styles.description}>
                        See all your posts, both draft and published!

                    </p>
                </Box>
                {user != null && editing &&
                    <Box bg={bgcolor} padding="20px" width="50%" borderRadius="20px" margin="2rem 0">
                        <VStack width="100%" spacing={0} alignItems="none" borderWidth="5px" borderRadius="10px" divider={<StackDivider borderColor='gray.200' />}>
                            <Heading padding="5px" borderRadius="5px" textAlign="center" color="white" width="100%" backgroundColor="gray" fontSize='xl'> Create Article </Heading>
                            <Textarea value={titleInput} onChange={(e) => setTitleInput(e.target.value)} id="title" size="lg" overflow="auto" resize="none" rows={1} placeholder='Title' />
                            <Textarea value={bodyInput} onChange={(e) => setBodyInput(e.target.value)} id="body" size="lg" rows={5} placeholder='Markdown Body' />
                            <ButtonGroup isAttached colorScheme="twitter">
                                <Button variant="outline" width="50%" onClick={closeEditor} leftIcon={<BsTrash />}>Discard</Button>
                                <Button colorScheme='twitter' width="50%" onClick={post}> Post </Button>
                            </ButtonGroup>

                        </VStack>
                    </Box>}
                {user != null && !editing && <Button onClick={() => setEditing(true)} size="lg" margin="2rem 0" rightIcon={<BsPlusCircle />}> Create Post </Button>}
                {/*<WuiProvider theme={createTheme()}>
                <Field label="Markdown Editor">
                    <MarkdownEditor toolbar={[]} name="welcome" placeholder="Placeholder" />
                    </Field>
                </WuiProvider>*/}
                <div className={styles.grid}>
                    {!isFetched && <div className={styles.loader}><CircularProgress isIndeterminate color='green.300' /></div>}
                    {articles.slice(0).reverse().map((article) => (
                        <Box key={article.id} className={styles.card} bg={bgcolor}>
                            <div className={styles.post_header} style={{ backgroundColor: "#ddf4ff" }}>
                                <HStack>
                                    <Tooltip label={user.username}>
                                        <Text fontWeight="semibold"> {user.idTokenClaims.name} </Text>
                                    </Tooltip>
                                    <Tooltip label={
                                        <span>
                                            {new Date(article.published).toLocaleDateString()}
                                            <span> &#183; </span>
                                            {new Date(article.published).toLocaleTimeString()}
                                        </span>}>
                                        <Text> {article.status == 2 ? "published" : "saved"} {human_time_diff(article.published)} ago </Text>
                                    </Tooltip>
                                </HStack>
                                <HStack>
                                    
                                </HStack>
                            </div>

                            <div className={mdStyles["markdown-body"]} style={{ padding: "1.5em", borderRadius: "0px 0px 10px 10px" }} >
                                <h1 style={{ fontSize: "2.5em"}}> {article.title} </h1>
                                <ReactMarkdown className={mdStyles["markdown-body"]} remarkPlugins={[remarkGfm]} >
                                    {article.body}
                                </ReactMarkdown>
                            </div>
                        </Box>

                    ))}
                </div>

            </main>
            <Footer />
        </Box>
    )
}
