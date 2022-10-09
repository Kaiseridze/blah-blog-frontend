import { useEffect, useState } from "react";

import Post from "../components/Post";
import Loader from "../components/Loader";
import Categories from "../utils/Categories";

import { fetchPosts } from "../store/reducers/actionsCreators";
import { useAppDispatch } from "../hooks";
import { useAppSelector } from "../hooks";

import Pagination from "@mui/material/Pagination";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

// TODO: Type parameter and Reducer Model

const Home = () => {
  const dispatch = useAppDispatch();
  const { posts, error, isLoading } = useAppSelector((state) => state.posts);
  const { data } = useAppSelector((state) => state.auth);
  const [page, setPage] = useState<number>(1);
  const [sortBy, setSortBy] = useState<string>("createdAt");

  const fetch = () => {
    if (!posts.data?.length) {
      setPage(1);
    }
    return dispatch(fetchPosts({ page, sortBy }));
  };

  const onChangeCategory = (event: React.SyntheticEvent, newValue: string) => {
    setSortBy(newValue);
  };

  useEffect(() => {
    fetch();
  }, [page, !posts.data?.length, sortBy]);

  return (
    <>
      <Tabs value={sortBy} onChange={onChangeCategory}>
        {Categories.map((category) => (
          <Tab value={category.value} key={category.id} label={category.name} />
        ))}
      </Tabs>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="home">
            {posts?.data?.map((post: any) => (
              <Post
                isEditable={data?._id === post.user._id}
                key={post._id}
                {...post}
              />
            ))}
          </div>
          <footer className="home__pagination">
            <Pagination
              page={page}
              onChange={(_, num) => setPage(num)}
              count={posts.pagesCount || 1}
              variant="outlined"
            />
          </footer>
        </>
      )}
      {error && <h1>{error}</h1>}
    </>
  );
};

export default Home;
