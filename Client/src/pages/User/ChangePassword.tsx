import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Eye,
  EyeOff,
  ShieldCheck,
  LockKeyhole,
  Check,
  Info,
} from 'lucide-react';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  passwordSchema,
  type PasswordFormValues,
} from '@/validation/changePassword';
import axiosInstance from '@/utils/axiosInstance';
import { toast } from 'sonner';
import { useHandleApiError } from '@/hooks/useHandleApiError';

export const ChangePasswordPage = () => {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);

  const form = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    mode: 'onChange',
  });

  const watchedNewPassword = form.watch('newPassword');
  const watchedConfirmPassword = form.watch('confirmPassword');

  const checks = {
    length: watchedNewPassword?.length >= 8,
    number: /\d/.test(watchedNewPassword || ''),
    symbol: /[!@#$%^&*(),.?":{}|<>]/.test(watchedNewPassword || ''),
    match:
      watchedNewPassword &&
      watchedNewPassword === watchedConfirmPassword &&
      watchedNewPassword.length > 0,
  };

  const strengthScore =
    Object.values(checks).filter(Boolean).length - (checks.match ? 0 : 1);

  const getStrengthColor = () => {
    if (!watchedNewPassword) return 'bg-muted';
    if (strengthScore <= 1) return 'bg-red-500';
    if (strengthScore <= 2) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const onSubmit = async (data: PasswordFormValues) => {
    try {
      await axiosInstance.post('/auth/change-password', {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });
      toast.success('Password updated successfully');
      form.reset();
    } catch (error) {
      useHandleApiError(error);
    }
  };

  return (
    <main className="mx-auto max-w-4xl px-4 py-10 md:py-14">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Security Settings
        </h1>
        <p className="mt-2 text-muted-foreground">
          Manage your password and account security preferences.
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Col: The Form */}
        <div className="lg:col-span-2">
          <Card className="border-muted/60 shadow-sm">
            <CardHeader>
              <div className="mb-2 flex size-10 items-center justify-center rounded-full bg-primary/10">
                <LockKeyhole className="size-5 text-primary" />
              </div>
              <CardTitle>Change Password</CardTitle>
              <CardDescription>
                Update your password to keep your account secure.
              </CardDescription>
            </CardHeader>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <CardContent className="space-y-6">
                  {/* Current Password Field */}
                  <FormField
                    control={form.control}
                    name="currentPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Current Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              {...field}
                              type={showCurrent ? 'text' : 'password'}
                              className="pr-10"
                              placeholder="••••••••"
                            />
                            <button
                              type="button"
                              onClick={() => setShowCurrent(!showCurrent)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                            >
                              {showCurrent ? (
                                <EyeOff className="size-4" />
                              ) : (
                                <Eye className="size-4" />
                              )}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Separator />

                  {/* New Password Field */}
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="newPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>New Password</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                {...field}
                                type={showNew ? 'text' : 'password'}
                                className="pr-10"
                                placeholder="Enter new password"
                              />
                              <button
                                type="button"
                                onClick={() => setShowNew(!showNew)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                              >
                                {showNew ? (
                                  <EyeOff className="size-4" />
                                ) : (
                                  <Eye className="size-4" />
                                )}
                              </button>
                            </div>
                          </FormControl>
                          {/* Strength Bar */}
                          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                            <div
                              className={`h-full transition-all duration-300 ${getStrengthColor()}`}
                              style={{
                                width: `${
                                  Math.max(0, Math.min(3, strengthScore)) * 33.3
                                }%`,
                              }}
                            />
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Confirm Password Field */}
                    <FormField
                      control={form.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm Password</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="password"
                              placeholder="Confirm new password"
                              className={
                                checks.match
                                  ? 'border-green-500 focus-visible:ring-green-500'
                                  : ''
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>

                <CardFooter className="flex justify-end gap-3 border-t bg-muted/20 px-6 py-4">
                  <Button
                    type="button"
                    variant="ghost"
                    className="cursor-pointer"
                    onClick={() => form.reset()}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="cursor-pointer"
                    disabled={
                      !form.formState.isValid || form.formState.isSubmitting
                    }
                  >
                    {form.formState.isSubmitting
                      ? 'Updating...'
                      : 'Update Password'}
                  </Button>
                </CardFooter>
              </form>
            </Form>
          </Card>
        </div>

        {/* Right Col: Helper/Validation Box */}
        <div className="lg:col-span-1">
          <Card className="border-muted/60 bg-muted/30 shadow-none">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <ShieldCheck className="size-4 text-muted-foreground" />
                Password Requirements
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="space-y-3 text-sm">
                <RequirementItem
                  met={checks.length}
                  label="At least 8 characters long"
                />
                <RequirementItem
                  met={checks.number}
                  label="Contains a number"
                />
                <RequirementItem
                  met={checks.symbol}
                  label="Contains a special character"
                />
                <Separator className="my-2" />
                <RequirementItem
                  met={Boolean(checks.match)}
                  label="Passwords match"
                />
              </div>

              <div className="mt-4 rounded-md border border-blue-200 bg-blue-50 p-3 text-sm text-blue-900 dark:border-blue-900/50 dark:bg-blue-900/20 dark:text-blue-200">
                <div className="flex gap-2">
                  <Info className="mt-0.5 size-4 shrink-0" />
                  <p>
                    Avoid using personal information like birthdays or pet
                    names.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
};

function RequirementItem({ met, label }: { met: boolean; label: string }) {
  return (
    <div
      className={`flex items-center gap-2.5 transition-colors ${
        met ? 'text-green-600 dark:text-green-400' : 'text-muted-foreground'
      }`}
    >
      <div
        className={`flex size-5 shrink-0 items-center justify-center rounded-full border ${
          met
            ? 'border-green-600 bg-green-100 dark:border-green-400 dark:bg-green-900/30'
            : 'border-muted-foreground/30'
        }`}
      >
        {met && <Check className="size-3" />}
      </div>
      <span className={met ? 'font-medium' : ''}>{label}</span>
    </div>
  );
}
