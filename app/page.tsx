"use client";

import { useFeed } from "@/hooks/useFeed";
import { HomeHeader } from "@/components/home/HomeHeader";
import { PostCreation } from "@/components/home/PostCreation";
import { FeedStream } from "@/components/home/FeedStream";
import { FeedFilters } from "@/components/home/FeedFilters";

export default function HomeFeed() {
  const {
    items,
    isLoading,
    isPosting,
    content,
    setContent,
    banner,
    setBanner,
    error,
    user,
    handleCreatePost,
  } = useFeed();

  return (
    <div className="flex flex-col min-h-screen">
      <HomeHeader />

      <div className="max-w-4xl mx-auto w-full px-6 md:px-12 space-y-12">
        <PostCreation 
          user={user}
          content={content}
          setContent={setContent}
          banner={banner}
          setBanner={setBanner}
          isPosting={isPosting}
          handleCreatePost={handleCreatePost}
        />

        <FeedFilters />

        <FeedStream 
          items={items}
          isLoading={isLoading}
          error={error}
        />
      </div>
      
      <div className="pb-16" />
    </div>
  );
}
