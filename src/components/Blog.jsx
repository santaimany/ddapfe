import React from 'react';
import BlogCard from './Blogcard';

const Blog = ({ blogData }) => {
  return (
      <div className="py-12 px-4 bg-transparent">
        <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-8">
          {blogData.map((blog, index) => (
              <BlogCard
                  key={index}
                  index={index}
                  url={blog.url}
                  title={blog.title}
                  description={blog.description}
                  image={blog.image}
              />
          ))}
        </div>
      </div>
  );
};

export default Blog;
