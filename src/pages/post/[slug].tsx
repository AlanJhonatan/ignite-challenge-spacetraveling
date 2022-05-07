import Head from 'next/head';
import { ReactElement } from 'react';

import { GetStaticPaths, GetStaticProps } from 'next';

import { getPrismicClient } from '../../services/prismic';

// import commonStyles from '../../styles/common.module.scss';

import styles from './post.module.scss';

interface Post {
  first_publication_date: string | null;
  data: {
    title: string;
    banner: {
      url: string;
    };
    author: string;
    content: {
      heading: string;
      body: {
        text: string;
      }[];
    }[];
  };
}

interface PostProps {
  post: Post;
}

export default function Post({ post }: PostProps): ReactElement {
  return (
    <>
      <Head>
        <title>Post | spacetraveling.</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.banner}>
          <img src="/images/Banner.png" alt="banner" />
        </div>

        <div className={styles.content} />
      </main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const prismic = getPrismicClient({});
  const posts = await prismic.getByType('posts');

  // const paths = posts.results.map(post => post.uid);

  return {
    paths: [],
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const prismic = getPrismicClient({});
  const response = await prismic.getByUID('posts', params.slug.toString());

  return {
    props: {
      post: response,
    },
    redirect: '',
  };
};
