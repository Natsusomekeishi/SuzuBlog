'use client';

import Image from 'next/image';
import Link from 'next/link';
import { MdMoreHoriz } from 'react-icons/md';
import { FaFolder, FaRegClock } from 'react-icons/fa6';

import ItemLinks from '@/components/helpers/ItemLinks';

interface PostListLayoutProperties {
  posts: PostListData[];
  translation: Translation;
}

export default function PostListLayout({
  posts,
  translation,
}: PostListLayoutProperties) {
  return (
    <div className='mb-10 grid grid-cols-1 gap-10'>
      {posts.map((post, index) => {
        const postTitle = post.frontmatter.title;
        const postLink = post.slug;
        return (
          <article
            key={index}
            className={`mx-auto flex h-[500px] w-11/12 max-w-[850px] flex-col overflow-hidden rounded-lg shadow-lg md:h-[300px] md:w-full md:flex-row ${
              index % 2 === 0 ? 'md:flex-row-reverse' : ''
            } shadow-[var(--lightGray)] drop-shadow-sm`}
          >
            {/* Thumbnail */}
            <div
              className={`relative w-full ${
                index % 2 === 0 ? 'rounded-r-lg' : 'rounded-l-lg'
              } h-1/2 overflow-hidden md:h-full md:w-7/12`}
            >
              <Link
                className='block h-full w-full transform transition duration-500 hover:scale-110'
                href={postLink}
                target='_self'
                aria-label={`${translation.post.readMore} ${postTitle}`}
              >
                <Image
                  src={post.frontmatter.thumbnail}
                  alt={`${translation.post.thumbnail} ${postTitle}`}
                  width={780}
                  height={500}
                  className='h-full w-full object-cover'
                  priority={index < 3}
                />
              </Link>
            </div>

            {/* Content */}
            <div className='m-6 flex h-1/2 flex-col justify-between md:h-auto md:w-5/12'>
              <div>
                {/* Date of Publish */}
                <div className='mb-1 flex items-center'>
                  <FaRegClock className='mr-2' />
                  <span className='text-sm'>
                    {post.frontmatter.date.split(' ')[0]}
                  </span>
                </div>
                {/* Title in Frontmatter */}
                <Link
                  href={postLink}
                  target='_self'
                  aria-label={`${translation.post.readMore} ${postTitle}`}
                  className='no-underline'
                >
                  <h2 className='mb-2 text-2xl font-bold'>{postTitle}</h2>
                </Link>
                {/* Abstract */}
                <p className='line-clamp-5 text-sm'>{post.postAbstract}</p>
              </div>

              <div className='text-gray-450 mt-3 flex items-center justify-between text-sm'>
                {/* Read Count */}
                <span className='flex items-center'>
                  <Link
                    href={postLink}
                    target='_self'
                    aria-label={`${postTitle}`}
                    className='self-start transition duration-500 hover:scale-110'
                  >
                    <MdMoreHoriz
                      size={32}
                      className='cursor-pointer'
                    />
                  </Link>
                </span>
                {/* Category */}
                <span className='flex items-center'>
                  <FaFolder className='mr-1' />
                  <ItemLinks
                    type='category'
                    translation={translation}
                    items={post.frontmatter.categories}
                  />
                </span>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}