module Api
  module V1
    class FacilityOnboardingsController < ApplicationController
      before_action :authenticate_staff!

      def show
        onboarding = FacilityOnboarding.find_or_create_by!(staff: current_staff)
        render json: { step: onboarding.current_step }, status: :ok
      end

      def update
        onboarding = FacilityOnboarding.find_or_create_by!(staff: current_staff)
        onboarding.advance_to_next_step!
        render json: { step: onboarding.current_step }, status: :ok
      rescue FacilityOnboarding::AlreadyOnboardedError
        render json: { step: onboarding.current_step, message: "すでにオンボーディング完了済みです" }, status: :unprocessable_entity
      end
    end
  end
end
