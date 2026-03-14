export default interface Task {
    id: string;
    title: string;
    description?: string;
    type: string; // Adicionei o enum baseado no seu JSON
    date?: string; // ISO string para controle no front
}