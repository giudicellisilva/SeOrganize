'use client';
import ITask from "@/interfaces/Task";
import style from "./taskDetailModal.module.scss";

interface TaskDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: ITask | null;
}

const TaskDetailModal = ({ isOpen, onClose, task }: TaskDetailModalProps) => {
  if (!isOpen || !task) return null;
  console.log("TaskDetailModal renderizada com task:", task);
  return (
    <div className={style.taskModal}>
      <div className={style.taskModal__container}>
        <div className={style.detailHeader}>
          <span className={`${style.tag} ${style[`tag__${task.type.toLowerCase()}`]}`}>
            {task.type}
          </span>
          <span className={task.completed ? style.statusCompleted : style.statusPending}>
            {task.completed ? "✓ Concluída" : "○ Em aberto"}
          </span>
        </div>

        <h2 className={style.taskModal__container__title}>{task.title}</h2>

        <div className={style.detailContent}>
          <div className={style.detailRow}>
            <strong>📅 Data</strong>
            <span>{task.date ? new Date(task.date).toLocaleDateString('pt-BR', { timeZone: 'UTC' }) : "Hoje"}</span>
          </div>
          
          <div className={style.detailRow}>
            <strong>⏰ Horário</strong>
            <span>{task.time || "--:--"}</span>
          </div>

          {/* DETALHES ESPECÍFICOS POR TIPO */}
          <div className={style.specificDetails}>
            {task.type === "MUSIC" && (task.instrument || task.sheetMusicLink) && (
              <>
                <div className={style.detailRow}>
                  <strong>🎸 Instrumento</strong>
                  <span>{task.instrument}</span>
                </div>
                {task.sheetMusicLink && (
                  <div className={style.detailRow}>
                    <strong>🎼 Partitura</strong>
                    <a href={task.sheetMusicLink} target="_blank" rel="noreferrer">Acessar Link</a>
                  </div>
                )}
              </>
            )}

            {task.type === "FITNESS" && (task.muscleGroup || task.repetitions) && (
              <>
                <div className={style.detailRow}>
                  <strong>💪 Grupo Muscular</strong>
                  <span>{task.muscleGroup}</span>
                </div>
                <div className={style.detailRow}>
                  <strong>🔢 Repetições</strong>
                  <span>{task.repetitions}x</span>
                </div>
              </>
            )}

            {task.type === "STUDY" && (task.subject || task.durationMinutes) && (
              <>
                <div className={style.detailRow}>
                  <strong>📚 Matéria</strong>
                  <span>{task.subject}</span>
                </div>
                <div className={style.detailRow}>
                  <strong>⏳ Duração</strong>
                  <span>{task.durationMinutes} min</span>
                </div>
                {task.resourceLink && (
                  <div className={style.detailRow}>
                    <strong>🔗 Recurso</strong>
                    <a href={task.resourceLink} target="_blank" rel="noreferrer">Ver Material</a>
                  </div>
                )}
              </>
            )}

            {task.type === "WORK" && (task.project || task.priority) && (
              <>
                <div className={style.detailRow}>
                  <strong>📁 Projeto</strong>
                  <span>{task.project}</span>
                </div>
                <div className={style.detailRow}>
                  <strong>🚩 Prioridade</strong>
                  <span className={style[`priority__${task.priority?.toLowerCase()}`]}>
                    {task.priority === "HIGH" ? "Alta" : task.priority === "MEDIUM" ? "Média" : "Baixa"}
                  </span>
                </div>
                <div className={style.detailRow}>
                  <strong>📅 Prazo</strong>
                  <span>{task.deadline}</span>

                </div>
              </>
            )}
          </div>

          <div className={style.detailDescription}>
            <strong>Descrição</strong>
            <p>{task.description || "Nenhuma descrição detalhada."}</p>
          </div>
        </div>

        <button className={style.taskModal__container__close} onClick={onClose}>
          Fechar
        </button>
      </div>
    </div>
  );
};

export default TaskDetailModal;