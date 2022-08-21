const Common = {
  Email: ['(\\S+@\\w+\\.\\w+)'],
};

const Brazil = {
  BankSlip: [
    '([0-9]{5})\\.([0-9]{5})\\s([0-9]{5})\\.([0-9]{6})\\s([0-9]{5})\\.([0-9]{6})\\s([0-9])\\s([0-9]{14})', // Banking - Typeable line
    '([0-9]{12})\\s([0-9]{12})\\s([0-9]{12})\\s([0-9]{12})', // Tax revenues - Bar code
    '([0-9]{11})-([0-9])\\s([0-9]{11})-([0-9])\\s([0-9]{11})-([0-9])\\s([0-9]{11})-([0-9])', // Tax revenues - Typeable line
  ],
};

export const Patterns = {
  Common,
  Brazil,
};
