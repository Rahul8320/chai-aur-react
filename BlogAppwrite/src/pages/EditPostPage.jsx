import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import postService from "../appwrite/post.service";
import { Container, PostForm } from "../components";

const EditPostPage = () => {
  const [post, setPost] = useState([]);

  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      postService
        .getPostById(slug)
        .then((post) => {
          if (post) {
            setPost(post);
          } else {
            alert("No post found");
          }
        })
        .catch((err) => alert(err));
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  return post ? (
    <div className="py-8">
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  ) : null;
};

export default EditPostPage;
