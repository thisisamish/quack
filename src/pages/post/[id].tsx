import Head from 'next/head';
import PageLayout from '~/components/Layout';
import { PostView } from '~/components/PostView';
import { generateSSGHelper } from '~/server/helpers/ssgHelper';
import { api } from '~/utils/api';

import type { GetStaticProps } from "next";

export default function SinglePostPage({ id }: { id: string }) {
  const { data } = api.posts.getById.useQuery({
    id,
  });

  if (!data) return <div>404</div>;

  return (
    <>
      <Head>
        <title>
          {`@${data.author.username} on Quack: "${data.post.content}"`}
        </title>
      </Head>
      <PageLayout>
        <PostView author={data.author} post={data.post} />
      </PageLayout>
    </>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const ssg = generateSSGHelper();

  const id = context.params?.id;

  if (typeof id !== "string") throw new Error("no id");

  await ssg.posts.getById.prefetch({ id });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      id,
    },
  };
};

export const getStaticPaths = () => {
  return { paths: [], fallback: "blocking" };
};
