import moment from 'moment';

export const submitFieldsAdapto = (formValues: any) => {
  const result = formValues;
  Object.keys(formValues).forEach((key) => {
    if (moment.isMoment(formValues[key])) {
      result[key] = moment(formValues[key]).format();
    }
    if (Array.isArray(formValues[key])) {
      result[key] = formValues[key].map((innerValue: any) => {
        if (moment.isMoment(innerValue)) {
          return moment(innerValue).format();
        }
        return innerValue;
      });
    }
  });
  return result;
};

export const submitFilesAdapto = (formValues: any) => {
  const result = formValues;
  Object.keys(formValues).forEach((key) => {
    if (moment.isMoment(formValues[key])) {
      result[key] = moment(formValues[key]).format();
    }
    if (Array.isArray(formValues[key])) {
      result[key] = formValues[key].map((innerValue: any) => {
        if (moment.isMoment(innerValue)) {
          return moment(innerValue).format();
        }
        return innerValue;
      });
    }
  });
  return result;
};
