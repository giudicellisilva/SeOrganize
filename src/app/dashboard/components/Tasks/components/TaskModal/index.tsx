'use client';
import ITask from "@/interfaces/Task";
import style from "./taskModal.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

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
  const user = useSelector((state: RootState) => state.user);
  const isPro = user?.roles?.[0]?.name === "SUBSCRIBER";

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
              rows={2}
            />
          </div>

          <div className={style.dateTimeGroup}>
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
              <label className={style.contentLabel__label}>Horário</label>
              <input 
                type="time"
                className={style.taskModal__container__form__input}
                value={task.time}
                onChange={(e) => setTask({ ...task, time: e.target.value })}
              />
            </div>
          </div>

          <div className={style.contentLabel}>
            <label className={style.contentLabel__label}>Tipo de Atividade</label>
            <select 
              className={style.taskModal__container__form__input}
              value={task.type}
              onChange={(e) => setTask({ ...task, type: e.target.value as any })}
            >
              <option value="SIMPLE">Simples</option>
              <option value="MUSIC">Música (Free)</option>
              <option value="WORK">Trabalho (Free)</option>
              <option value="STUDY" disabled={!isPro}>Estudo {!isPro && "🔒"}</option>
              <option value="FITNESS" disabled={!isPro}>Fitness {!isPro && "🔒"}</option>
            </select>
          </div>

          {/* CAMPOS DINÂMICOS POR TIPO */}
          <div className={style.dynamicFields}>
            {task.type === "MUSIC" && (
              <div className={style.dateTimeGroup}>
                <div className={style.contentLabel}>
                  <label className={style.contentLabel__label}>Instrumento</label>
                  <input 
                    className={style.taskModal__container__form__input}
                    value={task.instrument || ""}
                    onChange={(e) => setTask({ ...task, instrument: e.target.value })}
                    placeholder="Ex: Violão"
                  />
                </div>
                <div className={style.contentLabel}>
                  <label className={style.contentLabel__label}>Link Partitura</label>
                  <input 
                    className={style.taskModal__container__form__input}
                    value={task.sheetMusicLink || ""}
                    onChange={(e) => setTask({ ...task, sheetMusicLink: e.target.value })}
                    placeholder="URL"
                  />
                </div>
              </div>
            )}

            {task.type === "FITNESS" && (
              <div className={style.dateTimeGroup}>
                <div className={style.contentLabel}>
                  <label className={style.contentLabel__label}>Repetições</label>
                  <input 
                    type="number"
                    className={style.taskModal__container__form__input}
                    value={task.repetitions || ""}
                    onChange={(e) => setTask({ ...task, repetitions: Number(e.target.value) })}
                  />
                </div>
                <div className={style.contentLabel}>
                  <label className={style.contentLabel__label}>Grupo Muscular</label>
                  <input 
                    className={style.taskModal__container__form__input}
                    value={task.muscleGroup || ""}
                    onChange={(e) => setTask({ ...task, muscleGroup: e.target.value })}
                    placeholder="Ex: Quadríceps"
                  />
                </div>
              </div>
            )}

            {task.type === "STUDY" && (
              <>
                <div className={style.contentLabel}>
                  <label className={style.contentLabel__label}>Matéria/Assunto</label>
                  <input 
                    className={style.taskModal__container__form__input}
                    value={task.subject || ""}
                    onChange={(e) => setTask({ ...task, subject: e.target.value })}
                  />
                </div>
                <div className={style.dateTimeGroup}>
                  <div className={style.contentLabel}>
                    <label className={style.contentLabel__label}>Duração (min)</label>
                    <input 
                      type="number"
                      className={style.taskModal__container__form__input}
                      value={task.durationMinutes || ""}
                      onChange={(e) => setTask({ ...task, durationMinutes: Number(e.target.value) })}
                    />
                  </div>
                  <div className={style.contentLabel}>
                    <label className={style.contentLabel__label}>Link Recurso</label>
                    <input 
                      className={style.taskModal__container__form__input}
                      value={task.resourceLink || ""}
                      onChange={(e) => setTask({ ...task, resourceLink: e.target.value })}
                    />
                  </div>
                </div>
              </>
            )}

            {task.type === "WORK" && (
              <div className={style.dateTimeGroup}>
                <div className={style.contentLabel}>
                  <label className={style.contentLabel__label}>Projeto</label>
                  <input 
                    className={style.taskModal__container__form__input}
                    value={task.project || ""}
                    onChange={(e) => setTask({ ...task, project: e.target.value })}
                  />
                </div>
                <div className={style.contentLabel}>
                  <label className={style.contentLabel__label}>Prioridade</label>
                  <select 
                    className={style.taskModal__container__form__input}
                    value={task.priority || "MEDIUM"}
                    onChange={(e) => setTask({ ...task, priority: e.target.value })}
                  >
                    <option value="LOW">Baixa</option>
                    <option value="MEDIUM">Média</option>
                    <option value="HIGH">Alta</option>
                  </select>
                </div>
                <div className={style.contentLabel}>
                  <label className={style.contentLabel__label}>Prazo Final</label>
                  <input 
                    type="datetime-local"
                    className={style.taskModal__container__form__input}
                    value={task.deadline}
                    onChange={(e) => setTask({ ...task, deadline: e.target.value })}
                  />
                </div>
              </div>
            )}
          </div>

          {!isPro && (task.type === "STUDY" || task.type === "FITNESS") && (
            <small className={style.proWarning}>Assine o plano PRO para salvar estas opções!</small>
          )}

          <button 
            className={style.taskModal__container__form__saveBtn} 
            onClick={() => editingId ? onEdit(task) : onSave(task)}
          >
            {editingId ? "Salvar Alterações" : "Criar Tarefa"}
          </button>
        </div>

        <button className={style.taskModal__container__close} onClick={onClose}>Fechar</button>
      </div>
    </div>
  );
};

export default TaskModal;