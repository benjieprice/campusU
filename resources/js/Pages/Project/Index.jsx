import _ from "lodash"
import Pagination  from "@/Components/Pagination"
import SelectInput from "@/Components/SelectInput"
import TextInput  from "@/Components/TextInput"
import Authenticated from "@/Layouts/AuthenticatedLayout"

import {
    STATUS_CLASS_MAP,
    STATUS_TEXT_MAP
} from "@/constants.jsx"
import { Head, Link, router } from "@inertiajs/react"
import TableHeading from "@/Components/TableHeading"

 const Index= ({ auth, projects, queryParams = null, success }) => {
    queryParams = queryParams || {};
    const searchFieldChanged = (name, val) => {
        if(val) {
            queryParams[name] = val
        } else {
            delete queryParams[name]
        }
        router.get(route("project.index"), queryParams);
    };

    const onKeyPress = _.debounce((name, value) => {
        searchFieldChanged(name, value);
    }, 1000);
    
    const toggleSortDirection = (sortField) => {
        if (sortField === queryParams.sort_field) {
            queryParams.sort_direction = queryParams.sort_direction === "asc" ? "desc" : "asc";
        } else {
            queryParams.sort_field = sortField;
            queryParams.sort_direction = "asc";
        }
    };
    
    const updateSort = (sortField) => {
        toggleSortDirection(sortField);
        router.get(route("project.index"), queryParams);
    };
    

    return (
        <Authenticated
          user={auth.user}
          header={
            <div className="flex justify-between items-center">
              <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                Proyectos
              </h2>
              <Link
                href={route("project.create")}
                className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600"
              >
                Nuevo
              </Link>
            </div>
          }
        >
          <Head title="Proyectos" />
    
          <div className="py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
              {success && (
                <div className="bg-emerald-500 py-2 px-4 text-white rounded mb-4">
                  {success}
                </div>
              )}
              <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                <div className="p-6 text-gray-900 dark:text-gray-100">
                  <div className="overflow-auto">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                        <tr className="text-nowrap">
                          <TableHeading
                            name="id"
                            sort_field={queryParams.sort_field}
                            sort_direction={queryParams.sort_direction}
                            updateSort={updateSort}
                          >
                            ID
                          </TableHeading>
                          <th className="px-3 py-3">Image</th>
                          <TableHeading
                            name="name"
                            sort_field={queryParams.sort_field}
                            sort_direction={queryParams.sort_direction}
                            updateSort={updateSort}
                          >
                            Nombre
                          </TableHeading>
    
                          <TableHeading
                            name="status"
                            sort_field={queryParams.sort_field}
                            sort_direction={queryParams.sort_direction}
                            updateSort={updateSort}
                          >
                            Estado
                          </TableHeading>
    
                          <TableHeading
                            name="created_at"
                            sort_field={queryParams.sort_field}
                            sort_direction={queryParams.sort_direction}
                            updateSort={updateSort}
                          >
                            Fecha de Creación
                          </TableHeading>
    
                          <TableHeading
                            name="due_date"
                            sort_field={queryParams.sort_field}
                            sort_direction={queryParams.sort_direction}
                            updateSort={updateSort}
                          >
                            Fecha límite
                          </TableHeading>
                          <th className="px-3 py-3">Creado por</th>
                          <th className="px-3 py-3 text-right">Acciones</th>
                        </tr>
                      </thead>
                      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                        <tr className="text-nowrap">
                          <th className="px-3 py-3"></th>
                          <th className="px-3 py-3"></th>
                          <th className="px-3 py-3">
                            <TextInput
                              className="w-full"
                              defaultValue={queryParams.name}
                              placeholder="Nombre del Proyecto"
                              onBlur={(e) =>
                                searchFieldChanged("name", e.target.value)
                              }
                              onKeyPress={(e) => onKeyPress("name", e)}
                            />
                          </th>
                          <th className="px-3 py-3">
                            <SelectInput
                              className="w-full"
                              defaultValue={queryParams.status}
                              onChange={(e) =>
                                searchFieldChanged("status", e.target.value)
                              }
                            >
                              <option value="">Seleccionar Estado</option>
                              <option value="pending">Pendiente</option>
                              <option value="in_progress">En Progreso</option>
                              <option value="completed">Entregado</option>
                            </SelectInput>
                          </th>
                          <th className="px-3 py-3"></th>
                          <th className="px-3 py-3"></th>
                          <th className="px-3 py-3"></th>
                          <th className="px-3 py-3"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {projects.data.map((project) => (
                          <tr
                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                            key={project.id}
                          >
                            <td className="px-3 py-2">{project.id}</td>
                            <td className="px-3 py-2">
                              <img src={project.image_path} style={{ width: 60 }} />
                            </td>
                            <th className="px-3 py-2 text-gray-100 text-nowrap hover:underline">
                              <Link href={route("project.show", project.id)}>
                                {project.name}
                              </Link>
                            </th>
                            <td className="px-3 py-2">
                              <span
                                className={
                                  "px-2 py-1 rounded text-white " +
                                  STATUS_CLASS_MAP[project.status]
                                }
                              >
                                {STATUS_TEXT_MAP[project.status]}
                              </span>
                            </td>
                            <td className="px-3 py-2 text-nowrap">
                              {project.created_at}
                            </td>
                            <td className="px-3 py-2 text-nowrap">
                              {project.due_date}
                            </td>
                            <td className="px-3 py-2">{project.createdBy.name}</td>
                            <td className="px-3 py-2 text-nowrap">
                              <Link
                                href={route("project.edit", project.id)}
                                className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
                              >
                                Edit
                              </Link>
                              <button
                                onClick={(e) => deleteProject(project)}
                                className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <Pagination links={projects.meta.links} />
                </div>
              </div>
            </div>
          </div>
        </Authenticated>
      );

}

export default Index;