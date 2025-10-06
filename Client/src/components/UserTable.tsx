import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ToggleButton } from './ToogleButton';

interface User {
  id: string;
  name: string;
  email: string;
  mobile: string;
  avatar: string;
  hikes: number;
  rides: number;
  earnings: number;
  safeRiding: number;
  rating: number;
}

const mockUsers: User[] = [
  {
    id: '1',
    name: 'Emma Wilson',
    email: 'emma.wilson@email.com',
    mobile: '995934473',
    avatar: '/diverse-woman-portrait.png',
    hikes: 12,
    rides: 5,
    earnings: 250,
    safeRiding: 9,
    rating: 4,
  },
  {
    id: '2',
    name: 'Liam Garcia',
    email: 'liam.garcia@email.com',
    mobile: '1267389477',
    avatar: '/man.jpg',
    hikes: 8,
    rides: 10,
    earnings: 300,
    safeRiding: 9,
    rating: 4,
  },
  {
    id: '3',
    name: 'Olivia Davis',
    email: 'olivia.davis@email.com',
    mobile: '9846837849',
    avatar: '/woman-2.jpg',
    hikes: 15,
    rides: 3,
    earnings: 200,
    safeRiding: 9,
    rating: 4,
  },
  {
    id: '4',
    name: 'Noah Rodriguez',
    email: 'noah.rodriguez@email.com',
    mobile: '4784927489',
    avatar: '/man-2.jpg',
    hikes: 20,
    rides: 7,
    earnings: 390,
    safeRiding: 9,
    rating: 4,
  },
  {
    id: '5',
    name: 'Isabella Martinez',
    email: 'isabella.martinez@email.com',
    mobile: '9474748388',
    avatar: '/woman-3.jpg',
    hikes: 5,
    rides: 15,
    earnings: 450,
    safeRiding: 9,
    rating: 4,
  },
];

export function UserTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [blockedUsers, setBlockedUsers] = useState<Set<string>>(new Set());
  const totalPages = 24;

  const handleBlockToggle = (userId: string) => {
    setBlockedUsers(prev => {
      const newSet = new Set(prev);
      if (newSet.has(userId)) {
        newSet.delete(userId);
      } else {
        newSet.add(userId);
      }
      return newSet;
    });
  };

  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-lg border border-border bg-white">
        <table className="w-full">
          <thead className="border-b border-border bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700">
                Mobile
              </th>

              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700">
                Block
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {mockUsers.map(user => (
              <tr key={user.id} className="transition-colors hover:bg-gray-50">
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="size-10">
                      <AvatarImage
                        src={user.avatar || '/placeholder.svg'}
                        alt={user.name}
                      />
                      <AvatarFallback>
                        {user.name
                          .split(' ')
                          .map(n => n[0])
                          .join('')}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium text-gray-900">
                      {user.name}
                    </span>
                  </div>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-700">
                  {user.email}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-700">
                  {user.mobile}
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <ToggleButton
                    state={blockedUsers.has(user.id)}
                    clickHandler={() => handleBlockToggle(user.id)}
                  ></ToggleButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="size-4" />
        </Button>
        <Button
          variant={currentPage === 1 ? 'default' : 'outline'}
          size="sm"
          onClick={() => setCurrentPage(1)}
        >
          1
        </Button>
        <Button
          variant={currentPage === 2 ? 'default' : 'outline'}
          size="sm"
          onClick={() => setCurrentPage(2)}
        >
          2
        </Button>
        <span className="px-2 text-sm text-gray-600">...</span>
        <Button
          variant={currentPage === 23 ? 'default' : 'outline'}
          size="sm"
          onClick={() => setCurrentPage(23)}
        >
          23
        </Button>
        <Button
          variant={currentPage === 24 ? 'default' : 'outline'}
          size="sm"
          onClick={() => setCurrentPage(24)}
        >
          24
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
        >
          <ChevronRight className="size-4" />
        </Button>
      </div>
    </div>
  );
}
