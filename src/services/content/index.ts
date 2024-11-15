'use server';

import { promises as fsPromise } from 'node:fs';
import path from 'node:path';

import { filter, replace } from 'es-toolkit/compat';
import { notFound } from 'next/navigation';

import getPostFromFile from '@/services/content/getPostFromFile';

const postsDirectory = path.join(process.cwd(), 'posts');

async function getAllPosts(): Promise<PostListData[]> {
  const fileNames = await fsPromise.readdir(postsDirectory);
  const markdownFiles = filter(fileNames, (fileName) =>
    fileName.endsWith('.md')
  );

  const allPosts = await Promise.all(
    markdownFiles.map(async (fileName) => {
      const { slug, postAbstract, frontmatter, lastModified } = getPostFromFile(
        path.join(postsDirectory, fileName),
        replace(fileName, /\.md$/, ''),
        false // Fetch only partial data for list view
      );
      return { slug, postAbstract, frontmatter, lastModified };
    })
  );

  return allPosts.sort(
    (a, b) =>
      new Date(b.frontmatter.date).getTime() -
      new Date(a.frontmatter.date).getTime()
  );
}

async function getPostData(slug: string, page?: string): Promise<FullPostData> {
  const filePath = page
    ? path.join(postsDirectory, '_pages', `${page}.md`)
    : path.join(postsDirectory, `${slug}.md`);

  // check file existence
  try {
    await fsPromise.access(filePath);
  } catch {
    return notFound();
  }

  return getPostFromFile(filePath, slug);
}

export { getAllPosts, getPostData };
