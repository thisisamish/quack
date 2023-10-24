import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Image from "next/image";
import Link from "next/link";

import type { RouterOutputs } from "~/utils/api";

dayjs.extend(relativeTime);

type PostWithUser = RouterOutputs["posts"]["getAll"][number];

export const PostView = (props: PostWithUser) => {
  const { post, author } = props;

  return (
    <Link href={`/post/${post.id}`}>
      <div key={post.id} className="flex gap-4 border-b border-slate-400 p-4">
        <Link href={`/@${author.username}`}>
          <Image
            width={100}
            height={100}
            alt={`@${author.username}'s profile picture`}
            src={author.profilePicture}
            className="h-12 w-12 rounded-full"
          ></Image>
        </Link>
        <div className="flex flex-col">
          <div className="flex gap-1 text-slate-300">
            <Link href={`/@${author.username}`}>
              <span>{`@${author.username}`}</span>
            </Link>

            <span className="font-thin">{` • ${dayjs(
              post.createdAt,
            ).fromNow()}`}</span>
          </div>
          <span className="text-xl">{post.content}</span>
        </div>
      </div>
    </Link>
  );
};
