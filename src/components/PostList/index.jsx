import React, { useState, useContext, useEffect } from 'react';

import Post from '../Post';
import Dropdown from '../Dropdown';
import NoContent from '../NoContent';
import { AuthorsContext } from '../../store/Authors';
import { ReactComponent as Arrow } from '../../assets/icons/arrow.svg';

const getKey = (post) => {
  const { authorId, publishedAt } = post.metadata;
  return `post-${authorId}-${publishedAt}`;
};

export default ({ data }) => {
  const [posts, setPosts] = useState([]);
  const [descOrdered, setDescOrdered] = useState(true);
  const [authorFilter, setAuthorFilter] = useState([]);
  const { state: authors } = useContext(AuthorsContext);
  const hasPosts = posts.length > 0;

  useEffect(() => {
    setPosts([]);
  }, [data]);

  useEffect(() => {
    if (authorFilter.length) {
      const idList = authorFilter.map((author) => author.id);
      const filteredPosts = data.filter((post) => idList.includes(post.metadata.authorId));
      setPosts(filteredPosts);
    }
  }, [authorFilter]); //eslint-disable-line

  return (
    <section>
      <header>
        <h1>All Posts</h1>
        {hasPosts && (
          <aside>
            <Dropdown
              id="authors-dropdown"
              data={authors.data}
              placeholder="Filter by Author"
              dataLabel="name"
              multiple={true}
              onChange={setAuthorFilter}
            />
            <button
              className={`btn order ${descOrdered ? 'desc' : 'asc'}`}
              title={`Order ${descOrdered ? 'DESC' : 'ASC'}`}
              onClick={() => setDescOrdered(!descOrdered)}
            >
              <Arrow />
            </button>
          </aside>
        )}
      </header>
      {hasPosts ? (
        <ul className="posts">
          {(descOrdered ? posts : posts.slice().reverse()).map((post) => (
            <Post key={getKey(post)} id={getKey(post)} data={post} />
          ))}
        </ul>
      ) : (
        <NoContent />
      )}
    </section>
  );
};
