import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Mail,
  Phone,
  User2,
  BadgeCheck,
  Bike,
  Lock,
  Upload,
  Loader2,
  Camera,
} from 'lucide-react';
import { PiPersonSimpleHikeBold } from 'react-icons/pi';
import { Field } from '@/components/ProfileInput';
import { VerificationSection } from '@/pages/User/Profile/VerificationFields';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '@/store/store';
import { UserAvatar } from '@/components/ProfilePic';
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import {
  fetchUserProfile,
  updateUserProfile,
  getProfileUploadPresignedUrl,
  updateUserProfileImage,
} from '@/api/profile';
import { setUser } from '@/store/features/auth/authSlice';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  updateProfileSchema,
  type UpdateProfileFormValues,
} from '@/validation/profile';
import { toast } from 'sonner';
import axios from 'axios';
import { profileImageSchema } from '@/validation/profileImage';
import { handleApiError } from '@/utils/HandleApiError';

export default function ProfilePage() {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const data = useSelector((state: RootState) => state.subscription.data);
  const tier = data?.tier ?? 'FREE';
  const badgeColor = data?.subscription?.badgeColor ?? '#6b7280';
  const safetyScore = user?.safetyScore ?? 0;
  const [rideCount, setRideCount] = useState(0);
  const [hikeCount, setHikeCount] = useState(0);
  const [editing, setEditing] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UpdateProfileFormValues>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      fullName: user?.fullName ?? '',
      mobile: user?.mobile ?? '',
    },
  });

  useEffect(() => {
    (async () => {
      try {
        const res = await fetchUserProfile();
        dispatch(setUser(res.user));
        setRideCount(res.totalRides);
        setHikeCount(res.totalHikes);
      } catch {}
    })();
  }, [dispatch]);

  useEffect(() => {
    reset({ fullName: user?.fullName ?? '', mobile: user?.mobile ?? '' });
  }, [user, reset]);

  async function onSubmit(values: UpdateProfileFormValues) {
    try {
      const res = await updateUserProfile({
        fullName: values.fullName,
        mobile: values.mobile === '' ? undefined : values.mobile,
      });
      dispatch(setUser(res.user));
      toast.success('Profile updated successfully');
      setEditing(false);
    } catch (e) {
      toast.error('Failed to update profile');
    }
  }

  async function handleImageSelected(e: React.ChangeEvent<HTMLInputElement>) {
    try {
      const files = e.target.files;
      profileImageSchema.parse({ file: files });
      if (!files) return;
      const file = files[0];
      setUploading(true);
      const { uploadURL, fileURL } = await getProfileUploadPresignedUrl(
        file.name,
        file.type
      );
      await axios.put(uploadURL, file, {
        headers: { 'Content-Type': file.type },
      });
      const res = await updateUserProfileImage(fileURL);
      dispatch(setUser(res.user));
      toast.success('Profile photo updated');
    } catch (err) {
      handleApiError(err);
    } finally {
      setUploading(false);
      if (e.target) e.target.value = '';
    }
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 md:py-14">
      <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-pretty text-2xl font-semibold tracking-tight md:text-3xl">
          Profile Management
        </h1>

        <Button
          variant="outline"
          size="sm"
          className="h-9 gap-2 shadow-sm"
          asChild
        >
          <Link to="/change-password">
            <Lock className="size-3.5 text-muted-foreground" />
            <span>Security Settings</span>
          </Link>
        </Button>
      </header>

      <section aria-labelledby="profile-card" className="mb-10">
        <Card className="bg-card/80 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <div className="flex flex-col items-center justify-between gap-6 md:flex-row md:items-start">
              <div className="flex items-center gap-4">
                {user && (
                  <div
                    onClick={() => !uploading && fileInputRef.current?.click()}
                    className="relative inline-block group cursor-pointer"
                  >
                    {uploading ? (
                      <div className="cursor-pointer w-16 h-16 rounded-full border border-gray-700 bg-gray-100 flex items-center justify-center">
                        <Loader2 className="animate-spin" />
                      </div>
                    ) : (
                      <UserAvatar
                        fullName={user?.fullName}
                        imageUrl={user?.profilePic ?? ''}
                        subscriptionTier={tier}
                        badgeColor={badgeColor}
                        size="lg"
                        showBadge
                      />
                    )}
                    <div
                      className="absolute inset-0 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100
                      transition-opacity"
                    >
                      <Camera className="w-5 h-5 opacity-70" />
                    </div>
                  </div>
                )}
                <div>
                  <p className="text-lg font-semibold leading-none">
                    {user?.fullName}
                  </p>
                  <p className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                    <BadgeCheck
                      className="size-4 text-chart-2"
                      aria-hidden="true"
                    />
                    <span>
                      Member since{' '}
                      {user?.createdAt &&
                        new Date(user?.createdAt).getFullYear()}
                    </span>
                  </p>
                </div>
              </div>

              {/* Right: Safety score */}
              <div className="w-full max-w-sm md:w-[360px]">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Safe Riding</span>
                  <span className="text-sm font-semibold">{safetyScore}%</span>
                </div>
                <div className="mt-2 h-2 w-full rounded-full bg-muted">
                  <div
                    className="h-2 rounded-full bg-chart-2"
                    style={{ width: `${safetyScore}%` }}
                    aria-label="Safety score progress"
                    role="progressbar"
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={safetyScore}
                  />
                </div>
                <div className="mt-3 grid grid-cols-2 gap-3 text-xs text-muted-foreground">
                  <div className="flex items-center gap-2 rounded-md border border-border px-2 py-1.5">
                    <Bike
                      className="size-3.5 text-foreground/70"
                      aria-hidden="true"
                    />
                    <span>
                      <span className="font-semibold text-foreground">
                        {rideCount || 0}
                      </span>{' '}
                      rides
                    </span>
                  </div>
                  <div className="flex items-center gap-2 rounded-md border border-border px-2 py-1.5">
                    <PiPersonSimpleHikeBold className="size-3.5" />

                    <span>
                      <span className="font-semibold text-foreground">
                        {hikeCount || 0}
                      </span>{' '}
                      hikes
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="pt-6">
            <div className="mb-4 flex items-center gap-3">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageSelected}
                className="hidden"
              />
            </div>
            {editing ? (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <label className="block">
                    <span className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      <User2 className="size-4" aria-hidden="true" /> Full name
                    </span>
                    <input
                      type="text"
                      className="w-full rounded-md border border-black px-3 py-2 font-semibold text-foreground focus:outline-none focus:ring-1 focus:ring-black"
                      {...register('fullName')}
                    />
                    {errors.fullName && (
                      <p className="mt-1 text-xs text-red-600">
                        {errors.fullName.message?.toString()}
                      </p>
                    )}
                  </label>
                  <div />
                  <Field
                    icon={<Mail className="size-4" aria-hidden="true" />}
                    label="Email"
                    value={user?.email ?? ''}
                  />
                  <label className="block">
                    <span className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      <Phone className="size-4" aria-hidden="true" /> Mobile
                    </span>
                    <input
                      type="text"
                      className="w-full rounded-md border border-black px-3 py-2 font-semibold text-foreground focus:outline-none focus:ring-1 focus:ring-black"
                      placeholder="Enter 10-digit mobile number"
                      {...register('mobile')}
                    />
                    {errors.mobile && (
                      <p className="mt-1 text-xs text-red-600">
                        {errors.mobile.message?.toString()}
                      </p>
                    )}
                  </label>
                </div>
                <div className="mt-6 flex items-center gap-3">
                  <Button
                    type="submit"
                    className="px-5 cursor-pointer"
                    variant="default"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Updating...' : 'Update profile'}
                  </Button>
                  <Button
                    type="button"
                    className="px-5 cursor-pointer"
                    variant="outline"
                    onClick={() => {
                      reset({
                        fullName: user?.fullName ?? '',
                        mobile: user?.mobile ?? '',
                      });
                      setEditing(false);
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            ) : (
              <>
                <div className="grid gap-4 md:grid-cols-2">
                  <Field
                    icon={<User2 className="size-4" aria-hidden="true" />}
                    label="Full name"
                    value={user?.fullName ?? ''}
                  />
                  <div />
                  <Field
                    icon={<Mail className="size-4" aria-hidden="true" />}
                    label="Email"
                    value={user?.email ?? ''}
                  />
                  <Field
                    icon={<Phone className="size-4" aria-hidden="true" />}
                    label="Mobile"
                    value={user?.mobile ?? 'nill'}
                  />
                </div>

                <div className="mt-6 flex justify-center md:justify-start">
                  <Button
                    className="px-5 cursor-pointer"
                    variant="default"
                    onClick={() => setEditing(true)}
                  >
                    Edit profile
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </section>

      <VerificationSection />
    </main>
  );
}
