import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import { Transition } from "@headlessui/react";

const add_device = ({ auth, oneGadget }) => {
    const { data, setData, errors, post, reset, processing, recentlySuccessful } = useForm({
        name: '',
        type: '',
    });

    const addDevice = (e) => {
        e.preventDefault();
        post(route("device.store"), {
            preserveScroll: true,
            onError: (errors) => {
                if (errors.name) {
                    reset('name');
                }
            },
        });
    };

    return (
        <AuthenticatedLayout
            user={auth}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Tambah perangkat
                </h2>
            }
        >
            <Head title="Tambah perangkat"></Head>
            <div className="py-12">

            <section className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
            <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                <section>
                    <form onSubmit={addDevice} className="mt-6 space-y-6">
                        <div>
                            <InputLabel
                                htmlFor="nama_perangkat"
                                value="Nama perangkat"
                            />

                            <TextInput required
                                id="nama_perangkat"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                type="text"
                                className="mt-1 block w-full"
                                autoComplete="off"
                            />

                            {/* <InputError message={errors.nama_perangkat} className="mt-2" /> */}
                        </div>

                        <div>
                            <InputLabel
                                htmlFor="deviceType"
                                value="Tipe Perangkat"
                            />

                            <select required
                                id="deviceType"
                                value={data.type}
                                onChange={(e) => setData('type', e.target.value)}
                                className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            >
                                <option value='ac' selected>Air Conditioner</option>
                                <option value='tv'>Television</option>
                                <option value='lamp'>Lamp</option>
                            </select>

                            {/* <InputError message={errors.type} className="mt-2" /> */}
                        </div>

                        <div className="flex items-center gap-4">
                            <PrimaryButton disabled={processing}>
                                Save
                            </PrimaryButton>

                            <Transition
                                show={recentlySuccessful}
                                enter="transition ease-in-out"
                                enterFrom="opacity-0"
                                leave="transition ease-in-out"
                                leaveTo="opacity-0"
                            >
                                <p className="text-sm text-gray-600">Saved.</p>
                            </Transition>
                        </div>
                    </form>
                </section>
            </div>
            </section>
            </div>


        </AuthenticatedLayout>
    );
};

export default add_device;
