interface Props {
  params: { slug: string };
}

interface Post {
  title: string;
  content: string;
  slug: string;
}

// Caching - General approach - incremental static
// export const dynamic = 'force-dynamic';
export const revaldiate = 420;

export async function generateStaticParams() {
  const posts: Post[] = await fetch('http://localhost:3000/api/content')
    .then(res => res.json());

  return posts.map(({ slug }) => { slug });
}

export default async function BlogPage({ params }: Props) {
  const posts: Post[] = await fetch('http://localhost:3000/api/content')
    .then(res => res.json());
  const post = posts.find(post => post.slug === params.slug)!;

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  );
}
