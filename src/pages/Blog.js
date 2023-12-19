import React from "react";

const Blog = () => {
  // Array of blog posts with each post containing an id, title, and content
  const posts = [
    {
      id: 1,
      title: "The Art of Baking",
      content:
        "Baking is both an art and a science. It requires precision, patience, and a good understanding of ingredients. In this post, I'll share some of my favorite baking tips and tricks.",
    },
    {
      id: 2,
      title: "Exploring Culinary Traditions",
      content:
        "Every culture has its unique culinary traditions and flavors. Join me on a journey around the world as we explore different cuisines, from the spices of India to the pasta perfection of Italy.",
    },
    {
      id: 3,
      title: "Mastering the Grill: BBQ Secrets",
      content:
        "Grilling is more than just cooking; it's a way of life. Learn the secrets behind mastering the grill, from choosing the right cuts of meat to achieving the perfect sear. Get ready for a sizzling adventure!",
    },
    {
      id: 4,
      title: "Seasonal Delights: Fall Recipes",
      content:
        "As the leaves change color, so do our culinary cravings. Dive into the flavors of fall with these delightful recipes. From hearty stews to pumpkin-spiced treats, there's something for everyone.",
    },
    {
      id: 5,
      title: "The Joy of Comfort Food",
      content:
        "In times of joy or sorrow, comfort food has the incredible power to soothe the soul. Join me in celebrating the joy of comfort food, from classic mac 'n' cheese to a warm bowl of chicken soup.",
    },
  ];
  return (
    <div>
      <div style={{ height: "80vw" }} className="blog-page">
        <h1 className="page-title">Chef's Blog</h1>
        <div>
          {posts.map((post) => (
            <div className="blog-posts">
              <h2>{post.title}</h2>
              <p>{post.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
