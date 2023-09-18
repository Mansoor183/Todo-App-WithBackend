package TodoBackend.Todo.controller;

import TodoBackend.Todo.model.Todo;
import TodoBackend.Todo.service.TodoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/todos")
public class TodoController {
    private final TodoService todoService;
    @Autowired
    public  TodoController(TodoService todoService){
        this.todoService=todoService;
    }

    @GetMapping("/get")
    public List<Todo> getAllTodos(){
        return todoService.getAllTodos();
    }

    @PostMapping("/post")
    public Todo createTodo(@RequestBody Todo todo){
        return todoService.createTodo(todo);
    }

    @DeleteMapping("/del/{id}")
    public void deleteTodo(@PathVariable Long id){
        todoService.deleteTodo(id);
    }

    @PutMapping("/update/{id}")
    public Todo updateTodo(@PathVariable Long id, @RequestBody Todo updatedTodo){
        return todoService.updateTodo(id,updatedTodo);
    }


    @PutMapping("/{id}/toggle")
    public Todo toggleCompleted(@PathVariable Long id){
        return todoService.toggleComplete(id);
    }

}
