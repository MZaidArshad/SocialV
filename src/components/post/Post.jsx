import "./post.scss";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { db } from "../../config/firebase"; // Adjust the import based on your file structure
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Post = ({ post }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  // Ensure post.likes and post.comments are arrays
  const [liked, setLiked] = useState(
    Array.isArray(post?.likes) ? post.likes.includes(user.uid) : false
  );
  const [newComment, setNewComment] = useState("");

  const handleLike = async () => {
    const postDocRef = doc(db, "Posts", post.id);
    if (liked) {
      await updateDoc(postDocRef, {
        likes: arrayRemove(user.uid),
      });
      setLiked(false);
    } else {
      await updateDoc(postDocRef, {
        likes: arrayUnion(user.uid),
      });
      setLiked(true);
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if (newComment.trim() === "") return;

    const comment = {
      userId: user.uid,
      userName: user.displayName,
      userProfilePhoto: user.photoURL,
      text: newComment,
      timestamp: new Date(),
    };

    const postDocRef = doc(db, "Posts", post.id);
    await updateDoc(postDocRef, {
      comments: arrayUnion(comment),
    });

    setNewComment("");
  };

  useEffect(() => {
    console.log("liked ", liked);
  }, [liked]);

  return (
    <div className="feed">
      <div className="head">
        <div className="user">
          <div
            className="profile-photo"
            onClick={() => navigate(`/profile/${post.userId}`)}
          >
            <img src={post?.photoURL} alt="" />
          </div>
          <div className="info">
            <h3 onClick={() => navigate(`/profile/${post.userId}`)}>
              {post?.userName}
            </h3>
            <small>
              {new Date(post?.timestamp?.toDate()).toLocaleString()}
            </small>
          </div>
        </div>
        <span className="edit">
          <i className="uil uil-ellipsis-h"></i>
        </span>
      </div>

      <div className="caption">
        <p>{post?.content?.text}</p>
      </div>
      <div className="photo">
        <img src={post?.content?.image} alt="" />
      </div>

      <div className="action-buttons">
        <div className="interaction-buttons">
          <span onClick={handleLike}>
            {!liked ? (
              <i className="uil uil-heart"></i>
            ) : (
              <FavoriteIcon className="liked_icon" />
            )}
          </span>
          <span>
            <i className="uil uil-share-alt"></i>
          </span>
        </div>
        <div className="bookmark">
          <span>
            <i className="uil uil-bookmark-full"></i>
          </span>
        </div>
      </div>

      <div className="liked-by">
        <p>
          <b>{Array.isArray(post?.likes) ? post.likes.length : 0} likes</b>
        </p>
      </div>

      <div className="comments">
        {Array.isArray(post?.comments) &&
          post?.comments.map((comment, index) => (
            <div className="comment" key={index}>
              <div className="profile-photo">
                <img src={comment?.userProfilePhoto} alt="" />
              </div>
              <div className="comment_body">
                <p className="d-flex align-items-center justify-content-between gap-3">
                  <span>{comment?.userName}</span>
                  <small>
                    {new Date(comment?.timestamp?.toDate()).toLocaleString()}
                  </small>
                </p>
                <h5>{comment?.text}</h5>
              </div>
            </div>
          ))}
      </div>

      <div className="comments text-muted">
        View all {Array.isArray(post?.comments) ? post.comments.length : 0}{" "}
        comments
      </div>

      <div className="comment_input">
        <form onSubmit={handleComment}>
          <input
            type="text"
            placeholder="Write a comment"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Post;
