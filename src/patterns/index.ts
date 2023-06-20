const Common = {
  Email: [/(\S+@\w+\.\w+)/],
};

const Brazil = {
  BankSlip: [
    /(\d{5})\.(\d{5})\s(\d{5})\.(\d{6})\s(\d{5})\.(\d{6})\s(\d)\s(\d{14})/, // Banking - Typeable line
    /(\d{12})\s(\d{12})\s(\d{12})\s(\d{12})/, // Tax revenues - Bar code
    /(\d{11})-(\d)\s(\d{11})-(\d)\s(\d{11})-(\d)\s(\d{11})-(\d)/, // Tax revenues - Typeable line
  ],
};

export const Patterns = {
  Common,
  Brazil,
};
