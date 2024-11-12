import type { Metadata } from 'next';

import { getConfig } from '@/services/config';
import { getPostData } from '@/services/content';

import PostLayout from '@/components/posts/PostLayout';
import '@/styles/friendsLinks.css';

function generateMetadata(): Metadata {
  const config = getConfig();
  return {
    title: `Friends - ${config.title}`,
    description: `Friends page of ${config.title} - ${config.description}`,
    openGraph: {
      siteName: config.title,
      title: `Friends - ${config.title}`,
      description: `Friends page of ${config.title} - ${config.description}`,
      url: '/friends',
      images: config.avatar,
      type: 'website',
      locale: config.lang,
    },
  };
}

async function FriendsPage() {
  const post: PostData = await getPostData('Friends', 'Friends');
  const config = getConfig();

  return (
    <PostLayout
      post={post}
      showThumbnail={config.thumbnailFriends}
    />
  );
}

export { generateMetadata, FriendsPage as default };
