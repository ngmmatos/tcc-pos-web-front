function filterDaysAvaliable(valueVector, hoursNeeded) {
   let finalArray = [];
   let dates = valueVector.map((item) => {
      return item.data;
   });

   let uniqueDates = dates.filter((item, index) => {
      return dates.findIndex((dateItem) => dateItem === item) === index;
   });

   uniqueDates.forEach((dateNumber) => {
      let allSameDates = valueVector.filter((fItem) => fItem.data === dateNumber)
      let agendado = false;

      const verifyAllDays = allSameDates.every((item) => item.agendado === true)

      if (verifyAllDays) {
         agendado = true;
      }

      allSameDates.forEach((item) => {
         if (item.agendado === false && item.minutos_disponiveis < hoursNeeded) {
            agendado = true
         }
      });

      finalArray.push({ data: dateNumber, agendado });
   });
   return finalArray.filter(data => data.agendado === true);
}

export { filterDaysAvaliable }