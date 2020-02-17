export class EmployeeViewDto {
    id: number;
    name: string;
    isActive: boolean;
    departmentName: string;

    constructor(id: number, name: string, isActive: boolean, departmentName: string) {
        this.id = id;
        this.name = name;
        this.isActive = isActive;
        this.departmentName = departmentName;
    }
}
