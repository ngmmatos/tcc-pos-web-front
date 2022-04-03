export function getTimeSelectedProcedures(proceduresSelected) {
    let getTimeSelectedProcedures = [...proceduresSelected]
    if (getTimeSelectedProcedures.length > 1) {
      let timeSelectedProcedures = (getTimeSelectedProcedures.map(value => value.tempo_medio)).reduce((previousValue, currentValue) => previousValue + currentValue)
      return timeSelectedProcedures
    } else {
      return proceduresSelected[0].tempo_medio
    }
  }