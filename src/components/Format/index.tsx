import { Dispatch } from "react";
import { DataItem } from "../../interfaces";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema, FormData } from "./validador";
import { api } from "../../service/api";

interface ModalAddTaskProps {
  modal: () => void;
  setInfo: Dispatch<React.SetStateAction<DataItem[]>>;
}

export function Formulario({ setInfo, modal }: ModalAddTaskProps) {
  const { register, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const createUser = async (data: FormData) => {
    const response = await api.post<DataItem>("/users", data);

    setInfo((previusTasks) => [response.data, ...previusTasks]);
    modal();
  };

  return (
    <>
      <section>
        <form onSubmit={handleSubmit(createUser)}>
          <label htmlFor="name">Nome</label>
          <input type="text" id="name" {...register("name")} />

          <label htmlFor="text">E-mail</label>
          <input type="text" id="email" {...register("email")} />

          <label htmlFor="phone">Telefone</label>
          <input type="text" id="phone" {...register("phone")} />

          <button type="submit">Cadastrar</button>
        </form>
      </section>
    </>
  );
}
