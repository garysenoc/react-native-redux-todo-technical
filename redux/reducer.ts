import {
  ADD_TODO,
  DELETE_ALL_TODO,
  DELETE_TODO,
  UPDATE_COMPLETE,
  UPDATE_TODO,
  ADD_COMMENT,
  DELETE_COMMENT,
  UPDATE_COMMENT,
  SORT_PRIORITY_ASC,
  SORT_PRIORITY_DESC,
  SORT_NAME_ASC,
  SORT_NAME_DESC,
} from './action';

const initialState = {
  todos: [],
};

const todoReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ADD_TODO: {
      const {id, task, priority, name} = action.payload;
      return {
        ...state,
        todos: [
          ...state.todos,
          {id, task, priority, user: name, comments: [], complete: false},
        ],
      };
    }
    case DELETE_ALL_TODO: {
      return {
        ...state,
        todos: [], // Emptying the todos array
      };
    }
    case DELETE_TODO: {
      const {id} = action.payload;
      // Filter out the todo with the specified id
      const updatedTodos = state.todos.filter((todo: any) => todo.id !== id);
      return {
        ...state,
        todos: updatedTodos,
      };
    }

    case UPDATE_COMPLETE: {
      const {id} = action.payload;
      // Map over todos and update the complete property of the todo with the specified id
      const updatedTodos = state.todos.map((todo: any) => {
        if (todo.id === id) {
          // Toggle the complete property
          return {...todo, complete: !todo.complete};
        }
        return todo; // Return the unchanged todo for todos that don't match the id
      });
      return {
        ...state,
        todos: updatedTodos,
      };
    }
    case UPDATE_TODO: {
      const {id, task, priority} = action.payload;
      // Map over todos and update the todo with the specified id
      const updatedTodos = state.todos.map((todo: any) => {
        if (todo.id === id) {
          return {...todo, task, priority};
        }
        return todo; // Return unchanged todos
      });
      return {
        ...state,
        todos: updatedTodos,
      };
    }

    case ADD_COMMENT: {
      const {todoId, comment, id} = action.payload;
      // Map over todos and update the todo with the specified id
      const updatedTodos = state.todos.map((todo: any) => {
        if (todo.id === todoId) {
          return {...todo, comments: [...todo.comments, {comment, id}]};
        }
        return todo; // Return unchanged todos
      });
      return {
        ...state,
        todos: updatedTodos,
      };
    }
    case DELETE_COMMENT: {
      const {todoId, commentId} = action.payload;

      // Map over todos and update the todo with the specified todoId
      const updatedTodos = state.todos.map((todo: any) => {
        if (todo.id === todoId) {
          // Filter out the comment with the specified commentId
          const updatedComments = todo.comments.filter(
            (comment: any) => comment.id !== commentId,
          );
          return {...todo, comments: updatedComments};
        }
        return todo; // Return unchanged todos
      });

      console.log(updatedTodos);

      return {
        ...state,
        todos: updatedTodos,
      };
    }
    case UPDATE_COMMENT: {
      const {todoId, commentId, updatedComment} = action.payload;
      const updatedTodos = state.todos.map((todo: any) => {
        if (todo.id === todoId) {
          const updatedComments = todo.comments.map((comment: any) => {
            if (comment.id === commentId) {
              return {...comment, comment: updatedComment};
            }
            return comment;
          });
          return {...todo, comments: updatedComments};
        }
        return todo;
      });
      return {
        ...state,
        todos: updatedTodos,
      };
    }
    case SORT_PRIORITY_ASC: {
      const sortedTodos = [...state.todos].sort(
        (a: any, b: any) => a.priority - b.priority,
      );
      return {
        ...state,
        todos: sortedTodos,
      };
    }
    case SORT_PRIORITY_DESC: {
      const sortedTodos = [...state.todos].sort(
        (a: any, b: any) => b.priority - a.priority,
      );
      return {
        ...state,
        todos: sortedTodos,
      };
    }

    case SORT_NAME_ASC: {
      const sortedTodos = [...state.todos].sort((a: any, b: any) =>
        a.task.localeCompare(b.task),
      );
      return {
        ...state,
        todos: sortedTodos,
      };
    }

    case SORT_NAME_DESC: {
      const sortedTodos = [...state.todos].sort((a: any, b: any) =>
        b.task.localeCompare(a.task),
      );
      return {
        ...state,
        todos: sortedTodos,
      };
    }
    default:
      return state;
  }
};

export default todoReducer;
