'use client';
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import style from "./tasks.module.scss";
import ITask from "@/interfaces/Task";
import TaskModal from "./components/TaskModal";
import { getTask } from "@/api/task/getTask";
import { putTask } from "@/api/task/putTask";
import { deleteTask } from "@/api/task/deleteTask";
import { postTask } from "@/api/task/postTask";

const Task = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string>("");
  const [task, setTask] = useState<ITask>({ id: "", title: "", type: "SIMPLE" });

  const queryClient = useQueryClient();

  const { data: tasksData } = useQuery({
    queryKey: ['tasks', selectedDate],
    queryFn: async () => await getTask(selectedDate)
  });

  const tasks: ITask[] = tasksData?.data || [];

  const { mutate: mutateSave } = useMutation({
    mutationFn: async (task: ITask) => await postTask(task),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks', selectedDate] });
      resetForm();
    }
  });
  
  const { mutate: mutateEdit } = useMutation({
    mutationFn: async (task: ITask) => await putTask(task),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks', selectedDate] });
      resetForm();
    }
  });

  const { mutate: mutateDelete } = useMutation({
    mutationFn: async (id: string) => await deleteTask(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tasks', selectedDate] })
  });

  const resetForm = () => {
    setTask({ id: "", title: "", type: "SIMPLE" });
    setEditingId("");
    setIsModalOpen(false);
  };

  const handleEditSetup = (item: ITask) => {
    setEditingId(item.id);
    setTask({ ...item });
    setIsModalOpen(true);
  };

  return (
    <div className={style.task}>
      <div className={style.task__calendar}>
        <input 
          type="date" 
          className={style.task__calendar__input}
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </div>

      <div className={style.task__content}>
        {tasks.map((item) => (
          <div key={item.id} className={style.task__content__item}>
            <div className={style.task__content__item__info}>
              <strong>{item.title}</strong>
              <span>{item.type}</span>
            </div>
            <div className={style.task__content__item__actions}>
              <button className={style.edit} onClick={() => handleEditSetup(item)}>Editar</button>
              <button className={style.delete} onClick={() => mutateDelete(item.id)}>Excluir</button>
            </div>
          </div>
        ))}
      </div>

      <button className={style.task__addButton} onClick={() => setIsModalOpen(true)}>
        Nova Tarefa
      </button>

      <TaskModal 
        isOpen={isModalOpen}
        onClose={resetForm}
        task={task}
        setTask={setTask}
        editingId={editingId}
        onSave={mutateSave}
        onEdit={mutateEdit}
      />
    </div>
  );
};

export default Task;