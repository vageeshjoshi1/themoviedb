import React, { useEffect, useState } from 'react';
import { Button, Col, Row } from 'reactstrap';

import SinglePost from './Post';
import Header from './Header';

import './styles.scss';

const AllMovies = () => {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(10);
  const [language, setLanguage] = useState('en');
  const [posts, setPosts] = useState([]);

  const fetchPosts = (page) => {
    setLoading(true);
    fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=${language}&page=${page}`
    )
      .then((res) => res.json())
      .then((data) => {
        setPosts(page === 1 ? data.results : [...posts, ...data.results]);
        setPage(data.page);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchPosts(1);
  }, []);

  useEffect(() => {
    fetchPosts(1);
  }, [language]);

  return (
    <div className="all-movies-screen">
      <Header selectedLanguage={language} setLanguage={setLanguage} setLoading={setLoading} />
      <Row xs="2">
        {posts.map((post) => (
          <Col key={post.id}>
            <SinglePost {...post} />
          </Col>
        ))}
      </Row>
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <Button color="primary" onClick={() => fetchPosts(page + 1)}>
          Load More
        </Button>
      )}
    </div>
  );
};

export default AllMovies;
