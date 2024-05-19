import "./myProfile.scss";
import Navbar from "../../components/navbar/Navbar";
import ProfileHeader from "../../components/profile-Header/ProfileHeader";
import MenuBar from "../../components/menuBar/Menubar";
import { useContext, useState, useEffect } from "react";
import Post from "../../components/post/Post";
import About from "../../components/about/About";
import Gallery from "../../components/image_gallary/Gallery";
import EditProfile from "../../components/editProfile/EditProfile";
import { AuthContext } from "../../context/AuthContext";
import { db, storage } from "../../config/firebase";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  doc,
} from "firebase/firestore";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { useParams } from "react-router-dom";

const MyProfile = () => {
  const { user } = useContext(AuthContext);

  const [myProfile, setMyProfile] = useState(false);
  const [activeMenu, setActiveMenu] = useState("Timeline");
  const [posts, setPosts] = useState([]);
  const [images, setImages] = useState([]);
  const [userData, setUserData] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    if (id && user && id === user.uid) {
      setMyProfile(true);
    } else if (id) {
      setMyProfile(false);
    }
  }, [id, user]);

  useEffect(() => {
    const unsubscribePosts = onSnapshot(
      query(
        collection(db, "Posts"),
        where("userId", "==", id), // Handle null id
        orderBy("timestamp", "desc")
      ),
      (snapshot) => {
        const updatedPosts = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPosts(updatedPosts);
      }
    );

    const fetchImages = async () => {
      try {
        if (id) {
          // Check if id is not null
          const imagesRef = ref(storage, `${id}/posts`);
          const listResponse = await listAll(imagesRef);
          const urls = await Promise.all(
            listResponse.items.map((item) => getDownloadURL(item))
          );
          setImages(urls);
        }
      } catch (error) {
        console.error("Error fetching images: ", error);
      }
    };

    const unsubscribeUserData = onSnapshot(doc(db, "Users", id), (doc) => {
      if (doc.exists()) {
        setUserData(doc.data());
      } else {
        console.log("No such document!");
      }
    });

    return () => {
      unsubscribePosts();
      fetchImages();
      unsubscribeUserData();
    };
  }, [id]); // Add userId to dependency array

  return (
    <div>
      <Navbar />
      <div className="container myProfile_body">
        <ProfileHeader postsCount={posts?.length} userData={userData} />
        <MenuBar
          activeMenu={activeMenu}
          setActiveMenu={setActiveMenu}
          myProfile={myProfile}
        />
        {activeMenu === "Timeline" && (
          <div className="myProfile_body_feed">
            <h2 className="p-2">My All Posts</h2>
            <div className="row posts">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="col-12 col-lg-6 col-md-6 post_container"
                >
                  <Post post={post} />
                </div>
              ))}
            </div>
          </div>
        )}
        {activeMenu === "About" && (
          <div className="myProfile_body_about">
            <About userData={userData} />
          </div>
        )}
        {activeMenu === "Photos" && (
          <div className="myProfile_body_gallery">
            <h2>My Gallery</h2>
            <Gallery images={images} />
          </div>
        )}
        {activeMenu === "Edit Profile" && (
          <div className="myProfile_body_profile">
            <EditProfile userData={userData} />
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
