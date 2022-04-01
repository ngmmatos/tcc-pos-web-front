import { Layout } from '../../components/Layout';
import { CustomCalendar } from '../../components/Calendario';
import { useProcedures } from '../../hooks/useProcedures';
import { ImScissors } from 'react-icons/im';

const CalendarScheduler = () => {

   const { barberList, setBarberId } = useProcedures();

   return (
      <Layout title="Agenda">
         <div className='agendaContainer'>
            <div className='selectContainer'>
               <ImScissors />
               <div>
                  <label htmlFor="barberList">Barbeiro(a)</label>
                  <select onChange={({ target }) => setBarberId(target.value)} required>
                     <option value="">Selecione um barbeiro</option>
                     {barberList && barberList.map(barber =>
                        <option key={barber.id_barbeiro} value={barber.id_barbeiro}>{barber.Usuario.nome}</option>
                     )}
                  </select>
               </div>
            </div>
            <CustomCalendar />
         </div>
      </Layout>
   )
}

export { CalendarScheduler }