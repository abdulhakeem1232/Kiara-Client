import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { adminendpoints } from '../../Service/endpoints/adminAxios';
import { adminAxios } from '../../Utils/Config';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
    const [dailyMetrics, setDailyMetrics] = useState([]);
    const [weeklyMetrics, setWeeklyMetrics] = useState([]);
    const [monthlyMetrics, setMonthlyMetrics] = useState([]);

    useEffect(() => {
        const fetchMetrics = async () => {
            try {
                const dailyData = await adminAxios.get(adminendpoints.dailyMetrics);
                const weeklyData = await adminAxios.get(adminendpoints.weeklyMetrics);
                const monthlyData = await adminAxios.get(adminendpoints.monthlyMetrics);

                setDailyMetrics(dailyData.data);
                setWeeklyMetrics(weeklyData.data);
                setMonthlyMetrics(monthlyData.data);
            } catch (error) {
                console.error('Error fetching metrics:', error);
            }
        };

        fetchMetrics();
    }, []);

    const formatMetricsForChart = (metrics) => {
        const labels = [];
        const successData = [];
        const failureData = [];

        metrics.forEach((metric) => {
            const label = metric.date || metric.week || metric.month; 
            if (!labels.includes(label)) {
                labels.push(label);
                successData.push(0);
                failureData.push(0);
            }

            const index = labels.indexOf(label);
            if (metric.status === 'success') {
                successData[index] += metric.count;
            } else if (metric.status === 'failure') {
                failureData[index] += metric.count;
            }
        });

        return {
            labels,
            datasets: [
                {
                    label: 'Success',
                    data: successData,
                    backgroundColor: 'green',
                },
                {
                    label: 'Failure',
                    data: failureData,
                    backgroundColor: 'red',
                },
            ],
        };
    };

    const handleExportPDF = () => {
        const doc = new jsPDF();
        doc.text('Metrics Report', 14, 16);

        doc.autoTable({
            head: [['Date', 'Success', 'Failure']],
            body: dailyMetrics.map((metric) => [
                metric.date,
                metric.status === 'success' ? metric.count : 0,
                metric.status === 'failure' ? metric.count : 0,
            ]),
            startY: 30,
        });

        doc.addPage();
        doc.text('Weekly Metrics', 14, 16);
        doc.autoTable({
            head: [['Week', 'Success', 'Failure']],
            body: weeklyMetrics.map((metric) => [
                metric.week,
                metric.status === 'success' ? metric.count : 0,
                metric.status === 'failure' ? metric.count : 0,
            ]),
            startY: 30,
        });

        doc.addPage();
        doc.text('Monthly Metrics', 14, 16);
        doc.autoTable({
            head: [['Month', 'Success', 'Failure']],
            body: monthlyMetrics.map((metric) => [
                metric.month,
                metric.status === 'success' ? metric.count : 0,
                metric.status === 'failure' ? metric.count : 0,
            ]),
            startY: 30,
        });

        doc.save('metrics-report.pdf');
    };

    return (
        <div className="dashboard">
            <h1 className="text-2xl font-bold mb-4">Metrics Dashboard</h1>

            <div className="mb-6">
                <h2 className="text-xl font-semibold">Daily Metrics</h2>
                <div style={{ width: '70%', height: '250px', margin: '0 auto' }}>
                    <Bar data={formatMetricsForChart(dailyMetrics)} />
                </div>
            </div>

            <div className="mb-6">
                <h2 className="text-xl font-semibold">Weekly Metrics</h2>
                <div style={{ width: '70%', height: '250px', margin: '0 auto' }}>
                    <Bar data={formatMetricsForChart(weeklyMetrics)} />
                </div>
            </div>

            <div className="mb-6">
                <h2 className="text-xl font-semibold">Monthly Metrics</h2>
                <div style={{ width: '70%', height: '250px', margin: '0 auto' }}>
                    <Bar data={formatMetricsForChart(monthlyMetrics)} />
                </div>
            </div>

            <button
                className="bg-blue-500 text-white p-2 rounded"
                onClick={handleExportPDF}
            >
                Export to PDF
            </button>
        </div>
    );
};

export default Dashboard;
