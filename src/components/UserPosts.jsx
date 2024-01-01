import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPostsByUser } from '../utils/api';
import { setPosts } from '../redux/actions/postActions';
import NewPostDialog from './NewPostDialog';
import { Button, CircularProgress } from '@material-ui/core';
import './UserPosts.css';
import '../App.css'
const UserPosts = () => {
  const dispatch = useDispatch();
  const selectedUser = useSelector((state) => state.user.selectedUser);
  const posts = useSelector((state) => state.post.posts);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getPosts = async () => {
      try {
        setLoading(true);
        setError(null);

        if (selectedUser) {
          const data = await fetchPostsByUser(selectedUser);
          dispatch(setPosts(data));
        }
      } catch (error) {
        setError('Error fetching user posts. Please try again later.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getPosts();
  }, [dispatch, selectedUser]);

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  return (
    <div>
      <h2>User Posts</h2>
      {loading && <CircularProgress className='circularProgress'/>}
      {error && <p className='error'>{error}</p>}
      {selectedUser ? (
        <>
          <Button variant="contained" color="primary" onClick={handleOpenDialog}>
            Create New Post
          </Button>
          <div className='postsContent'>
            {posts.map((post) => (
              <div key={post.id}>
                <h3>{post.title}</h3>
                <p>{post.body}</p>
              </div>
            ))}
          </div>
          <NewPostDialog isOpen={isDialogOpen} onClose={handleCloseDialog} />
        </>
      ) : (
        <p>Select a user to see all their posts.</p>
      )}
    </div>
  );
};

export default UserPosts;
