import React, {useState} from 'react';
import {Button, Text, Card, TextInput} from 'react-native-paper';
import {View} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {addComment, deleteComment, updateComment} from '../../../redux/action';
import {RootState} from '../../../redux/reducers'; // Assuming RootState is defined

interface Comment {
  id: string;
  comment: string;
  author: string;
}

interface TodoListProps {
  comments: Comment[];
  task: string;
  priority: number;
  deleteTodo: () => void;
  complete: boolean;
  updateComplete: () => void;
  showUpdateModal: () => void;
  todoId: string;
  setTodoId: (id: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({
  comments,
  task,
  priority,
  deleteTodo,
  complete,
  updateComplete,
  showUpdateModal,
  todoId,
  setTodoId,
}): React.ReactElement => {
  const priorityText =
    priority === 3 ? 'High' : priority === 2 ? 'Medium' : 'Low';
  const todoList = useSelector((state: RootState) => state.todos);
  const dispatch = useDispatch();

  const [commentVal, setCommentVal] = useState<string>('');
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [commentId, setCommentId] = useState<string | undefined>();

  return (
    <Card>
      <Card.Title title={task} subtitle={'Priority: ' + priorityText} />
      <Card.Content>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            alignContent: 'center',
          }}>
          <Text variant="titleMedium">Comments</Text>
        </View>

        <View>
          {/* Comments */}
          {comments?.map((comment: Comment, index: number) => (
            <View key={index}>
              <Text style={{marginLeft: '3%'}}> {comment.comment} </Text>
              <View style={{flexDirection: 'row'}}>
                <Button
                  style={{height: '100%'}}
                  onPress={() => {
                    dispatch(deleteComment(comment.id, todoId));
                    console.log(JSON.stringify(todoList));
                  }}>
                  Delete
                </Button>
                <Button
                  onPress={() => {
                    setIsUpdate(true);
                    setCommentId(comment.id);
                    setCommentVal(comment.comment);
                  }}>
                  Update
                </Button>
              </View>
              <Text> {comment.author} </Text>
            </View>
          ))}
        </View>
        <TextInput
          multiline
          label="Enter comment"
          value={commentVal}
          onChangeText={text => setCommentVal(text)}
        />
        <Button
          onPress={() => {
            if (!isUpdate) {
              dispatch(addComment(commentVal, todoId));
              setCommentVal('');
            } else {
              console.log(JSON.stringify(todoList));
              dispatch(updateComment(todoId, commentId!, commentVal));
              setCommentVal('');
              setIsUpdate(false);
            }
          }}>
          {isUpdate ? 'Update Comment' : ' Add Comment'}
        </Button>
        {isUpdate && (
          <Button
            onPress={() => {
              setIsUpdate(false);
              setCommentVal('');
            }}>
            Cancel
          </Button>
        )}
      </Card.Content>

      <Card.Actions>
        <Button onPress={deleteTodo}>Delete</Button>
        <Button
          onPress={() => {
            setTodoId(todoId);
            showUpdateModal();
            setCommentVal('');
          }}>
          Update
        </Button>
        <Button onPress={updateComplete}>
          {complete ? 'Completed' : 'Complete'}
        </Button>
      </Card.Actions>
    </Card>
  );
};

export default TodoList;
