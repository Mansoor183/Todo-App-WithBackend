package TodoBackend.Todo.service;

import TodoBackend.Todo.model.Todo;
import TodoBackend.Todo.repository.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TodoService {
    private final TodoRepository todoRepository;

    @Autowired
    public TodoService(TodoRepository todoRepository){
        this.todoRepository=todoRepository;
    }

    public List<Todo> getAllTodos(){
        return todoRepository.findAll();
    }

    public Todo createTodo(Todo todo){
        return todoRepository.save(todo);
    }

    public void deleteTodo(Long id){
        todoRepository.deleteById(id);
    }

    public Todo updateTodo(Long id, Todo updatedTodo){
        Todo todo =todoRepository.findById(id).orElse(null);
        if (todo!=null){
            todo.setText(updatedTodo.getText());
            return todoRepository.save(todo);
        }
        return null;
    }

    public Todo toggleComplete(Long id){
        Todo todo=todoRepository.findById(id).orElse(null);
        if (todo!=null){
            todo.setCompleted(!todo.isCompleted());
            return todoRepository.save(todo);
        }
        return null;
    }

}
