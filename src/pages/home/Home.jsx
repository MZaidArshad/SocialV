import "./home.scss";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import CreatePost from "../../components/createPost/CreatePost";
import Post from "../../components/post/Post";
import Messages from "../../components/messages/Messages";
import { useState, useEffect } from "react";
import { db } from "../../config/firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const postsCollection = collection(db, "Posts");
    const postsQuery = query(postsCollection, orderBy("timestamp", "desc"));

    const unsubscribe = onSnapshot(postsQuery, (snapshot) => {
      const postsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(postsData);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    console.log("posts ", posts);
  }, [posts]);

  return (
    <main>
      <Navbar />
      <div className="container">
        <div className="left">
          <Sidebar />
        </div>
        <div className="middle">
          <CreatePost />
          <div className="feeds">
            {posts.map((post) => (
              <Post key={post.id} post={post} />
            ))}
          </div>
        </div>
        <div className="right">
          <Messages />
        </div>
      </div>
    </main>
  );
};

export default Home;
