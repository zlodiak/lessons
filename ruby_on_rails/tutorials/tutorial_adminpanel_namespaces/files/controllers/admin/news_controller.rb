class Admin::NewsController < ApplicationController

  before_action :set_news, only: [:show, :edit, :update, :destroy]

  layout 'admin/admin'

  def index
    @news = News.all.paginate(page: params[:page], per_page: 10)
  end

  def show
  end

  def new
    @news = News.new
  end

  def edit
  end

  def create
    @news = News.new(news_params)
    @news.save
    if @news.errors.empty?
      redirect_to @news
    else
      render 'new'
    end
  end

  def update
    if @news.update(news_params)
      redirect_to admin_news_path(@news)
    else
      render action: 'edit'
    end
  end

  def destroy
    if @news.destroy 
      redirect_to admin_news_index_path
    end
  end

  private
    def set_news
      @news = News.find(params[:id])
    end

    def news_params
      params.require(:news).permit(:image_url, :title, :body)
    end

end
