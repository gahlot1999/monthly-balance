import { format } from 'date-fns';

export default function requestTime(req, res, next) {
  req.requestTime = format(new Date(), 'dd-MMM-yyyy hh:mm:ss a');
  next();
}
