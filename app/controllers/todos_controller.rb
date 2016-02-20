class TodosController < ApplicationController
  def index
    user = User.find(params[:user_id])
    respond_with user.todos
  end

  def create
    respond_with Todo.create(post_params)
  end

  def show
    respond_with Todo.find(params[:id])
  end

  def complete_pomo
    todo = Todo.find(params[:id])
    todo.pomo_completed!(:upvotes)

    respond_with todo
  end

  private
  def todo_params
    params.require(:todo).permit(:title, :description, )
  end
end
