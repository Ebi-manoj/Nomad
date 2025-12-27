import { useState, useEffect } from 'react';
import { useDebounce } from 'use-debounce';

interface IFSCDetails {
  bank: string;
  branch: string;
  address: string;
  city: string;
  district: string;
  state: string;
  bankCode: string;
  ifsc: string;
}

interface UseIFSCVerificationReturn {
  bankDetails: IFSCDetails | null;
  isVerifying: boolean;
  error: string | null;
}

export const useIFSCVerification = (
  ifscCode: string
): UseIFSCVerificationReturn => {
  const [bankDetails, setBankDetails] = useState<IFSCDetails | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [debouncedIFSC] = useDebounce(ifscCode, 500);

  useEffect(() => {
    const verifyIFSC = async () => {
      // Reset states
      setBankDetails(null);
      setError(null);

      // Validate IFSC format first
      const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;
      if (!debouncedIFSC || debouncedIFSC.length !== 11) {
        return;
      }

      if (!ifscRegex.test(debouncedIFSC)) {
        setError('Invalid IFSC code format');
        return;
      }

      setIsVerifying(true);

      try {
        const response = await fetch(
          `https://ifsc.razorpay.com/${debouncedIFSC}`
        );

        if (!response.ok) {
          throw new Error('Invalid IFSC code');
        }

        const data = await response.json();

        setBankDetails({
          bank: data.BANK,
          branch: data.BRANCH,
          address: data.ADDRESS,
          city: data.CITY,
          district: data.DISTRICT,
          state: data.STATE,
          bankCode: data.BANKCODE,
          ifsc: data.IFSC,
        });
      } catch (err) {
        setError('Invalid IFSC code or unable to verify');
        setBankDetails(null);
      } finally {
        setIsVerifying(false);
      }
    };

    verifyIFSC();
  }, [debouncedIFSC]);

  return { bankDetails, isVerifying, error };
};
