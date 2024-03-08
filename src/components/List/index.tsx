import { useState, useEffect } from "react";
import { DataItem } from "../../interfaces";
import { api } from "../../service/api";
import { Formulario } from "../Format";

const List = () => {
  const [info, setInfo] = useState<DataItem[] | []>([]);
  const [loading, setLoading] = useState(true);
  const [isOpenModal, setIsOpenModal] = useState(false);

  useEffect(() => {
    (async () => {
      const response = await api.get<DataItem[]>("users");
      console.log(response);

      setInfo(response.data);
      setLoading(false);
    })();
  }, []);

  const modal = () => setIsOpenModal(!isOpenModal);

  return (
    <div>
      <h1>Lista de usuários</h1>
      <button type="button" onClick={modal}>
        Cadastrar novo usuários
      </button>
      <div>{isOpenModal && <Formulario setInfo={setInfo} modal={modal} />}</div>
      {loading ? (
        <p>Loading...</p>
      ) : info.length > 0 ? (
        <ul>
          {info.map((item) => (
            <li key={item.id}>
              <h2>{item.name}</h2>
              <h3>{item.email}</h3>
              <span>{item.phone}</span>
            </li>
          ))}
        </ul>
      ) : (
        <>
          <h3>Sem úsuarios</h3>
        </>
      )}
    </div>
  );
};

export default List;
