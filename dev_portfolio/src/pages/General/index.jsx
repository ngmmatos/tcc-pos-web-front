import React, {useState} from 'react';
import { Layout } from '../../components/Layout';
import { ProcedureModal } from '../../components/Modals/ProcedureModal';

import { useAuth } from '../../hooks/useAuth';
import CustomCalendar from '../../components/Calendario';

export function General () {

    const { userSigned } = useAuth();

    const [ isProcedureModalOpen ,setIsProcedureModalOpen ] = useState(false);

    function handleOpenProcedureModal () {
        setIsProcedureModalOpen(true);
    }
    function handleCloseProcedureModal () {
        setIsProcedureModalOpen(false);
    }

    return(
        <Layout title="Menu">


            <CustomCalendar onClickDay={() => handleOpenProcedureModal}/>

        </Layout>
    );
}