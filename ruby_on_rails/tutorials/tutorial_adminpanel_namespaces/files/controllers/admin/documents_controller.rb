class Admin::DocumentsController < ApplicationController

  before_action :set_document, only: [:show, :edit, :update, :destroy]

  layout 'admin/admin'

  def index
    @documents = Document.all.paginate(page: params[:page], per_page: 10)
  end  

  def show
  end  

  def new
    @document = Document.new
  end

  def edit
  end

  def create
    @document = Document.new(document_params)
    @document.save
    if @document.errors.empty?
      redirect_to @document
    else
      render 'new'
    end
  end

  def update
    if @document.update(document_params)
      redirect_to admin_document_path(@document)
    else
      render action: 'edit'
    end
  end

  def destroy
    if @document.destroy 
      redirect_to admin_documents_url
    end
  end

  private
    def set_document
      @document = Document.find(params[:id])
    end

    def document_params
      params.require(:document).permit(:title, :body)
    end
    
end
