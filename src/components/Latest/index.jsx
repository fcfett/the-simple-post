import React from 'react';

export default ({ data }) => {
  const {
    title,
    metadata: { authorId, publishedAt },
  } = data;

  const postId = `post-${authorId}-${publishedAt}`;

  const handleClick = (e) => {
    e.preventDefault();
    const targetElement = document.getElementById(postId);
    if (targetElement) targetElement.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <li className="latest">
      <a onClickCapture={handleClick} href={`#${postId}`} title={`Read the post "${title}"`}>
        {title}
      </a>
    </li>
  );
};
