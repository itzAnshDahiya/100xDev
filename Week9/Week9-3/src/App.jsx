import { useState } from "react";
import { PostComponent } from "./Post"; // Assuming this component exists

function App() {
  const [posts, setPosts] = useState([]);

  const postComponents = posts.map((post, index) => (
    <div key={index} style={{ marginBottom: "20px" }}>
      <PostComponent
        name={post.name}
        subtitle={post.subtitle}
        time={post.time}
        image={post.image}
        description={post.description}
      />
    </div>
  ));

  // Function to add a new post
  function addPost() {
    // New post data to add
    const newPost = {
      name: "harkirat",
      subtitle: "1000 followers",
      time: "2m ago",
      image:
        "https://appx-wsb-gcp-mcdn.akamai.net.in/subject/2023-01-17-0.17044360120951185.jpg",
      description:
        "What to know how to win big? Check out how these folks won $6000 in bounties.",
    };

    // Add the new post to the existing posts array
    setPosts([...posts, newPost]);
  }

  return (
    <div style={{ background: "#dfe6e9", height: "100vh" }}>
      <button onClick={addPost}>Add post</button>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {postComponents} {/* Render the list of PostComponents */}
      </div>
    </div>
  );
}

export default App;
