import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addWidget, deleteWidget, updateWidget } from '../actions/widgetActions';

const Widget = ({ widget }) => {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(widget.title);
  const [content, setContent] = useState(widget.content);

  const dispatch = useDispatch();

  useEffect(() => {
    setTitle(widget.title);
    setContent(widget.content);
  }, [widget]);

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleSaveClick = () => {
    dispatch(updateWidget(widget.id, { title, content }));
    setEditing(false);
  };

  const handleDeleteClick = () => {
    dispatch(deleteWidget(widget.id));
  };

  return (
    <div className="widget">
      {editing ? (
        <div>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
          <textarea value={content} onChange={(e) => setContent(e.target.value)} />
          <button onClick={handleSaveClick}>Save</button>
        </div>
      ) : (
        <div>
          <h2>{title}</h2>
          <p>{content}</p>
          <button onClick={handleEditClick}>Edit</button>
          <button onClick={handleDeleteClick}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default Widget;
