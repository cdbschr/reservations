// useInfiniteScroll.ts
import { Ref, ref, onMounted, onBeforeUnmount, nextTick, watch } from "vue";

interface InfiniteScrollOptions {
  list: Ref<any[]>;
  counter: Ref<number>;
  loadMorePast: () => void;
  loadMoreFuture: () => void;
}

export default function useInfiniteScroll({
  list,
  counter,
  loadMorePast,
  loadMoreFuture,
}: InfiniteScrollOptions) {
  let observer: IntersectionObserver | null = null;

  const loadMoreRef = ref<HTMLElement | null>(null);

  watch(counter, (newCount) => {
    list.value = list.value.slice(0, newCount);
  });

  onMounted(() => {
    observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        counter.value += 3;
      }
    });

    nextTick(() => {
      if (loadMoreRef.value) {
        observer!.observe(loadMoreRef.value);
      }
    });

    window.addEventListener("scroll", handleScroll);
  });

  onBeforeUnmount(() => {
    window.removeEventListener("scroll", handleScroll);
    if (observer && loadMoreRef.value) {
      observer.unobserve(loadMoreRef.value);
    }
  });

  function handleScroll() {
    const bottomOfWindow =
      document.documentElement.scrollTop + window.innerHeight ===
      document.documentElement.offsetHeight;
    const topOfWindow = document.documentElement.scrollTop === 0;

    if (bottomOfWindow) {
      loadMoreFuture();
    }

    if (topOfWindow) {
      loadMorePast();
    }
  }

  return { loadMoreRef, handleScroll };
}
