export interface Epi {
    id: number;
    name: string;
    description: string;
    certification: string;
    supplier: string;
    expiration: string;
    quantity: number;
    userId?: string;
  }
  
  export interface Employee {
    id: number;
    name: string;
    admission: Date;
    phone: string;
    departament: string;
    function: string;
    employer: string;
    status: string;
    userId?: string;
  }
  
  export type EmployeeBasic = Pick<Employee, "id" | "name">;
  
  export interface EpiEntry {
    id: number;
    epiId: number;
    employeeId: number;
    quantity: number;
    date: string;
    userId?: string;
  }
  
  export interface EpiExit {
    id: number;
    epiId: number;
    epi: {
      name: string;
      certificationNumber: number;
    };
    employeeId: number;
    employee: {
      name: string;
    };
    quantity: number;
    date: string;
    userId?: string;
  }
  
  export interface MedicalExam {
    id: number;
    date: string;
    type: string;
    result: string;
    expiration: string;
    employeeId: number;
    employee: {
      name: string;
    };
    userId?: string;
  }
  