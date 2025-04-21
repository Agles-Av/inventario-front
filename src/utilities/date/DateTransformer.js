function formatearFechaHora(fechaHoraISO, formato = 'es-MX') {
    const opcionesFecha = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const opcionesHora = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
    
    const fecha = new Date(fechaHoraISO);
    
    if (isNaN(fecha.getTime())) {
      return { error: 'Fecha inválida' };
    }
  
    return {
      fecha: fecha.toLocaleDateString(formato, opcionesFecha),  // Ej: "20/04/2025"
      hora: fecha.toLocaleTimeString(formato, opcionesHora),    // Ej: "22:13:46"
      fechaISO: fecha.toISOString().split('T')[0],             // Ej: "2025-04-20"
      horaSimple: fecha.toTimeString().substring(0, 8)         // Ej: "22:13:46"
    };
  }