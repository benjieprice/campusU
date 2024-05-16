import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

const Create = ({ auth }) => {
  const { data, setData, post, errors } = useForm({
    image: "",
    name: "",
    status: "",
    description: "",
    due_date: "",
  });

  const onSubmit = (e) => {
    e.preventDefault();
    post(route("project.store"), data); 
  };

  return (
    <Authenticated user={auth.user} pageTitle="Create new Project">
      <Head title="Projects" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <form
              onSubmit={onSubmit}
              className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg"
            >
              <InputLabel htmlFor="project_image" value="Icono del Proyecto" />
              <TextInput
                id="project_image"
                type="file"
                name="image"
                className="mt-1 block w-full"
                onChange={(e) => setData("image", e.target.files[0])}
              />
              <InputError message={errors.image} className="mt-2" />

              <InputLabel htmlFor="project_name" value="Nombre del Proyecto" />
              <TextInput
                id="project_name"
                type="text"
                name="name"
                value={data.name}
                className="mt-1 block w-full"
                isFocused={true}
                onChange={(e) => setData("name", e.target.value)}
              />
              <InputError message={errors.name} className="mt-2" />

              <InputLabel
                htmlFor="project_description"
                value="Descripción"
              />
              <TextAreaInput
                id="project_description"
                name="description"
                value={data.description}
                className="mt-1 block w-full"
                onChange={(e) => setData("description", e.target.value)}
              />
              <InputError message={errors.description} className="mt-2" />

              <InputLabel
                htmlFor="project_due_date"
                value="Fecha de Finalización del Proyecto"
              />
              <TextInput
                id="project_due_date"
                type="date"
                name="due_date"
                value={data.due_date}
                className="mt-1 block w-full"
                onChange={(e) => setData("due_date", e.target.value)}
              />
              <InputError message={errors.due_date} className="mt-2" />

              <InputLabel htmlFor="project_status" value="Estado" />
              <SelectInput
                name="status"
                id="project_status"
                className="mt-1 block w-full"
                onChange={(e) => setData("status", e.target.value)}
              >
                <option value="">Seleccionar estado</option>
                <option value="pending">Pendiente</option>
                <option value="in_progress">En Progreso</option>
                <option value="completed">Terminado</option>
              </SelectInput>
              <InputError message={errors.status} className="mt-2" />

              <div className="mt-4 text-right">
                <Link
                  href={route("project.index")}
                  className="bg-gray-100 py-1 px-3 text-gray-800 rounded shadow transition-all hover:bg-gray-200 mr-2"
                >
                  Cancelar
                </Link>
                <button className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600">
                  Crear
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Authenticated>
  );
}
export default Create;
