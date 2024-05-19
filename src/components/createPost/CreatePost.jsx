import "./createPost.scss";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

import profile1 from "../../assets/images/profile-10.jpg";
import { db, storage } from "../../config/firebase";

import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const savePost = async (post) => {
  const postsCollection = collection(db, "Posts");

  const postData = {
    userId: post.userId,
    userName: post.userName,
    photoURL: post.photoURL,
    content: {
      text: post.content.text,
      image: post.content.image,
    },
    timestamp: serverTimestamp(),
    likes: [],
    comments: [],
  };

  try {
    const docRef = await addDoc(postsCollection, postData);
    console.log("Post added with ID: ", docRef.id);
  } catch (error) {
    console.error("Error adding post: ", error);
  }
};

const CreatePost = () => {
  const { user } = useContext(AuthContext);
  const [fileName, setFileName] = useState("");
  const [file, setFile] = useState(null);
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [uploading, setUploading] = useState(0);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      setFile(file);
    } else {
      setFileName("");
      setFile(null);
    }
  };

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    if (!file && !text) {
      alert("Please add text or upload a file.");
      setIsLoading(false);
      return;
    }

    let fileURL = "";

    if (file) {
      const storageRef = ref(storage, `${user.uid}/posts/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("snapshot ", progress);
          setUploading(progress);
        },
        (error) => {
          console.error("File upload error: ", error);
          setIsLoading(false);
        },
        async () => {
          fileURL = await getDownloadURL(uploadTask.snapshot.ref);
          savePostToFirestore(fileURL);
        }
      );
    } else {
      savePostToFirestore(fileURL);
    }
  };

  const savePostToFirestore = (fileURL) => {
    const post = {
      userId: user.uid,
      userName: user.displayName || "Anonymous",
      photoURL: user.photoURL || "https://i.pravatar.cc/300",
      content: {
        text: text,
        image: fileURL,
      },
      timestamp: Date.now(),
      likes: [],
      comments: [],
    };

    savePost(post);
    resetForm();
  };

  const resetForm = () => {
    setFileName("");
    setFile(null);
    setText("");
    setIsLoading(false);
  };

  return (
    <form className="create-post" onSubmit={handleSubmit}>
      <div className="text_msg">
        <div className="profile-photo">
          <img src={user?.photoURL || profile1} alt="" />
        </div>
        <input
          type="text"
          placeholder={`What's on your mind, ${
            user.displayName.split(" ")[0]
          }?`}
          id="create-post"
          value={text}
          onChange={handleTextChange}
          disabled={isLoading}
        />
        {isLoading ? (
          <Box sx={{ position: "relative", display: "inline-flex" }}>
            <CircularProgress variant="determinate" value={uploading} />
            <Box
              sx={{
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                position: "absolute",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="caption"
                component="div"
                color="text.secondary"
              >
                {`${Math.round(uploading)}%`}
              </Typography>
            </Box>
          </Box>
        ) : (
          <input
            type="submit"
            value="Post"
            className="btn"
            disabled={isLoading}
          />
        )}
      </div>
      <div className="media-upload">
        <label
          htmlFor="media-upload"
          className="upload-label d-flex align-items-center gap-1"
        >
          <CameraAltOutlinedIcon /> Add Photo
        </label>
        <input
          type="file"
          id="media-upload"
          accept="image/*"
          onChange={handleFileChange}
          disabled={isLoading}
        />
        {fileName && <span className="file-name">{fileName}</span>}
      </div>
    </form>
  );
};

export default CreatePost;
