import React, { useContext } from 'react';

import { AuthorsContext } from '../../store/Authors';
import { getDate } from '../../utils/helpers';

export default ({ data: { title, body, metadata }, id }) => {
  const { authorId, publishedAt } = metadata;
  const { state: authors } = useContext(AuthorsContext);
  const { name: authorName } = authors.data.find((author) => author.id === authorId) || {};
  const date = getDate(publishedAt);

  return (
    <li className="post" id={id}>
      <header>
        <h1>{title}</h1>
      </header>
      <main>
        <p>{body}</p>
      </main>
      <footer>
        {authorName ? `${authorName} – ` : ''}
        {date}
      </footer>
    </li>
  );
};
