class StoresController < ApplicationController
  authorize_resource

  def index
    @active_stores = Store.active.alphabetical
    @inactive_stores = Store.inactive.alphabetical
  end

  def show
    @store = Store.find(params[:id])
    @current_employees = @store.employees.active
  end

  def new
    @store = Store.new
  end

  def create
    @store = Store.new(store_params)
    if @store.save
      flash[:notice] = "Successfully created #{@store.name}."
      redirect_to store_path(@store)
    else
      render :new
    end
  end

  def edit
    @store = Store.find(params[:id])
  end

  def update
    @store = Store.find(params[:id])
    if @store.update(store_params)
      flash[:notice] = "Updated store information for #{@store.name}."
      redirect_to store_path(@store)
    else
      render :edit
    end
  end

  private

  def store_params
    params.require(:store).permit(:name, :street, :city, :state, :zip, :phone, :active)
  end
end