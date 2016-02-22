class TodosController < ApplicationController
  def index
    user = User.find(params[:user_id])
    respond_with user.todos
  end

  def create
    user = User.find(params[:user_id])
    todo = Todo.new(todo_params)
    if todo.save
      respond_with user, todo
    else
      render json: todo.errors.full_messages.to_sentence.to_json, status: 422
    end
  end

  def update
    todo = Todo.find(params[:id])
    if todo.update(todo_params)
      respond_with todo
    else
      render json: todo.errors.full_messages.to_sentence.to_json, status: 422
    end
  end

  def show
    todo = Todo.find(params[:id])
    respond_with todo
  end

  def destroy
    todo = Todo.find(params[:id]).delete

    respond_with todo
  end

  def complete_pomo
    todo = Todo.find(params[:id])
    todo.pomo_completed!

    respond_with todo
  end

  def complete_todo
    todo = Todo.find(params[:id])
    todo.complete!

    respond_with todo
  end

  private
  def todo_params
    params.require(:todo).permit(:title, :description, :expected_pomos,
                                 :completed_pomos, :time_started, :time_finished,
                                 :started, :finished, :user_id)
  end
end
