export const NAVIGATION = [
  { name: 'Dashboard', route: '/dashboard' ,icon: 'fas fa-tachometer-alt'},
  {
    name: 'Masters',icon:'fas fas fa-cogs',
    children: [
      { name: 'Countries', route: '/masters/countries', icon: 'far fa-circle'},
      { name: 'States', route: '/masters/states', icon: 'far fa-circle' },
      { name: 'Cities', route: '/masters/city', icon: 'far fa-circle' },
      { name: 'Services', route: '/masters/service', icon: 'far fa-circle' },
      { name: 'Customer Groups', route: '/masters/customergroups', icon: 'far fa-circle' },
      { name: 'Supplier Groups', route: '/masters/suppliergroups', icon: 'far fa-circle' },
      { name: 'Regions', route: '/masters/regions', icon: 'far fa-circle' },
      { name: 'Locations', route: '/masters/locations', icon: 'far fa-circle' },
      { name: 'Warehouses', route: '/masters/warehouses', icon: 'far fa-circle' },
      { name: 'Deductions', route: '/masters/deductions', icon: 'far fa-circle' },
      { name: 'Incomes', route: '/masters/incomes' , icon: 'far fa-circle'},
    ]
  },
  { 
    name: 'Meeting',icon:'fas fa-users',
    children: [
      { name: 'Meetings', route: '/meeting/meetings' , icon: 'far fa-circle'}
    ]
  },
  {
    name: 'Business Partners',icon:'fas fas fa-user-tie',
    children: [
      { name: 'Customers', route: '/bp/customer', icon: 'far fa-circle' },
      { name: 'Suppliers', route: '/bp/supplier' , icon: 'far fa-circle'}
    ]
  },
  {
    name: 'Sales',icon:'fas fa-hand-holding-usd',
    children: [
      { name: 'Sales', route: '/sales/sales',icon:'fas fa-hand-holding-usd ' },
      // { name: 'Sales Quotation', route: '/sales/salesquotation' }
    ]
  },
   {
    name: 'Purchasing',icon:'fas fa-shopping-cart',
    children: [
      { name: 'Purchases', route: '/purchases/list',icon:'fas fa-shopping-cart ' },
      { name: 'Purchases', route: '/purchases/requisition',icon:'fas fa-shopping-cart ' },
    ]
  },
  {
    name: 'Financial',icon:'fas fa-file-invoice-dollar',
    children: [
      { name: 'Chart Of Accounts', route: '/financial/coa' , icon: 'far fa-circle'},
      { name: 'Opening Balance', route: '/financial/openingbalance' , icon: 'far fa-circle'},
      { name: 'Debit Voucher', route: '/financial/debitvoucher', icon: 'far fa-circle' },
      { name: 'Credit Voucher', route: '/financial/creditvoucher' , icon: 'far fa-circle'},
      { name: 'Contra Voucher', route: '/financial/contravoucher', icon: 'far fa-circle' },
      { name: 'Journal Voucher', route: '/financial/journalvoucher', icon: 'far fa-circle' },
    ]
  },
  {
    name: 'Inventory',icon:'fas fa-file-invoice-dollar',
    children: [
        { name: 'Products', route: '/masters/incomes' , icon: 'far fa-circle'},
    ]
  },
];
