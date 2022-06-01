//create auth actions for redux
import {
  GET_FAVORITES,
  GET_MANAGER_DETAILS,
  LOGIN,
  SET_HOTEL_BILLINGS,
} from './types';

type LoginPayload = {
  email: string;
  password: string;
};

export const LoginAction = (payload: LoginPayload | string | null) => {
  return {
    type: LOGIN,
    payload,
  };
};

export const GetManagerDetails = (payload: any) => {
  return {
    type: GET_MANAGER_DETAILS,
    payload,
  };
};

export const GetFaveList = (payload: any) => {
  return {
    type: GET_FAVORITES,
    payload,
  };
};
export const setHotelBill = (payload: any) => {
  return {
    type: SET_HOTEL_BILLINGS,
    payload,
  };
};

[
  {
    id: 2,
    shift_id: 42,
    hotel_id: 1,
    status: 'PENDING',
    paymentTransactionID: null,
    owner: {
      id: 53,
      longitude: 3.4219,
      createdAt: '2021-10-18T09:55:32.348495',
      firstname: 'Dikenna',
      userType: 'CONTRACTOR',
      updatedAt: '2021-11-22T13:33:52.058092',
      lastname: 'Chinemerem',
      address: 'Johnson Street 2',
      email: 'dike@gmail.com',
      is_verified: true,
      is_active: true,
      countryCode: null,
      phone: '',
      latitude: 6.4281,
    },
    hotel: {
      hotelAdmin: 1,
      contractorsRadius: 20,
      name: 'Tropicana Hotel',
      latitude: 6.5095,
      address: null,
      longitude: 3.3711,
      phone: '987654321',
      notification: {
        email: true,
        push: true,
      },
      employerIdentificationNumber: '12345678',
      rating: 3.25,
      id: 1,
      bank_id: 6,
      createdAt: '2021-10-07T14:43:32.540836',
      createdBy: 2,
      pictures: ['weweew3r3'],
      updatedAt: '2021-11-17T11:23:51.478048',
      favouriteContractors: null,
    },
    shift: {
      startedAt: '2021-11-11T10:43:26.722666',
      clockOutLatitude: 3.443,
      updatedAt: '2021-11-11T10:32:49.892168',
      id: 42,
      endedAt: '2021-11-11T10:55:16.818769',
      clockInLongitude: 3.2245,
      name: 'Cleaner',
      instructions: 'Come early',
      clockOutLongitude: -2.2232,
      hotel_id: 1,
      requiredCertificatesTypes: null,
      status: 'COMPLETED',
      roles_ids: [2],
      targetAudience: null,
      active: true,
      pay: 35,
      audienceType: 'MARKET',
      contractor_id: 28,
      startTime: '2021-11-11T10:39:32.235000',
      clockInLatitude: 12.2545,
      createdBy: 2,
      endTime: '2021-11-11T11:29:32.235000',
      createdAt: '2021-11-11T10:32:49.336640',
    },
    amountPayableToShift2go: 0,
    amountPayableToContractor: 0,
    createdAt: '2021-11-11T10:32:49.923430',
    updatedAt: null,
  },
  {
    id: 3,
    shift_id: 43,
    hotel_id: 1,
    status: 'PENDING',
    paymentTransactionID: null,
    owner: {
      id: 53,
      longitude: 3.4219,
      createdAt: '2021-10-18T09:55:32.348495',
      firstname: 'Dikenna',
      userType: 'CONTRACTOR',
      updatedAt: '2021-11-22T13:33:52.058092',
      lastname: 'Chinemerem',
      address: 'Johnson Street 2',
      email: 'dike@gmail.com',
      is_verified: true,
      is_active: true,
      countryCode: null,
      phone: '',
      latitude: 6.4281,
    },
    hotel: {
      hotelAdmin: 1,
      contractorsRadius: 20,
      name: 'Tropicana Hotel',
      latitude: 6.5095,
      address: null,
      longitude: 3.3711,
      phone: '987654321',
      notification: {
        email: true,
        push: true,
      },
      employerIdentificationNumber: '12345678',
      rating: 3.25,
      id: 1,
      bank_id: 6,
      createdAt: '2021-10-07T14:43:32.540836',
      createdBy: 2,
      pictures: ['weweew3r3'],
      updatedAt: '2021-11-17T11:23:51.478048',
      favouriteContractors: null,
    },
    shift: {
      startedAt: '2021-11-11T10:54:43.284671',
      clockOutLatitude: 3.443,
      updatedAt: '2021-11-11T10:32:49.336694',
      id: 43,
      endedAt: '2021-11-11T10:55:59.758215',
      clockInLongitude: 13.2245,
      name: 'Sheff Assistant',
      instructions: 'You must know how to cook',
      clockOutLongitude: -9.112,
      hotel_id: 1,
      requiredCertificatesTypes: null,
      status: 'COMPLETED',
      roles_ids: [6],
      targetAudience: null,
      active: true,
      pay: 35,
      audienceType: 'MARKET',
      contractor_id: 28,
      startTime: '2021-11-11T10:54:32.235000',
      clockInLatitude: 2.2545,
      createdBy: 2,
      endTime: '2021-11-11T11:29:32.235000',
      createdAt: '2021-11-11T10:32:49.336640',
    },
    amountPayableToShift2go: 0,
    amountPayableToContractor: 0,
    createdAt: '2021-11-11T10:32:49.348679',
    updatedAt: null,
  },
];
