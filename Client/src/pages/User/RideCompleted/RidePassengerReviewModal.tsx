import { GenericModal } from '@/components/GenericModel';
import { ReviewForm } from '@/components/ReviewForm';
import type { ReviewFormData } from '@/validation/review';

interface RidePassengerReviewModalProps {
  isOpen: boolean;
  selectedHikerName: string | null;
  reviewSubmitting: boolean;
  onClose: () => void;
  onSubmit: (data: ReviewFormData) => void;
}

export const RidePassengerReviewModal = ({
  isOpen,
  selectedHikerName,
  reviewSubmitting,
  onClose,
  onSubmit,
}: RidePassengerReviewModalProps) => {
  return (
    <GenericModal
      isOpen={isOpen}
      onClose={() => {
        if (reviewSubmitting) return;
        onClose();
      }}
      title="Rate your passenger"
      subtitle={
        selectedHikerName
          ? `Share your experience with ${selectedHikerName}.`
          : 'Share your experience with this passenger.'
      }
    >
      <ReviewForm onSubmitted={onSubmit} />
    </GenericModal>
  );
};
