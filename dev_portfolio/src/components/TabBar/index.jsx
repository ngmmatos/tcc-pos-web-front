export const TabBar = ({ fieldsTab }) => {
  return (
    <>
      {fieldsTab.map((field) => {
        return (
          <button
            key={field.title}
            type='button'
            className={field.status === field.tab ? 'active' : ''}
            onClick={() => field.handleChangeTab(field.status)}
          >
            {' '}
            {field.title}
          </button>
        );
      })}
    </>
  );
};
