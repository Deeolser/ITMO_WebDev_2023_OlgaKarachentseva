const books = ref([]);
export const useBooks = () => {
  const isBooksLoading = ref(books.value.length === 0);
  if (isBooksLoading.value) {
    useLazyFetch("/api/books", { server: false })
      .then((response: any) => {
        console.log("useBooks >", response.data);
        books.value = response.data.value;
      })
      .finally(() => (isBooksLoading.value = false));
  }
  return { books, isBooksLoading };
};
