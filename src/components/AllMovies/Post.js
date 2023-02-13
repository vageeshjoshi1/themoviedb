import React from 'react';
import { Card, CardBody, CardTitle } from 'reactstrap';

import './styles.scss';

const Post = ({ title, poster_path }) => {
  return (
    <Card>
      <img alt="Sample" src={`https://image.tmdb.org/t/p/w500/${poster_path}`} />
      <CardBody>
        <CardTitle tag="h5">{title}</CardTitle>
      </CardBody>
    </Card>
  );
};

export default Post;
