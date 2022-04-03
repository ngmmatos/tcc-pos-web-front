import { Layout } from '../../components/Layout';
import { CustomCalendar } from '../../components/Calendario';
import { useProcedures } from '../../hooks/useProcedures';
import { ImScissors } from 'react-icons/im';
import './styles.scss';

const CalendarScheduler = () => {

   const { barberList, setBarberId, barberId } = useProcedures();

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
            {barberId === '' ?
            <div className='divAviso'>
               <p>Selecione um barbeiro para ver os dias disponíveis</p>
            </div> :
            <CustomCalendar />
                     }</div>
      </Layout>
   )
}

export { CalendarScheduler }