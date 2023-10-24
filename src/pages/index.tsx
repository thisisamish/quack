import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";
import PageLayout from "~/components/Layout";
import LoadingSpinner, { LoadingPage } from "~/components/Loading";
import { PostView } from "~/components/PostView";
import { api } from "~/utils/api";

import { SignInButton, useUser } from "@clerk/nextjs";

const CreatePostWizard = () => {
  const { user } = useUser();

  const [input, setInput] = useState("");

  const ctx = api.useContext();

  const { mutate, isLoading: isPosting } = api.posts.create.useMutation({
    onSuccess: () => {
      setInput("");
      void ctx.posts.getAll.invalidate();
    },
    onError: (e) => {
      const errorMessage = e.data?.zodError?.fieldErrors.content;
      if (errorMessage?.[0]) {
        toast.error(errorMessage[0]);
      } else {
        toast.error("Failed to post! Please try again later.");
      }
    },
  });

  if (!user) return null;

  return (
    <div className="flex w-full gap-4">
      <Image
        src={user.imageUrl}
        width={100}
        height={100}
        quality={100}
        alt="profile picture"
        className="h-14 w-14 rounded-full"
      ></Image>
      <input
        placeholder="quackity quack..."
        className="grow bg-transparent outline-none"
        type="text"
        value={input}
        disabled={isPosting}
        onKeyDown={(e) => {
          if (e.key === "Enter") mutate({ content: input });
        }}
        onChange={(e) => setInput(e.target.value)}
      />
      {input !== "" && !isPosting && (
        <button disabled={isPosting} onClick={() => mutate({ content: input })}>
          Post
        </button>
      )}
      {isPosting && (
        <div className="flex items-center justify-center">
          <LoadingSpinner size={20} />
        </div>
      )}
    </div>
  );
};

const Feed = () => {
  const { data, isLoading: postsLoading } = api.posts.getAll.useQuery();

  if (postsLoading) return <LoadingPage />;

  if (!data) return <div>Something went wrong!</div>;

  return (
    <div className="flex flex-col">
      {data.map((fullPost) => (
        <PostView {...fullPost} key={fullPost.post.id} />
      ))}
    </div>
  );
};

export default function Home() {
  const { isLoaded: userLoaded, isSignedIn } = useUser();

  // Start fetching the data asap because React Query can cache our data so
  // when we call this same query again in the Feed, it will return the cached data
  api.posts.getAll.useQuery();

  // Return empty div if user is not loaded
  if (!userLoaded) return <div />;

  return (
    <PageLayout>
      <div className="flex border-b border-slate-400 p-4">
        {!isSignedIn && (
          <div className="flex justify-center">
            <SignInButton />
          </div>
        )}
        {isSignedIn && <CreatePostWizard />}
      </div>
      <Feed />
    </PageLayout>
  );
}
