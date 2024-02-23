import { useState, Fragment } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import { FaTrash } from "react-icons/fa";
import DeleteDeviceDialog from "@/Components/DeleteDevice";
import UpdateDeviceDialog from "@/Components/UpdateDeviceDialog";

export default function Dashboard({ auth, gadget }) {
    let [isDeleteOpen, setIsDeleteOpen] = useState(false);
    let [isEditOpen, setisEditOpen] = useState(false);
    let [gadgetData, setGadgetData] = useState([]);

    function editGadget() {}

    const handleDelete = async (gadget) => {
        router.delete(
            route("device.destroy", { device: gadget.slug, type: gadget.type })
        );
        closeModal();
    };
    const handleEdit = (gadget) => {
        setGadgetData(gadget);
        openModal();
    };

    function closeModal() {
        setIsDeleteOpen(false);
    }

    function openModal() {
        setIsDeleteOpen(true);
    }
    function closeEditModal() {
        setisEditOpen(false);
    }

    function openEditModal() {
        setisEditOpen(true);
    }
    gadget = gadget.gadget;
    async function change(items) {
        router.post(route("perangkat_toggle"), {
            status: !items.status,
            slug: items.slug,
            type: items.type,
        });
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <UpdateDeviceDialog gadgetData={gadgetData} isOpen={isEditOpen}  onclick={() => handleEdit(gadgetData)} closeModal={closeEditModal}/>
            <DeleteDeviceDialog gadgetData={gadgetData} isOpen={isDeleteOpen}  onclick={() => handleDelete(gadgetData)} closeModal={closeModal}>
            </DeleteDeviceDialog>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 grid grid-cols-2 sm:grid-cols-6 md:grid-cols-3 gap-4 p-4">
                    {gadget.map((items) => (
                        <div
                            className="bg-white p-4 overflow-hidden shadow-sm sm:rounded-md gap-4 flex flex-col"
                        >
                            <div className="text-sm sm:text-xl">
                                <FaLamp/> {items.name}
                            </div>
                            <div className="flex gap-2">
                                <button
                                    id={items.id}
                                    onClick={() => change(items)}
                                    className={
                                        (items.status
                                            ? "bg-slate-900 text-slate-50"
                                            : "bg-blue-700 text-slate-50") +
                                        " w-full p-4   sm:rounded-md"
                                    }
                                >
                                    {items.status ? "Matikan" : "Hidupkan"}
                                </button>
                                <button
                                    id={items.id + "edit"}
                                    onClick={() => {
                                        setGadgetData(items);
                                        setIsDeleteOpen(true);
                                    }}
                                    className="bg-slate-950 text-white p-4 w-1/6 sm:rounded-md"
                                >
                                    <FaTrash />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
