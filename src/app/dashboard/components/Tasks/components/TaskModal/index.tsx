'use client';
import ITask from "@/interfaces/Task";
import style from "./taskModal.module.scss";

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: ITask;
  setTask: (task: ITask) => void;
  editingId: string;
  onSave: (task: ITask) => void;
  onEdit: (task: ITask) => void;
}

const TaskModal = ({ isOpen, onClose, task, setTask, editingId, onSave, onEdit }: TaskModalProps) => {
  if (!isOpen) return null;

  return (
    <div className={style.taskModal}>
      <div className={style.taskModal__container}>
        <h2 className={style.taskModal__container__title}>
          {editingId ? "Editar Tarefa" : "Nova Tarefa"}
        </h2>

        <div className={style.taskModal__container__form}>
          <div className={style.contentLabel}>
            <label className={style.contentLabel__label}>Título</label>
            <input 
              className={style.taskModal__container__form__input}
              value={task.title}
              onChange={(e) => setTask({ ...task, title: e.target.value })}
              placeholder="Ex: Treino de Perna"
            />
          </div>

          <div className={style.contentLabel}>
            <label className={style.contentLabel__label}>Descrição</label>
            <textarea 
              className={style.taskModal__container__form__input}
              value={task.description}
              onChange={(e) => setTask({ ...task, description: e.target.value })}
              placeholder="Detalhes da tarefa..."
              rows={3}
            />
          </div>

          <div className={style.contentLabel}>
            <label className={style.contentLabel__label}>Data</label>
            <input 
              type="date"
              className={style.taskModal__container__form__input}
              value={task.date}
              onChange={(e) => setTask({ ...task, date: e.target.value })}
            />
          </div>

          <div className={style.contentLabel}>
            <label className={style.contentLabel__label}>Tipo</label>
            <select 
              className={style.taskModal__container__form__input}
              value={task.type}
              onChange={(e) => setTask({ ...task, type: e.target.value as any })}
            >
              <option value="SIMPLE">Simples</option>
              <option value="MUSIC">Música</option>
              <option value="FITNESS">Fitness</option>
            </select>
          </div>

          <button className={style.taskModal__container__form__saveBtn} onClick={() => editingId ? onEdit(task) : onSave(task)}>
            {editingId ? "Salvar Alterações" : "Criar Tarefa"}
          </button>
        </div>

        <button className={style.taskModal__container__close} onClick={onClose}>
          Fechar
        </button>
      </div>
    </div>
  );
};

export default TaskModal;