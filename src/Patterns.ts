const Common = {
  Email: [/(\S+@\w+\.\w+)/g],
};

const Brazil = {
  BankSlip: [
    /([0-9]{5})\.([0-9]{5})\s([0-9]{5})\.([0-9]{6})\s([0-9]{5})\.([0-9]{6})\s([0-9])\s([0-9]{14})/g, // Banking - Typeable line
    /([0-9]{12})\s([0-9]{12})\s([0-9]{12})\s([0-9]{12})/g, // Tax revenues - Bar code
    /([0-9]{11})-([0-9])\s([0-9]{11})-([0-9])\s([0-9]{11})-([0-9])\s([0-9]{11})-([0-9])/g, // Tax revenues - Typeable line
  ],
};

export const Patterns = {
  Common,
  Brazil,
};
