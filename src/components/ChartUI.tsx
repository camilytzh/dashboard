import { LineChart } from '@mui/x-charts/LineChart';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { type OpenMeteoResponse } from '../types/DashboardTypes';

interface ChartUIProps {
   data?: OpenMeteoResponse;
}

export default function ChartUI({ data }: ChartUIProps) {
   
   // Manejo del tiempo de carga
   if (!data) {
      return (
         <Box sx={{ height: 300, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Typography>Cargando gráfico...</Typography>
         </Box>
      );
   }

   // Para que el gráfico sea legible, filtramos para mostrar solo las primeras 24 horas
   const HOURS_LIMIT = 24;
   const arrLabels = data.hourly.time.slice(0, HOURS_LIMIT).map(t => t.split('T')[1]); 
   const arrValues1 = data.hourly.temperature_2m.slice(0, HOURS_LIMIT);
   const arrValues2 = data.hourly.relative_humidity_2m.slice(0, HOURS_LIMIT);

   return (
      <>
         <Typography variant="h5" component="div">
            Temperatura vs Humedad (Próximas 24h)
         </Typography>
         <LineChart
            height={300}
            series={[
               { data: arrValues1, label: 'Temperatura (°C)'},
               { data: arrValues2, label: 'Humedad (%)'},
            ]}
            xAxis={[{ scaleType: 'point', data: arrLabels }]}
         />
      </>
   );
}