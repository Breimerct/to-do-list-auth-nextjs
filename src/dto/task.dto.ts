interface TaskDto {
    _id?: string;
    userId: string | UserDto;
    title: string;
    description: string;
    completed: string;
}
