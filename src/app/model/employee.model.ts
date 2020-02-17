export class EmployeeDto {
    id: number;
    name: string;
    isActive: boolean;
    departmentId: number;

    constructor(id: number, name: string, isActive: boolean, departmentId: number) {
        this.id = id;
        this.name = name;
        this.isActive = isActive;
        this.departmentId = departmentId;
    }
}
