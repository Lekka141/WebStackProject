const { useDispatch } = require('react-redux'); // Keep if you're using Redux

const WidgetLogic = (widget) => {
  let editing = false;
  let title = widget.title;
  let content = widget.content;

  const dispatch = useDispatch(); // Keep if you're using Redux

  const handleEditClick = () => {
    editing = true;
  };

  const handleSaveClick = () => {
    dispatch(updateWidget(widget.id, { title, content })); // Assuming updateWidget is available
    editing = false;
  };

  const handleDeleteClick = () => {
    dispatch(deleteWidget(widget.id)); // Assuming deleteWidget is available
  };

  // Return an object containing the logic and state
  return {
    editing,
    title,
    content,
    handleEditClick,
    handleSaveClick,
    handleDeleteClick,
  };
};

module.exports = WidgetLogic;
