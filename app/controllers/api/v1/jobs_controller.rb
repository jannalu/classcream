module Api::V1
  class JobsController < ApiController

    def index
      @jobs = Job.active.alphabetical
      render json: JobSerializer.new(@jobs).serializable_hash
    end

    
  end
end