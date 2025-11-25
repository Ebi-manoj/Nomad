import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Star } from 'lucide-react';
import { reviewSchema, type ReviewFormData } from '@/validation/review';

interface ReviewFormProps {
  onSubmitted?: (data: ReviewFormData) => void;
}

export const ReviewForm = ({ onSubmitted }: ReviewFormProps) => {
  const {
    handleSubmit,
    register,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ReviewFormData>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      rating: 0,
      reviewText: '',
    },
  });

  const rating = watch('rating');

  const onSubmit = async (data: ReviewFormData) => {
    onSubmitted?.(data);
  };

  const handleStarClick = (star: number) => {
    setValue('rating', star, { shouldValidate: true });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white w-full">
      <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">
        Share Feedback
      </h3>

      <input type="hidden" {...register('rating', { valueAsNumber: true })} />

      <div className="mb-6">
        <p className="text-gray-700 font-medium mb-3 text-center">
          Rate your ride:
        </p>
        <div className="flex justify-center gap-2">
          {[1, 2, 3, 4, 5].map(star => (
            <button
              key={star}
              type="button"
              onClick={() => handleStarClick(star)}
              className="group transition-transform hover:scale-110"
            >
              <Star
                className={`w-9 h-9 cursor-pointer ${
                  star <= rating
                    ? 'text-yellow-400 fill-yellow-400'
                    : 'text-gray-300'
                }`}
              />
            </button>
          ))}
        </div>
        {errors.rating && (
          <p className="mt-2 text-sm text-red-500 text-center">
            {errors.rating.message}
          </p>
        )}
      </div>

      <div className="mb-6">
        <textarea
          {...register('reviewText')}
          placeholder="Write feedback..."
          className="w-full h-24 px-3 py-2 border border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none text-gray-700"
        />
        {errors.reviewText && (
          <p className="mt-2 text-sm text-red-500">
            {errors.reviewText.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="cursor-pointer w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-lg transition-all shadow disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
};
