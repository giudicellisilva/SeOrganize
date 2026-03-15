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
  const [task, setTask] = useState<ITask>({ id: "", title: "", type: "SIMPLE", completed: false });

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
    setTask({ id: "", title: "", type: "SIMPLE", completed: false });
    setEditingId("");
    setIsModalOpen(false);
  };

  const handleEditSetup = (item: ITask) => {
    setEditingId(item.id);
    setTask({ ...item });
    setIsModalOpen(true);
  };

  const mutateToggleCheck = (item: ITask) => {
    const updatedTask = { ...item, completed: !item.completed };
  };

  return (
    <div className={style.task}>
      <div className={style.task__header}>
        <div className={style.task__header__calendar}>
          <input 
            type="date" 
            className={style.task__header__calendar__input}
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>
        <button className={style.task__addButton} onClick={() => setIsModalOpen(true)}>
          Adicionar Tarefa
        </button>
      </div>

      
      <div className={style.task__container}>
        <table className={style.taskTable}>
          <thead>
            <tr>
              <th></th>
              <th>Tarefa</th>
              <th>Categoria</th>
              <th>Horário</th>
              <th className={style.textCenter}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((item) => (
              <tr key={item.id} className={style.taskRow}>
                <td className={style.check}>
                  <input 
                    type="checkbox"
                  />
                </td>
                <td className={style.taskTitle}>
                  <strong>{item.title}</strong>
                </td>
                <td>
                  <span className={`${style.tag} ${style[`tag__${item.type.toLowerCase()}`]}`}>
                    {item.type}
                  </span>
                </td>
                <td className={style.taskTime}>
                  {/* Supondo que você tenha item.time ou item.date */}
                  {/* {item.time || "09:00"}  */}
                  9:35
                </td>
                <td>
                  <div className={style.taskActions}>
                    <button className={style.edit} onClick={() => handleEditSetup(item)}>
                      Editar
                    </button>
                    <button className={style.delete} onClick={() => mutateDelete(item.id)}>
                      Excluir
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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