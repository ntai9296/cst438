class ItemsController < ApplicationController
    def create
        item = Item.new(item_params)
        if item.save
            render json: item
        else
            render plain:"Failed to create item", status: 500
        end
    end

    def getall
        render json: Item.where('quantity > ?', 0)
    end

    def all
        render json: Item.all
    end

    def index
        item = Item.find(params[:id])
        if item
            render json: item
        else
            render plain: "Not found", status: 402
        end
    end

    def update
        item = Item.find(params[:id])
        if item
            item.update_attributes(item_params)
            render json: item
        else
            render plain: "Failed to update", status: 500
        end
    end

    def delete
        Item.destroy(params[:id])
    end

    private
    def item_params
        params.require(:item).permit(:id, :name, :price, :quantity, :description, :image)
    end

end
