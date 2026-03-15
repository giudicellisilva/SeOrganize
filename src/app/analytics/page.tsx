'use client';
import { useQuery } from "@tanstack/react-query";
import Task from "@/interfaces/Task";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import style from "./analytics.module.scss";
import { getTask } from "@/api/task/getTask"; // Usando sua API existente
import { getAllTask } from "@/api/task/getAllTask";

const Analytics = () => {
  const { data: tasksData } = useQuery({
    queryKey: ['tasks-analytics'],
    queryFn: async () => await getAllTask(),
  });

  const tasks = tasksData?.data || [];
  console.log("Tasks para análise:", tasks);
  const dataPie = [
    { name: 'Study', value: tasks.filter((t: Task) => t.type === 'STUDY').length },
    { name: 'Fitness', value: tasks.filter((t: Task) => t.type === 'FITNESS').length },
    { name: 'Simple', value: tasks.filter((t: Task) => t.type === 'SIMPLE').length },
    { name: 'Music', value: tasks.filter((t: Task) => t.type === 'MUSICA').length },
  ].filter(d => d.value > 0);
    const COLORS = ['#FF8C42', '#264653', '#2A9D8F', '#E9C46A'];

  return (
    <div className={style.analytics}>
      <header className={style.analytics__header}>
        <h1>Análise de Desempenho</h1>
        <p>Acompanhe sua produtividade em tempo real.</p>
      </header>

      <div className={style.analytics__grid}>
        {/* Card 1: Distribuição por Categoria */}
        <div className={style.card}>
          <h3>Distribuição por Categoria</h3>
          <div className={style.chartContainer}>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={dataPie} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  {dataPie.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Card 2: Status das Atividades */}
        <div className={style.card}>
          <h3>Conclusão de Atividades</h3>
          <div className={style.chartContainer}>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dataPie}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#FF8C42" radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <section className={style.analytics__stats}>
        <div className={style.statBox}>
          <span>Total de Tarefas</span>
          <strong>{tasks.length}</strong>
        </div>
        <div className={style.statBox}>
          <span>Eficiência</span>
          <strong>85%</strong>
        </div>
      </section>
    </div>
  );
};

export default Analytics;