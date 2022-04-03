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
         finalArray.push({ data: dateNumber, agendado });
         return
      }

      const filterDatas = allSameDates.filter((item) => item.agendado === false).filter(item => item.minutos_disponiveis >= hoursNeeded)

      filterDatas.length > 0 ? agendado = false : agendado = true;

      finalArray.push({ data: dateNumber, agendado });
   });
   const finalArrayFiltered = finalArray.filter((item) => item.agendado === true);

   return { finalArray, finalArrayFiltered };
}

function catchDays(actualMonth, vectorCompare) {
   let finalArray = [];

   const daysArray = (Array.from(Array(actualMonth + 1).keys()))
   daysArray.shift()

   daysArray.forEach((data) => {
      const hasInArray = vectorCompare.find(element => element.data === data);
      if (hasInArray === undefined) {
         finalArray.push(data)
      }
   })

   return finalArray;
}

export { filterDaysAvaliable, catchDays }