import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  AlertCircle,
  UserPlus,
  Shield,
  Pencil,
  ShieldAlert,
} from 'lucide-react';
import ContactCard from './ContactCard';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
  sosContactFormSchema,
  type SosContactFormData,
} from '@/validation/sos';
import type { RootState } from '@/store/store';
import {
  fetchSosContacts,
  addSosContact,
  editSosContact,
  deleteSosContact,
} from '@/store/features/user/sos/sos.thunk';
import type { AppDispatch } from '@/store/store';
import { toast } from 'sonner';
import type { SosContactDTO } from '@/types/sos';
import { GenericModal } from '@/components/GenericModel';

export const SosManagementPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { contacts, loading } = useSelector((state: RootState) => state.sos);
  const [open, setOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [editContact, setEditContact] = useState<SosContactDTO | null>(null);
  const [deletingContact, setDeletingContact] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SosContactFormData>({
    resolver: zodResolver(sosContactFormSchema),
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      relation: '',
    },
  });

  useEffect(() => {
    dispatch(fetchSosContacts());
  }, [dispatch]);

  useEffect(() => {
    if (editContact) {
      reset({
        name: editContact.name,
        email: editContact.email,
        relation: editContact.relation,
        phone: editContact.phone,
      });
    } else {
      reset({
        name: '',
        email: '',
        relation: '',
        phone: '',
      });
    }
  }, [open, editContact, reset]);

  const onSubmit = async (data: SosContactFormData) => {
    const dto = {
      name: data.name.trim(),
      phone: data.phone.trim(),
      email: data.email?.trim() || undefined,
      relation: data.relation?.trim() || undefined,
    };
    if (!editContact) {
      await dispatch(addSosContact(dto));
      toast.success('SOS contact added');
    } else {
      await dispatch(
        editSosContact({ id: editContact.id, contact: dto })
      ).unwrap();
      toast.success('Contact edited successfully');
    }
    reset();
    setOpen(false);
    setEditContact(null);
  };

  const handleEdit = (contact: SosContactDTO) => {
    setEditContact(contact);
    setOpen(true);
  };
  const handleAddClick = () => {
    setEditContact(null);
    setOpen(true);
  };
  const handleDelete = (id: string) => {
    setDeletingContact(id);
    setConfirmOpen(true);
  };
  const handleDeleteConfirmation = async () => {
    if (!deletingContact) return;
    await dispatch(deleteSosContact(deletingContact)).unwrap();
    toast.success('Contact deleted successfully');
    setConfirmOpen(false);
  };

  const emergencyContacts = contacts.map(c => ({
    id: c.id,
    name: c.name,
    phone: c.phone,
    email: c.email,
    relation: c.relation || 'Emergency Contact',
  }));

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
          {contacts.length < 3 && (
            <Button
              className="gap-2 cursor-pointer"
              disabled={contacts.length >= 3}
              onClick={handleAddClick}
            >
              <UserPlus className="h-5 w-5" />
              Add Contact
            </Button>
          )}
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
            Emergency Contacts ({emergencyContacts.length}/3)
          </h2>
          {loading && emergencyContacts.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center">
              Loading contacts...
            </p>
          ) : emergencyContacts.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center">
              No SOS contacts added yet. Click "Add Contact" to create one.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {emergencyContacts.map(contact => (
                <ContactCard
                  key={contact.id}
                  {...contact}
                  handleEdit={() => handleEdit(contact)}
                  handleDelete={() => handleDelete(contact.id)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Add Contact Modal */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <DialogHeader>
              {!editContact && <DialogTitle>Add SOS contact</DialogTitle>}
              {editContact && (
                <DialogTitle className="flex gap-1 items-center">
                  <Pencil size={20} />
                  Edit SOS contact
                </DialogTitle>
              )}
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-2">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Name
                </label>
                <Input
                  type="text"
                  {...register('name')}
                  placeholder="Contact name"
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Phone
                </label>
                <Input
                  type="tel"
                  {...register('phone')}
                  placeholder="Contact phone"
                />
                {errors.phone && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Email
                </label>
                <Input
                  type="email"
                  {...register('email')}
                  placeholder="Contact email"
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Relation (optional)
                </label>
                <Input
                  type="text"
                  {...register('relation')}
                  placeholder="e.g. Mother, Friend"
                />
                {errors.relation && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.relation.message}
                  </p>
                )}
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  className="cursor-pointer"
                  onClick={() => {
                    setOpen(false);
                    reset();
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="cursor-pointer"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Saving...' : 'Save contact'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </main>
      <GenericModal
        isOpen={confirmOpen}
        onClose={() => {
          if (loading) return;
          setConfirmOpen(false);
          setDeletingContact(null);
        }}
        title="Delete Selected Contact"
        titleIcon={<ShieldAlert size={20} />}
        subtitle="Are you sure you want to delete this contact "
        primaryAction={{
          label: 'Confirm',
          className: 'bg-red-600 hover:bg-red-700',
          onClick: handleDeleteConfirmation,
          loading,
        }}
        secondaryAction={{
          label: 'Cancel',
          onClick: () => {
            if (loading) return;
            setConfirmOpen(false);
            setDeletingContact(null);
          },
        }}
      ></GenericModal>
    </div>
  );
};
