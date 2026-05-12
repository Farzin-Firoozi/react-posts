import { useAutoAnimate } from "@formkit/auto-animate/react";
import PostCard from "../PostCard";
import Message from "../Message";
import type { PostsListProps } from "./types";
import styles from "./PostsList.module.scss";

const SKELETON_COUNT = 6;

export default function PostsListComponent({
  posts,
  loading = false,
  search = '',
}: PostsListProps) {
  const [gridRef] = useAutoAnimate<HTMLDivElement>();

  const filtered = search
    ? posts.filter(
        (p) =>
          p.title.toLowerCase().includes(search.toLowerCase()) ||
          p.tags.toLowerCase().includes(search.toLowerCase()),
      )
    : posts;

  const isEmpty = !loading && filtered.length === 0

  return (
    <section className={styles.section}>
      {isEmpty ? (
        <Message
          title={search ? 'No results found' : 'No posts yet'}
          description={search ? `Nothing matched "${search}"` : undefined}
        />
      ) : (
        <div ref={gridRef} className={styles.grid}>
          {loading
            ? Array.from({ length: SKELETON_COUNT }).map((_, i) => (
                <div key={i} className={styles.item}>
                  <PostCard.Skeleton />
                </div>
              ))
            : filtered.map((post, i) => (
                <div key={post.title + i} className={styles.item}>
                  <PostCard post={post} />
                </div>
              ))}
        </div>
      )}
    </section>
  );
}
