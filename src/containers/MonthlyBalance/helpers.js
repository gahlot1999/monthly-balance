import toast from 'react-hot-toast';
import { regex } from '../../utils/constants';

export function validateForm(formData) {
  let allFieldsEntered = true;
  Object.values(formData).forEach((value) => {
    if (value === '') {
      allFieldsEntered = false;
    }
  });
  if (!allFieldsEntered) toast.error('Enter all mandatory fields.');

  if (formData.monthYear) {
    if (!regex.monthYear.test(formData.monthYear)) {
      toast.error('Invalid format for Month. Expected: mmm-yyyy');
      return false;
    } else {
      const year = formData.monthYear.split('-')[1];
      const currentYear = new Date().getFullYear();
      if (year < currentYear) {
        toast.error('Invalid/old year.');
        return false;
      }
    }
  }

  return allFieldsEntered;
}
