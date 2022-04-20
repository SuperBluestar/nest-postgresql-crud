import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo) private todoRepository: Repository<Todo>,
  ) {}

  async create(createTodoDto: CreateTodoDto) {
    const newTodo = await this.todoRepository.create(createTodoDto);
    await this.todoRepository.save(newTodo);

    return newTodo;
    // return 'This action adds a new todo';
  }

  findAll() {
    return this.todoRepository.find();
    // return `This action returns all todo`;
  }

  async findOne(id: number) {
    const todo = await this.todoRepository.findOneById(id);
    if (todo) {
      return todo;
    }

    throw new HttpException('Todo not found', HttpStatus.NOT_FOUND);
    // return `This action returns a #${id} todo`;
  }

  async update(id: number, updateTodoDto: UpdateTodoDto) {
    await this.todoRepository.update(id, updateTodoDto);
    const updatedTodo = await this.todoRepository.findOneById(id);
    if (updatedTodo) {
      return updatedTodo;
    }

    throw new HttpException('Todo not found', HttpStatus.NOT_FOUND);
    // return `This action updates a #${id} todo`;
  }

  async remove(id: number) {
    const deletedTodo = await this.todoRepository.delete(id);
    if (!deletedTodo.affected) {
      throw new HttpException('Todo not found', HttpStatus.NOT_FOUND);
    }
    // return `This action removes a #${id} todo`;
  }
}
