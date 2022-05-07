import { GetStaticProps } from 'next';

import Head from 'next/head';
import Link from 'next/link';
import { ReactElement } from 'react';
import { FiCalendar, FiUser } from 'react-icons/fi';
import { getPrismicClient } from '../services/prismic';
import styles from './home.module.scss';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

export default function Home({ postsPagination }: HomeProps): ReactElement {
  return (
    <>
      <Head>
        <title>Home | spacetraveling.</title>
      </Head>
      <main className={styles.container}>
        {postsPagination.results.map(post => (
          <div key={post.uid} className={styles.post}>
            <Link href={`/post/${post.uid}`}>
              <a>
                <h2>{post.data.title}</h2>
                <h3>{post.data.subtitle}</h3>

                <div className={styles.info}>
                  <div>
                    <FiCalendar />
                    <time>{post.first_publication_date}1</time>
                  </div>

                  <div>
                    <FiUser />
                    <span>{post.data.author}</span>
                  </div>
                </div>
              </a>
            </Link>
          </div>
        ))}

        {
          // postsPagination.next_page && (
          <div className={styles.loadMoreButton}>
            {/* <Link href="/"> */}
            <a>Carregar mais posts</a>
            {/* </Link> */}
          </div>
        }
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient({});

  const postsResponse = await prismic.getByType('posts');

  return {
    props: {
      postsPagination: postsResponse,
    },
    redirect: '',
  };
};
