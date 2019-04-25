class ServicesController < ApplicationController
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
        if user
            service = Service.create({
                date: params[:date],
                time: params[:time],
                userId: user.id,
                serviceType: params[:serviceType]
            })
            if service.save
                render json: service
            else
                render plain:"Failed to create service", status: 500
            end
        else
            render plain:"Failed to book service", status: 500
        end
        
    end

    def getall
        user = getUser()
        if user
            render json: Service.where('userId = ?', user.id)
        else
            render json: []
        end
    end

    def index
        service = Service.find(params[:id])
        if service
            render json: service
        else
            render plain: "Not found", status: 402
        end
    end

    def update
        service = Service.find(params[:id])
        if service
            service.update_attributes(service_params)
            render json: service
        else
            render plain: "Failed to update", status: 500
        end
    end

    def delete
        Service.destroy(params[:id])
        render plain: "OK"
    end

    private
    def service_params
        params.require(:service).permit(:id, :date, :time, :serviceType)
    end
end
