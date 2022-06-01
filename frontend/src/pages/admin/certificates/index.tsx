/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';

import UnderLine from '@assets/UnderLine.svg';

import CircleOutline from '@assets/dashboard/icons/CircleOutline.svg';
import { baseUrl } from '@utils/helpers';

import { ReactSVG } from 'react-svg';
import Button from '@components/home/Button';
import { Dialog, CircularProgress, ButtonGroup } from '@material-ui/core';

import FaveDialog from '@components/FaveDIalog/FaveDialog';
import Input from '@components/home/Input';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const CertificatesBoard = () => {
    const [newCert, setNewCert] = useState('');
    const [certs, setCerts] = useState([]);
    const [deleteID, setdeleteID] = React.useState<any>({});
    const [selectedItem, setSelectedItem] = React.useState<any>({});
    const [editCert, setEditCert] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const [addCertModal, setAddCertModal] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem('token');

    const getCerts = async () => {
        const certTypesEndpoint = `${baseUrl}/v1/certificate/types`;
        try {
            let res = await fetch(certTypesEndpoint, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            let item = await res.json();
            setCerts(item);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    }

    const deleteCert = async (id) => {
        setLoading(true);
        const deleteEnd = `${baseUrl}/v1/certificate_type/delete/${id}`;

        try {
            let res = await fetch(deleteEnd, {
                method: 'DELETE',
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            let item = await res.json();
            // setRoles(item);
            getCerts();
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };
    const createCert = async () => {
        const createEndPoint = `${baseUrl}/v1/certificate/type/create`;

        axios
            .post(
                createEndPoint,
                { name: newCert},
                {
                    headers: {
                        Accept: 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then((res) => {
                toast.success('Certificate type created successfully');
                setAddCertModal(false);
                setLoading(true);
                getCerts();
            })
            .catch((error) => {
                console.error(error);
                toast.error('Please try again');
            });
    };
    const updateCert = async (id) => {
        setLoading(true);
        if (editCert === '') {
            return toast.error('Please enter a certificate name');
        }
        const updateEndpoint = `${baseUrl}/v1/certificate/type/update/${id}`;
        await axios
            .patch(
                updateEndpoint,
                { name: editCert, id: id },
                {
                    headers: {
                        Accept: 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then((res) => {
                setLoading(false);
                setSelectedItem('');
                res.status === 201 && toast.success('Certificate type updated successfully');
                getCerts();
            })
            .catch((error) => {
                setLoading(false);
                setSelectedItem('');
                toast.error(error);
                console.error('error', error);
            });
    };
    useEffect(() => {
        setLoading(true);

        getCerts();
    }, []);
    return (
        <div className="h-full w-full flex flex-col lg:px-10 sm:px-3 ">
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <div className="w-full flex flex-row mb-5 pt-8 items-center justify-end ">
                <button
                    className="bg-statusBlue flex items-center space-x-2 px-2 py-4 rounded-md"
                    onClick={() => {
                        setAddCertModal(true);
                    }}
                >
                    <ReactSVG src={CircleOutline} />
                    <p className="text-white"> Add New Certificate Type</p>
                </button>
            </div>

            <div className="grid lg:grid-cols-3 sm:grid-cols-1  lg:gap-10 lg:px-2 sm:px-2 pt-5">
                {loading === true ? (
                    <div className="flex items-center justify-center   col-span-3">
                        <CircularProgress style={{ color: '#0C77F8' }} />
                    </div>
                ) : (
                    certs.length > 0 &&
                    certs?.map((item) => (
                        <div
                            key={item.id}
                            className="flex flex-col h-28 justify-between px-5 py-2  border border-gray-200 rounded-lg"
                        >
                            <div className="pb-5">
                                {selectedItem.name === item.name ? (
                                    <div style={{ width: '50%' }}>
                                        <input
                                            className="text-black text-lg font-bold"
                                            autoFocus={selectedItem.name === item.name ? true : false}
                                            value={editCert}
                                            disabled={selectedItem.name === item.name ? false : true}
                                            onChange={(e) => {
                                                setEditCert(e.target.value);
                                            }}
                                        />
                                    </div>
                                ) : (
                                    <p className="text-black text-lg font-bold whitespace-nowrap">
                                        {item.name}
                                    </p>
                                )}
                            </div>

                            <div className="flex flex-row-reverse items-end">
                                <div className="flex  gap-5">
                                    {selectedItem.name === item.name ? (
                                        <button
                                            className="text-xs underline text-appBlue font-semibold"
                                            onClick={() => {
                                                setSelectedItem(item);
                                                setEditCert('');
                                                updateCert(selectedItem.id);
                                            }}
                                        >
                                            Save
                                        </button>
                                    ) : (
                                        <button
                                            className="text-xs underline text-appBlue font-semibold"
                                            onClick={() => {
                                                setSelectedItem(item);
                                                setEditCert(item.name);
                                            }}
                                        >
                                            Edit
                                        </button>
                                    )}
                                    {/*{selectedItem.name === item.name ? (*/}
                                    {/*    <button*/}
                                    {/*        className="text-xs underline text-appBlue font-semibold"*/}
                                    {/*        onClick={() => {*/}
                                    {/*            setSelectedItem('');*/}
                                    {/*        }}*/}
                                    {/*    >*/}
                                    {/*        Cancel*/}
                                    {/*    </button>*/}
                                    {/*) : (*/}
                                    {/*    <button*/}
                                    {/*        className="text-xs underline text-appBlue font-semibold"*/}
                                    {/*        onClick={() => {*/}
                                    {/*            setdeleteID(item);*/}
                                    {/*            setOpen(true);*/}
                                    {/*        }}*/}
                                    {/*    >*/}
                                    {/*        Delete*/}
                                    {/*    </button>*/}
                                    {/*)}*/}
                                </div>
                            </div>
                        </div>
                    ))
                )}

                <FaveDialog open={open} handleClose={handleClose}>
                    <div className="lg:p-10 sm:p-3">
                        <p className="lg:text-2xl sm:text-lg text-black font-extrabold text-center">
                            Are you sure you want to <br /> delete {deleteID.name}
                        </p>
                        <div className="w-1/5 flex justify-center items-center">
                            <ReactSVG src={UnderLine} className="w-1/5" />
                        </div>
                    </div>
                    <div className="flex items-center justify-center p-10  ">
                        <button
                            className="hover:bg-statusBlue  hover:text-white  px-14 py-4  rounded-md"
                            onClick={() => setOpen(false)}
                        >
                            Cancel
                        </button>
                        <button
                            className="bg-statusBlue rounded-md text-white  px-14 py-4 "
                            onClick={() => {
                                deleteCert(deleteID.id);
                                setOpen(false);
                                getCerts();
                            }}
                        >
                            Delete
                        </button>
                    </div>
                </FaveDialog>

                <Dialog
                    scroll="body"
                    open={addCertModal}
                    PaperProps={{
                        style: {
                            borderRadius: 20,
                            padding: 10,
                            width: '100%',
                            overflowX: 'auto',
                        },
                    }}
                    maxWidth="sm"
                    fullWidth={true}
                >
                    <div className="p-10 px-5 flex flex-col space-y-8">
                        <div>
                            <p className="sm:text-lg text-2xl text-black font-extrabold ">
                                Add New Certificate Type
                            </p>
                            <div className="w-1/5 flex  items-center">
                                <ReactSVG src={UnderLine} className="w-1/5" />
                            </div>
                        </div>
                        <div>
                            <p className="text-lg text-black font-semibold">Certificate Type Name:</p>
                            <div className="py-5 lg:w-[1/2] sm:w-full">
                                <input
                                    className="text-black  font-medium h-12 items-center border border-gray-200 w-full "
                                    onChange={(e) => setNewCert(e.target.value)}
                                    style={{paddingLeft: '7px'}}
                                    autoFocus
                                />
                            </div>{' '}
                        </div>
                        <div className="flex space-x-4 justify-center items-center sm:pt-2 lg:pt-5">
                            <div>
                                <button
                                    className="hover:bg-statusBlue   rounded-md"
                                    onClick={() => setAddCertModal(false)}
                                >
                                    <p className="hover:text-white  px-14 py-4">Cancel</p>
                                </button>
                            </div>
                            <div>
                                <button
                                    className="bg-statusBlue rounded-md"
                                    onClick={() => {
                                        setOpen(false);
                                        createCert();
                                    }}
                                >
                                    <p className="text-white  px-14 py-4 ">Save</p>
                                </button>
                            </div>
                        </div>
                    </div>
                </Dialog>
            </div>
        </div>
    );
};

export default CertificatesBoard;
