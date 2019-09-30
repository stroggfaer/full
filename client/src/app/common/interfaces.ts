export interface Department {
    name: string
    description: string
    id?: number
}

export interface Employee {
    department_id: number
    firstName: string
    lastName: string
    id?: number
}

export interface Message {
    message: string
}