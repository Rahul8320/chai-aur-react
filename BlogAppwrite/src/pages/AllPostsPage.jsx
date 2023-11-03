import { useEffect, useState } from "react";
import postService from "../appwrite/post.service";
import { Container, PostCard } from "../components";

const AllPostsPage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    postService
      .getAllPosts([])
      .then((res) => {
        if (res) {
          setPosts(res.documents);
        } else {
          alert("No Posts found");
        }
      })
      .catch((err) => {
        alert(err);
      });
  }, []);

  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-warp">
          {posts.map((post) => (
            <div className="p-2 w-1/4" key={post.$id}>
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default AllPostsPage;
