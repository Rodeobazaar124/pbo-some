import React, { useState } from "react";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useForm } from "@inertiajs/react";
import { router } from "@inertiajs/react";

const UpdateDeviceDialog = ({ gadgetData, isOpen, closeModal }) => {
    const [sliderValue, setSliderValue] = useState(gadgetData.sliderValue);
    const { data, setData, patch } = useForm();
    const getSliderLabel = () => {
        // Logika untuk menentukan label slider berdasarkan gadgetData.type
        if (gadgetData.type === "tv") {
            return "Volume";
        } else if (gadgetData.type === "ac" || gadgetData.type === "lamps") {
            return "Temperature";
        } else {
            // Default jika tidak ada tipe yang cocok
            return "null";
        }
    };
    const limit = {
        min: {
            tv: 100,
            lamp: 6500,
            ac: 32,
        },
        max: {
            tv: 0,
            lamp: 2700,
            ac: 16,
        },
    };
    function updateDevice(event) {
        console.log(event);
        event.preventDefault();
        router.patch(route("device.update", gadgetData.id), {
            data
        });
    }
    const handleSliderChange = (event, newValue) => {
        setSliderValue(newValue);
    };
    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeModal}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/25" />
                </Transition.Child>

                <form
                    onSubmit={updateDevice}
                    className="fixed inset-0 overflow-y-auto"
                >
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-medium leading-6 text-gray-900"
                                >
                                    {gadgetData.name}
                                </Dialog.Title>
                                <div className="mt-2">
                                    <p className="text-sm text-gray-500">
                                        Kontrol Peragkat {gadgetData.name}
                                    </p>
                                </div>
                                <section
                                >
                                    <label htmlFor="name">
                                        Nama Perangkat
                                    </label>
                                    <input
                                    name="name"
                                        id="name"
                                        defaultValue={gadgetData.name}
                                    ></input>
                                    <label htmlFor="slider">
                                        {getSliderLabel()}
                                    </label>
                                    <input type="range"
                                    name={getSliderLabel().toLowerCase()}
                                    defaultValue={
                                            gadgetData[
                                                getSliderLabel().toLowerCase()
                                            ]
                                        }
                                        max={limit.max[gadgetData.type]}
                                        min={limit.min[gadgetData.type]}
                                    />
                                </section>
                                <label htmlFor="slider">
                                    {/* {sliderValue} */}
                                    {/* {limit[gadgetData.type]} */}
                                </label>
                                <div className="mt-4">
                                    <button
                                        type="submit"
                                        className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-blue-600 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                    >
                                        Update
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </form>
            </Dialog>
        </Transition>
    );
};

export default UpdateDeviceDialog;
