import { useState } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import PostCard from "../PostCard";
import { useDebounce } from "../../hooks/useDebounce";
import type { PostsListProps } from "./types";
import styles from "./PostsList.module.scss";

const SKELETON_COUNT = 6;

export default function PostsListComponent({
  posts,
  loading = false,
}: PostsListProps) {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);
  const [gridRef] = useAutoAnimate<HTMLDivElement>();

  const filtered = debouncedSearch
    ? posts.filter(
        (p) =>
          p.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
          p.tags.toLowerCase().includes(debouncedSearch.toLowerCase()),
      )
    : posts;

  return (
    <section className={styles.section}>
      <input
        className={styles.search}
        type="search"
        placeholder="Search posts…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
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
    </section>
  );
}
