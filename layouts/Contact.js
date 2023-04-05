import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { markdownify } from "@lib/utils/textConverter";
import { MDXRemote } from "next-mdx-remote";
import shortcodes from "./shortcodes/all";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { database } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { toast } from "react-toastify";

const dbInstance = collection(database, "contact");

const schema = yup
  .object({
    name: yup
      .string()
      .required("Preciso saber seu nome e sobrenome.")
      .matches(/(\w.+\s).+/i, "Não deixe de colocar seu sobrenome."),
    email: yup
      .string()
      .required("Precisa digitar seu email.")
      .matches(
        /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i,
        "Seu e-mail pode não estar digitado corretamente. Verifique novamente!"
      ),
    subject: yup.string().required("Precisa informar qual é o assunto."),
    message: yup.string().required("Está falatando deixar sua mensagem."),
  })
  .required();

const Contact = ({ data }) => {
  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const { frontmatter, mdxContent } = data;
  const { title } = frontmatter;

  const saveContact = async (dataContact) => {
    setIsLoading(true);

    addDoc(dbInstance, dataContact)
      .then((res) => {
        toast("Enviado com sucesso !", {
          hideProgressBar: true,
          autoClose: 2000,
          type: "success",
        });
        setIsLoading(false);
        router.push("/");
        console.log(res);
      })
      .catch((err) => {
        toast(err, {
          hideProgressBar: true,
          autoClose: 2000,
          type: "error",
        });
        setIsLoading(false);
      });
  };
  return (
    <section className="section pt-[72px]">
      <div className="container">
        <div className="row">
          <div className="mx-auto lg:col-8">
            <div className="content">
              {<MDXRemote {...mdxContent} components={shortcodes} />}
            </div>
            <div className="mt-12 pt-12">
              {markdownify(title, "h3", "h5 font-normal text-3xl")}
              <form
                className="contact-form mt-6"
                method="post"
                onSubmit={handleSubmit(saveContact)}
              >
                <div className="row mb-6">
                  <div className="md:col-6">
                    <label className="mb-2 block" htmlFor="name">
                      Nome
                    </label>
                    <input
                      className="form-input w-full"
                      name="name"
                      type="text"
                      placeholder="Deixe seu nome"
                      {...register("name")}
                    />
                    <p className="error">{errors.name?.message}</p>
                  </div>
                  <div className="mt-6 md:col-6 md:mt-0">
                    <label className="mb-2 block" htmlFor="email">
                      Email
                    </label>
                    <input
                      className="form-input w-full"
                      name="email"
                      placeholder="email@gmail.com"
                      {...register("email")}
                    />
                    <p className="error">{errors.email?.message}</p>
                  </div>
                </div>
                <div className="mb-6">
                  <label className="mb-2 block" htmlFor="subject">
                    Assunto
                  </label>
                  <input
                    className="form-input w-full"
                    name="subject"
                    type="text"
                    placeholder="Motivo do contato"
                    {...register("subject")}
                  />
                  <p className="error">{errors.subject?.message}</p>
                </div>
                <div className="mb-6">
                  <label className="mb-2 block" htmlFor="message">
                    Mensagem
                  </label>
                  <textarea
                    className="form-textarea w-full"
                    rows="6"
                    placeholder="Sua Mensagem"
                    {...register("message")}
                  />
                  <p className="error">{errors.message?.message}</p>
                </div>
                <button
                  className="btn btn-primary rounded text-sm"
                  type="submit"
                >
                  {isLoading ? "Enviando..." : "Enviar"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
