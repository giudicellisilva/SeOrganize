export default interface Task {
    id: string;
    title: string;
    description?: string;
    type: string;
    date?: string;
    completed: boolean;
    time?: string;

    instrument?: string;
    sheetMusicLink?: string;

    repetitions?: number;
    muscleGroup?: string;

    subject?: string;
    resourceLink?: string;
    durationMinutes?: number;

    project?: string;
    priority?: string;
    deadline?: string;
}