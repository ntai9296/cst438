class OrdersController < ApplicationController
    def getUser
        token = request.headers["Authorization"]
        session = Session.find_by(token: token)
  
        if session
          return User.find(session.userId)
        else
          return nil
        end
      end
    def create
        user = getUser()

        if params[:items].length <= 0
            render plain: 'Missing item', status: 500
        end

        if user
            order = Order.create({
                total: params[:total],
                userId: user.id
            })
        if order.save
            items = []
            # Create orderItem and update inventory
            params[:items].each do |item|
                itemUpdate = Item.find(item["id"])

                if (itemUpdate["quantity"] > 0)
                    items.push(OrderItem.create({
                        name: item["name"],
                        price: item["price"],
                        orderId: order.id,
                    }))
                    itemUpdate.update_attributes({
                        quantity: itemUpdate.quantity - 1
                    })
                end
                
            end
            render json: {
                id: order.id,
                total: order.total,
                items: items,
                created_at: order.created_at
            }
            else
                render plain:"Failed to create order", status: 500
            end
        else
            render plain: "Login to checkout", status: 500
        end
        
    end

    def getall
        user = getUser()
        if user
            orders = Order.where('userId = ?', user.id)
            render json: orders
        else
            render json: []
        end
    end

    def index
        order = Order.find(params[:id])
        if order
            render json: order
        else
            render plain: "Not found", status: 402
        end
    end

    def update
        order = Order.find(params[:id])
        if order
            order.update_attributes(order_params)
            render json: order
        else
            render plain: "Failed to update", status: 500
        end
    end

    private
    def order_params
        params.require(:order).permit(:id, :total, :items, :status)
    end
    
end
