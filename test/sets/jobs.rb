module Contexts
  module Jobs

    def create_jobs
      @cashier = FactoryBot.create(:job)
      @server = FactoryBot.create(:job, name: "Server", description: "Serving treats to customers")
      @glacier = FactoryBot.create(:job, name: "Glacier", description: "Making ice cream and gelato")
      @mover = FactoryBot.create(:job, name: "Mover", active: false, description: "Moving stuff")
    end
    
    def destroy_jobs
      @cashier.destroy
      @server.destroy
      @glacier.destroy
      @mover.destroy
    end

  end
end