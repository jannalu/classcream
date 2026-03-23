module Api::V1
  class JobsController < ApiController

    def index
      @jobs = Job.active.alphabetical
      render json: JobsSerializer.new(@jobs).serializable_hash
    end

  end
end