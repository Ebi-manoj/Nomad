import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Mail, Phone, User2, BadgeCheck, Bike } from 'lucide-react';
import { PiPersonSimpleHikeBold } from 'react-icons/pi';
import { Field } from '@/components/ProfileInput';
import { VerificationSection } from '@/components/VerificationFields';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store/store';

type Profile = {
  name: string;
  email: string;
  phone: string;
  memberSince: string;
  safetyScore: number;
  ridesCompleted: number;
  hoursCompleted: number;
};

const profile: Profile = {
  name: 'Cristiano',
  email: 'bimonaaj28@gmail.com',
  phone: '9993314473',
  memberSince: '2023',
  safetyScore: 86,
  ridesCompleted: 30,
  hoursCompleted: 70,
};

export default function ProfilePage() {
  const { user } = useSelector((state: RootState) => state.auth);
  const tier = useSelector((state: RootState) => state.subscription.data?.tier);
  return (
    <main className="mx-auto max-w-5xl px-4 py-10 md:py-14">
      <header className="mb-8">
        <h1 className="text-pretty text-2xl font-semibold tracking-tight md:text-3xl">
          Profile Management
        </h1>
      </header>

      <section aria-labelledby="profile-card" className="mb-10">
        <Card className="bg-card/80 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <div className="flex flex-col items-center justify-between gap-6 md:flex-row md:items-start">
              <div className="flex items-center gap-4">
                <Avatar className="size-16 border-2 border-amber-400 ring-1 ring-border">
                  <AvatarImage alt="Profile photo" src="/initials-avatar.jpg" />
                  <AvatarFallback className="font-semibold ">
                    {user?.fullName
                      .split(' ')
                      .map(w => w[0])
                      .join('')}
                  </AvatarFallback>
                </Avatar>
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
                  <span className="text-sm font-semibold">
                    {profile.safetyScore}%
                  </span>
                </div>
                <div className="mt-2 h-2 w-full rounded-full bg-muted">
                  <div
                    className="h-2 rounded-full bg-chart-2"
                    style={{ width: `${profile.safetyScore}%` }}
                    aria-label="Safety score progress"
                    role="progressbar"
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={profile.safetyScore}
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
                        {profile.ridesCompleted}
                      </span>{' '}
                      rides
                    </span>
                  </div>
                  <div className="flex items-center gap-2 rounded-md border border-border px-2 py-1.5">
                    <PiPersonSimpleHikeBold className="size-3.5" />

                    <span>
                      <span className="font-semibold text-foreground">
                        {profile.hoursCompleted}
                      </span>{' '}
                      hikes
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="pt-6">
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
              <Button className="px-5 cursor-pointer" variant="default">
                Edit profile
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      <VerificationSection />
    </main>
  );
}
