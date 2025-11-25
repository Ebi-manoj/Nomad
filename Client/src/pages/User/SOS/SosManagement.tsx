import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, UserPlus, Shield } from 'lucide-react';
import ContactCard from './ContactCard';

export const SosManagementPage = () => {
  // Sample contacts data
  const emergencyContacts = [
    {
      name: 'John Doe',
      phone: '+1 (555) 123-4567',
      email: 'john.doe@email.com',
      relationship: 'Emergency Contact',
    },
    {
      name: 'Jane Smith',
      phone: '+1 (555) 987-6543',
      email: 'jane.smith@email.com',
      relationship: 'Family Member',
    },
    {
      name: 'Dr. Michael Brown',
      phone: '+1 (555) 246-8135',
      email: 'dr.brown@hospital.com',
      relationship: 'Primary Physician',
    },
    {
      name: 'Sarah Johnson',
      phone: '+1 (555) 369-2580',
      relationship: 'Neighbor',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Shield className="h-10 w-10 text-foreground" />
            <div>
              <h1 className="text-4xl font-bold text-foreground">
                SOS Management
              </h1>
              <p className="text-muted-foreground mt-1">
                Manage your emergency contacts
              </p>
            </div>
          </div>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 cursor-pointer">
            <UserPlus className="h-5 w-5" />
            Add Contact
          </Button>
        </div>

        {/* Important Note */}
        <Alert className="mb-8 border-2 border-red-500 bg-red-500/5">
          <AlertCircle className="h-5 w-5 text-emergency" />
          <AlertTitle className="text-foreground font-semibold">
            Important SOS Information
          </AlertTitle>
          <AlertDescription className="text-foreground/80">
            In case of an emergency, click the SOS button on the booking page
            while you’re on a ride. Your emergency contacts will be notified
            immediately along with your live location. Make sure your SOS
            contact list is always updated and verified.
          </AlertDescription>
        </Alert>

        {/* Contacts Grid */}
        <div>
          <h2 className="text-2xl font-semibold text-foreground mb-6">
            Emergency Contacts ({emergencyContacts.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {emergencyContacts.map((contact, index) => (
              <ContactCard key={index} {...contact} />
            ))}
          </div>
        </div>

        {/* Empty State (hidden when contacts exist) */}
        {emergencyContacts.length === 0 && (
          <div className="text-center py-16">
            <Shield className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No Emergency Contacts Yet
            </h3>
            <p className="text-muted-foreground mb-6">
              Add your first emergency contact to get started
            </p>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2">
              <UserPlus className="h-5 w-5" />
              Add Your First Contact
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};
