class TodosController < ApplicationController
  def index
    user = User.find(params[:user_id])
    respond_with user.todos
  end

  def create
    user = User.find(params[:user_id])
    todo = Todo.create(todo_params)
    respond_with user, todo
  end

  def show
    todo = Todo.find(params[:id])
    respond_with todo
  end

  def complete_pomo
    todo = Todo.find(params[:id])
    todo.pomo_completed!

    respond_with todo
  end

  private
  def todo_params
    params.require(:todo).permit(:title, :description, :user_id)
  end
end
