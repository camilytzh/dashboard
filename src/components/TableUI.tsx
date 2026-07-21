import Box from '@mui/material/Box';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import Typography from '@mui/material/Typography';
import { type OpenMeteoResponse } from '../types/DashboardTypes';

const columns: GridColDef[] = [
   { field: 'id', headerName: 'ID', width: 90 },
   {
      field: 'time',
      headerName: 'Hora',
      width: 150,
   },
   {
      field: 'temperature',
      headerName: 'Temperatura (°C)',
      width: 150,
   },
   {
      field: 'humidity',
      headerName: 'Humedad (%)',
      width: 150,
   },
   {
      field: 'resumen',
      headerName: 'Resumen',
      description: 'No es posible ordenar u ocultar esta columna.',
      sortable: false,
      hideable: false,
      width: 150,
      valueGetter: (_, row) => `${row.temperature}°C / ${row.humidity}%`,
   },
];

interface TableUIProps {
   data?: OpenMeteoResponse;
}

export default function TableUI({ data }: TableUIProps) {

   // Manejo del estado de carga o error si los datos no han llegado
   if (!data) {
      return (
         <Box sx={{ height: 350, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Typography>Cargando datos de la tabla...</Typography>
         </Box>
      );
   }

   // Mapeo dinámico de los datos obtenidos de la API
   const rows = data.hourly.time.map((timeString, index) => ({
      id: index,
      time: timeString.split('T')[1], // Extraemos solo la hora
      temperature: data.hourly.temperature_2m[index],
      humidity: data.hourly.relative_humidity_2m[index]
   }));

   return (
      <Box sx={{ height: 350, width: '100%' }}>
         <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
               pagination: {
                  paginationModel: {
                     pageSize: 5,
                  },
               },
            }}
            pageSizeOptions={[5]}
            disableRowSelectionOnClick
         />
      </Box>
   );
}