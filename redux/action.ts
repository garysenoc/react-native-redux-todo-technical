export const ADD_TODO = 'ADD_TODO';
export const DELETE_ALL_TODO = 'DELETE_ALL_TODO';
export const DELETE_TODO = 'DELETE_TODO';
export const UPDATE_COMPLETE = 'UPDATE_COMPLETE';
export const UPDATE_TODO = 'UPDATE_TASK';
export const ADD_COMMENT = 'ADD_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const UPDATE_COMMENT = 'UPDATE_COMMENT';
export const SORT_PRIORITY_ASC = 'SORT_PRIORITY_ASC';
export const SORT_PRIORITY_DESC = 'SORT_PRIORITY_DESC';
export const SORT_NAME_DESC = 'SORT_NAMAE_DESC';
export const SORT_NAME_ASC = 'SORT_PRIORITY_ASC';

export const addTodo = (task: any, priority: any, name: string) => ({
  type: ADD_TODO,
  payload: {
    id: Date.now(),
    task,
    priority,
    name,
  },
});

export const deleteAllTodo = () => ({
  type: DELETE_ALL_TODO,
});

export const deleteTodo = (id: any) => ({
  type: DELETE_TODO,
  payload: {
    id,
  },
});

export const updateComplete = (id: any) => ({
  type: UPDATE_COMPLETE,
  payload: {
    id,
  },
});

export const updateTodo = (task: any, priority: any, id: any) => ({
  type: UPDATE_TODO,
  payload: {
    task,
    priority,
    id,
  },
});

export const addComment = (comment: any, todoId: any) => ({
  type: ADD_COMMENT,
  payload: {
    id: Date.now(),
    comment,
    todoId,
  },
});

export const deleteComment = (commentId: any, todoId: any) => ({
  type: DELETE_COMMENT,
  payload: {
    commentId,
    todoId,
  },
});

export const updateComment = (
  todoId: any,
  commentId: any,
  updatedComment: any,
) => ({
  type: UPDATE_COMMENT,
  payload: {
    todoId,
    commentId,
    updatedComment,
  },
});
export const sortPriorityAscending = () => ({
  type: SORT_PRIORITY_ASC,
});

export const sortPriorityDescending = () => ({
  type: SORT_PRIORITY_DESC,
});

export const sortNameAscending = () => ({
  type: SORT_NAME_ASC,
});

export const sortNameDescending = () => ({
  type: SORT_NAME_DESC,
});
