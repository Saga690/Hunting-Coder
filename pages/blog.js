import React, { useEffect } from 'react'
import styles from '@/styles/Blog.module.css'
import Link from 'next/link'
import { useState } from 'react'
import * as fs from 'fs';
import InfiniteScroll from 'react-infinite-scroll-component';

const Blog = (props) => {
  const [blogs, setBlogs] = useState(props.allBlogs);
  const [count, setCount] = useState(2);

  const fetchData = async () => {
    let d = await fetch(`http://localhost:3000/api/blogs/?count=${count+2}`);
    setCount(count+2);
    let data = await d.json();
    setBlogs(data);
  };
  return (
    <>
      <main className={styles.main}>
        <InfiniteScroll
          dataLength={blogs.length} 
          next={fetchData}
          hasMore={props.allCount !== blogs.length}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          {<div className="blogs">
            <h2 className={styles.lat}>Popular Blogs</h2>
            {blogs.map((blogItem) => {
              return <div key={blogItem.slug} className={styles.blogItem}>
                <Link href={`/blogpost/${blogItem.slug}`}>
                  <h3 className={styles.clh3}>{blogItem.title}</h3>
                </Link>
                <p className={styles.blogItemp}>{blogItem.content.substr(0, 140)}...</p>
                <Link href={`/blogpost/${blogItem.slug}`}><button className={styles.btn}>Read More</button></Link>
              </div>
            })}
          </div>}
        </InfiniteScroll>
      </main>
    </>
  )
}

export async function getStaticProps() {
  let data = await fs.promises.readdir("blogdata");
  let allCount = data.length;
  let myfile;
  let allBlogs = [];
  for (let index = 0; index < 4; index++) {
    const item = data[index];
    myfile = await fs.promises.readFile(('blogdata/' + item), 'utf-8')
    allBlogs.push(JSON.parse(myfile))
  }

  return {
    props: { allBlogs, allCount },
  }
}

export default Blog