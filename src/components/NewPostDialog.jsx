// components/NewPostDialog.js
import React from 'react';
import { Button, Dialog, DialogTitle, DialogContent, TextField } from '@material-ui/core';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { createPost } from '../utils/api';
import { addPost } from '../redux/actions/postActions';
import { useSelector, useDispatch } from 'react-redux';

const NewPostDialog = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const selectedUser = useSelector((state) => state.user.selectedUser);

  const formik = useFormik({
    initialValues: {
      title: '',
      body: '',
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Title is required'),
      body: Yup.string().required('Body is required'),
    }),
    onSubmit: async (values, { resetForm }) => {
      if (selectedUser) {
        const postData = {
          userId: selectedUser,
          title: values.title,
          body: values.body,
        };

        // Faking the API request since jsonplaceholder does not allow real updates
        const createdPost = await createPost(postData);
        dispatch(addPost(createdPost));

        // Reset the form and close the dialog
        resetForm();
        onClose();
      }
    },
  });

  return (
    <Dialog open={isOpen !== undefined ? isOpen : false} onClose={onClose}>
      <DialogTitle>Create New Post</DialogTitle>
      <DialogContent>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            margin="normal"
            {...formik.getFieldProps('title')}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
          />
          <TextField
            label="Body"
            variant="outlined"
            fullWidth
            margin="normal"
            multiline
            rows={4}
            {...formik.getFieldProps('body')}
            error={formik.touched.body && Boolean(formik.errors.body)}
            helperText={formik.touched.body && formik.errors.body}
          />
          <Button type="submit" color="primary" variant="contained">
            Create Post
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewPostDialog;
