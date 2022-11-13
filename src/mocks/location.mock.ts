import { LocationEntity } from '../app/warehouse/location/location.entity';

const locationMock: LocationEntity = {
  id: '5aea509b-2741-442c-8e16-59c3faa5a69f',
  shelf: 'Third shelf on right',
  warehouse_id: 'ac621e58-870c-49a3-acfa-b53f3f41faf0',
  package_id: '87db7682-a310-4f35-a0e3-e569541783c0',

  isAvailable(): boolean {
    return !this.package_id;
  },
};

const locationAvailableMock: LocationEntity = {
  id: '5aea509b-2741-442c-8e16-59c3faa5a69f',
  shelf: 'Third shelf on right',
  warehouse_id: 'ac621e58-870c-49a3-acfa-b53f3f41faf0',

  isAvailable(): boolean {
    return true;
  },
};

export { locationMock, locationAvailableMock };
