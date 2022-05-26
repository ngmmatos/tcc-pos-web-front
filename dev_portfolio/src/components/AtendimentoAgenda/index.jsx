import { useAuth } from '../../hooks/useAuth';
import { useEffect, useState } from 'react';

import { useAtendimento } from '../../hooks/useAtendimento';
import { CardAtendimento } from './../CardAtendimento/index';

export const AtendimentoAgenda = ({
  tabAgenda,
  filtroAtendimento,
  buscaAtendimento,
}) => {
  const { userSigned } = useAuth();
  const { barbeiro } = userSigned.roles.find((item) => item.barbeiro);

  const { atendimentos, getAtendimentoBarbeiro } = useAtendimento();
  useEffect(() => {
    getAtendimentoBarbeiro(barbeiro);
  }, [barbeiro]);
  return (
    <>
      {filtroAtendimento && filtroAtendimento.length > 0
        ? filtroAtendimento?.map((item) => (
            <CardAtendimento
              key={item.key}
              atendimento={item}
              refreshingAtendimento={getAtendimentoBarbeiro}
            />
          ))
        : buscaAtendimento && <p>Nenhum item encontrado</p>}

      {atendimentos &&
        !buscaAtendimento &&
        atendimentos.map((atendimento) => {
          return (
            { ...atendimento }.status === tabAgenda && (
              <CardAtendimento
                key={atendimento.idAtendimento}
                atendimento={atendimento}
                refreshingAtendimento={getAtendimentoBarbeiro}
              />
            )
          );
        })}
    </>
  );
};
