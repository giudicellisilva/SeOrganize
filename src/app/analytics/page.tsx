'use client';
import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import Task from "@/interfaces/Task";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import style from "./analytics.module.scss";
import { getAllTask } from "@/api/task/getAllTask";

const Analytics = () => {
  const [filter, setFilter] = useState<'today' | '7days' | '30days' | 'custom'>('7days');
  const [customDate, setCustomDate] = useState({ start: '', end: '' });

  const { data: tasksData } = useQuery({
    queryKey: ['tasks-analytics'],
    queryFn: async () => await getAllTask(),
  });

  const allTasks: Task[] = tasksData?.data || [];

  console.log('Tarefas para Análise:', allTasks);
  const filteredTasks = useMemo(() => {
    const now = new Date();
    return allTasks.filter(task => {
      const taskDate = new Date((task.date?.toString() || '') + 'T00:00:00');

      if (filter === 'today') {
        return taskDate.toLocaleDateString() === now.toLocaleDateString();
      }
      if (filter === '7days') {
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(now.getDate() - 7);
        return taskDate >= sevenDaysAgo;
      }
      if (filter === '30days') {
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(now.getDate() - 30);
        return taskDate >= thirtyDaysAgo;
      }
      if (filter === 'custom' && customDate.start && customDate.end) {
        return taskDate >= new Date(customDate.start) && taskDate <= new Date(customDate.end);
      }
      return true;
    });
  }, [allTasks, filter, customDate]);

  // Cálculos de Métricas
  const totalTasks = filteredTasks.length;
  const completedTasks = filteredTasks.filter(t => t.completed).length;
  const efficiency = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Dados para o Gráfico de Pizza (Distribuição)
  const dataPie = [
    { name: 'Estudo', value: filteredTasks.filter(t => t.type === 'STUDY').length },
    { name: 'Fitness', value: filteredTasks.filter(t => t.type === 'FITNESS').length },
    { name: 'Simples', value: filteredTasks.filter(t => t.type === 'SIMPLE').length },
    { name: 'Música', value: filteredTasks.filter(t => t.type === 'MUSIC').length },
    { name: 'Trabalho', value: filteredTasks.filter(t => t.type === 'WORK').length },
  ].filter(d => d.value > 0);

  // Dados para o Gráfico de Barras (Status por Categoria)
  const dataBar = ['STUDY', 'FITNESS', 'SIMPLE', 'MUSIC', 'WORK'].map(type => ({
    name: type,
    Concluído: filteredTasks.filter(t => t.type === type && t.completed).length,
    Pendente: filteredTasks.filter(t => t.type === type && !t.completed).length,
  })).filter(d => d.Concluído > 0 || d.Pendente > 0);

  const COLORS = ['#FF8C42', '#264653', '#2A9D8F', '#E9C46A', '#F4A261'];

  return (
    <div className={style.analytics}>
      <header className={style.analytics__header}>
        <div>
          <h1>Análise de Desempenho</h1>
          <p>Produtividade baseada em <strong>{totalTasks}</strong> tarefas filtradas.</p>
        </div>

        <div className={style.filterContainer}>
          <select value={filter} onChange={(e) => setFilter(e.target.value as any)}>
            <option value="today">Hoje</option>
            <option value="7days">Últimos 7 dias</option>
            <option value="30days">Últimos 30 dias</option>
            <option value="custom">Personalizado</option>
          </select>

          {filter === 'custom' && (
            <div className={style.customDates}>
              <input type="date" onChange={(e) => setCustomDate({ ...customDate, start: e.target.value })} />
              <input type="date" onChange={(e) => setCustomDate({ ...customDate, end: e.target.value })} />
            </div>
          )}
        </div>
      </header>

      <section className={style.analytics__stats}>
        <div className={style.statBox}>
          <span>Total de Tarefas</span>
          <strong>{totalTasks}</strong>
        </div>
        <div className={style.statBox}>
          <span>Concluídas</span>
          <strong style={{ color: '#2A9D8F' }}>{completedTasks}</strong>
        </div>
        <div className={style.statBox}>
          <span>Eficiência Real</span>
          <strong style={{ color: efficiency > 50 ? '#2A9D8F' : '#FF8C42' }}>{efficiency}%</strong>
        </div>
      </section>

      <div className={style.analytics__grid}>
        <div className={style.card}>
          <h3>Distribuição por Tipo</h3>
          <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie 
                  data={dataPie} 
                  innerRadius={60} 
                  outerRadius={80} 
                  paddingAngle={5} 
                  dataKey="value"
                  label={(props) => {
                    const { name, percent } = props;
                    if (!name || percent === undefined) return '';
                    return `${name} ${(percent * 100).toFixed(0)}%`;
                  }}
                >
                  {dataPie.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: any) => {
                    if (value === undefined || value === null) return ["0", "Quantidade"];
                    const numValue = Number(value);
                    return [`${numValue} tarefas`, "Quantidade"];
                  }}
                />
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ResponsiveContainer>
        </div>

        <div className={style.card}>
          <h3>Status por Categoria</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dataBar}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Concluído" fill="#2A9D8F" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Pendente" fill="#FF8C42" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Analytics;